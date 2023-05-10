import { useState } from "react";
import { CREATE_BOOK, ALL_BOOKS } from "../queries";
import { useMutation } from "@apollo/client";
import { updateCache } from "../App";

const NewBook = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("Gabe");
    const [published, setPublished] = useState(12223);
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState(["Action"]);

    const [createBook] = useMutation(CREATE_BOOK, {
        // refetchQueries: [{ query: ALL_BOOKS, variables: { genre: "all" } }],
        onError: (error) => {
            const errors = error.graphQLErrors[0].message;
            console.log("Error => ", errors);
        },
        update: (cache, response) => {
            console.log("NewBook => ", response.data.addBook);
            updateCache(cache, response.data.addBook);
        },
    });

    // const [createBook] = useMutation(CREATE_BOOK, {
    //     refetchQueries: [{ query: GET_ALL_BOOKS, variables: { genre: "all" } }],
    //     onError: (error) => {
    //         const errors = error.graphQLErrors[0].message;
    //         console.log("Error => ", errors);
    //     },
    //     update: (cache, response) => {
    //         cache.updateQuery(
    //             { query: GET_ALL_BOOKS, variables: { genre: "all" } },
    //             ({ allBooks }) => {
    //                 console.log(response.data);
    //                 return {
    //                     allBooks: allBooks.concat(response.data.addBook),
    //                 };
    //             }
    //         );
    //     },
    // });

    if (!props.show) {
        return null;
    }

    const submit = async (event) => {
        event.preventDefault();

        console.log("add book...");

        try {
            console.log(typeof published);
            if (typeof published !== "number") {
                throw new TypeError("Published year needs to be integer");
            }
            if (title.length <= 0 || author.length <= 0) {
                throw new Error("Please provide input for title and author");
            }
            if (genres.length <= 0) {
                throw new Error("Associate book with at least 1 genre");
            }

            createBook({
                variables: { title, author, published, genres },
            });

            setTitle("");
            // setPublished("");
            // setAuthor("");
            // setGenres([]);
            // setGenre("");
        } catch (error) {
            console.log("Set error here => ", error);
        }
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) =>
                            setPublished(parseInt(target.value))
                        }
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(" ")}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
