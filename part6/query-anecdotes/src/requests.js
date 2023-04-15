import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const addAnecdotes = (newAnecdote) =>
    axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateAnecdotesVote = (updatedAnecdote) => {
    // console.log(updatedAnecdote);
    // console.log(baseUrl + "/" + updatedAnecdote.anecdote.id);

    return axios
        .put(
            `${baseUrl}/${updatedAnecdote.newAnecdote.id}`,
            updatedAnecdote.newAnecdote
        )
        .then((res) => res.data);
};
