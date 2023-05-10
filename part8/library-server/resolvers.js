const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            let originalBooks = null;
            if (args.author && args.author !== "") {
                if (args.author.length < 5) {
                    return new GraphQLError(
                        "Author name shorter than allowed of 5 characters",
                        {
                            extensions: {
                                code: "BAD_USER_INPUT",
                                invalidArgs: args.name,
                            },
                        }
                    );
                }

                originalBooks = await Book.find().populate({
                    path: "author",
                    model: Author,
                    match: { name: { $eq: args.author } },
                });
                originalBooks = originalBooks.filter(
                    (bk) => bk.author !== null
                );
            } else {
                originalBooks = await Book.find().populate({
                    path: "author",
                    model: Author,
                });
            }

            if (args.genre) {
                if (args.genre !== "all") {
                    originalBooks = originalBooks.filter((bk) =>
                        bk.genres.includes(args.genre)
                    );
                }
            }

            return originalBooks;
        },
        allAuthors: async () => {
            const result = await Author.find({}).populate({
                path: "publishedBooks",
                model: Book,
            });

            return result;
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Author: {
        bookCount: async (root) => {
            // //or can just store list of books in Author, the IDs
            // // This approach is not good, as there would be many calls to mongoDB

            // allBooks = await Book.find().populate({
            //     path: "author",
            //     model: Author,
            //     match: { name: { $eq: root.name } },
            // });
            // booksByAuthor = allBooks.filter((bk) => bk.author !== null);
            // return booksByAuthor.length;

            if (root.publishedBooks === undefined) {
                return 0;
            }
            return root.publishedBooks.length;
        },
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            let authorResult = await Author.findOne({ name: args.author });

            if (authorResult === null) {
                // If the author is yet to exist, add it.
                let newAuthor = new Author({
                    name: args.author,
                    born: 0,
                    publishedBooks: [],
                });
                try {
                    authorResult = await newAuthor.save();
                } catch (error) {
                    throw new GraphQLError("Saving person failed", {
                        extensions: {
                            code: "BAD_USER_INPUT",
                            invalidArgs: args.name,
                            error,
                        },
                    });
                }
            }

            let newBook = new Book({ ...args, author: authorResult._id });

            try {
                const result = await newBook.save();
                const populatedResult = result.populate({
                    path: "author",
                    model: Author,
                });

                if (authorResult.publishedBooks === undefined) {
                    const updatedAuthorResult = await Author.findOneAndUpdate(
                        { _id: authorResult._id },
                        {
                            $set: { publishedBooks: [result._id] },
                        }
                    );
                    console.log("updatedAuthorResult => ", updatedAuthorResult);
                } else {
                    const updatedAuthorResult = await Author.findOneAndUpdate(
                        { _id: authorResult._id },
                        {
                            $push: { publishedBooks: result._id },
                        }
                    );
                    console.log("updatedAuthorResult => ", updatedAuthorResult);
                }

                pubsub.publish("BOOK_ADDED", { bookAdded: populatedResult });
                return populatedResult;
            } catch (error) {
                console.log(error);
                throw new GraphQLError("Saving book failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.title,
                        error,
                    },
                });
            }
        },

        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new GraphQLError("not authenticated", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const result = await Author.findOneAndUpdate(
                { name: args.name },
                { born: args.setBornTo },
                { new: true }
            );

            if (result === null) {
                return null;
            }

            return result;
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favouriteGenre: args.favouriteGenre,
            });

            return user.save().catch((error) => {
                throw new GraphQLError("Creating the user failed", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                        invalidArgs: args.name,
                        error,
                    },
                });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== "secret") {
                throw new GraphQLError("wrong credentials", {
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                });
            }

            const tokenForUser = {
                username: user.username,
                id: user._id,
            };

            return {
                value: jwt.sign(tokenForUser, process.env.JWT_SECRET),
                loggedInUser: user,
            };
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
        },
    },
};

module.exports = resolvers;
