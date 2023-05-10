import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { ALL_BOOKS } from "../queries";

const Books = ({ show, userInfo, allBooksGenre, setAllBooksGenre }) => {
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [getAllBooks, genreData] = useLazyQuery(ALL_BOOKS);

    useEffect(() => {
        getAllBooks({ variables: { genre: "all" } });
    }, []);

    if (genreData.data !== undefined) {
        if (allBooksGenre === null) {
            const updatedGenres = Array.from(
                new Set(genreData.data.allBooks.map((bk) => bk.genres).flat(1))
            );
            setAllBooksGenre(updatedGenres);
        }
    }

    const userFavouriteGenre =
        userInfo !== null ? userInfo.favouriteGenre : "all";

    //For some reason refetch does not clear existing cache by default
    const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
        variables: { genre: selectedGenre },
        fetchPolicy: "cache-and-network", //required for refetch to update cache
        nextFetchPolicy: "cache-first", //required for refetch to update cache
    });
    useEffect(() => {
        if (error) {
            // handle error here
        }
    }, [error]);
    // useEffect(() => {
    //     //Update the latest list of genres from db
    //     if (selectedGenre === "all" && data !== undefined) {
    //         const updatedGenres = Array.from(
    //             new Set(data.allBooks.map((bk) => bk.genres).flat(1))
    //         );
    //         setAllBooksGenre(updatedGenres);
    //     }
    // }, [data]);

    if (loading) {
        return <div>Getting a list of books...</div>;
    }
    console.log(data);
    const books = data.allBooks;

    if (!show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>
            <div>
                <span>
                    Genres &nbsp;
                    <button
                        key="all"
                        onClick={() => {
                            setSelectedGenre("all");
                            refetch({ genre: selectedGenre });
                        }}
                    >
                        All
                    </button>
                    <button
                        key="recommend"
                        onClick={() => {
                            setSelectedGenre(userFavouriteGenre);
                            refetch({ genre: selectedGenre });
                        }}
                    >
                        Recommended
                    </button>
                    {allBooksGenre.map((gen) => {
                        return (
                            <button
                                key={gen}
                                onClick={() => {
                                    setSelectedGenre(gen);
                                    refetch({ genre: selectedGenre });
                                }}
                            >
                                {gen}
                            </button>
                        );
                    })}
                </span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>

                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
