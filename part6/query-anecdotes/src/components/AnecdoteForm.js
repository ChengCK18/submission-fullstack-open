import { addAnecdotes } from "../requests";
import { useMutation, useQueryClient } from "react-query";

const AnecdoteForm = () => {
    const newAnecdoteMutation = useMutation(addAnecdotes);
    const queryClient = useQueryClient();

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate(
            { content },
            {
                onSuccess: () => {
                    //Approach 1: no additional GET request required
                    const anecdotes = queryClient.getQueryData("anecdotes");
                    queryClient.setQueryData(
                        "anecdotes",
                        anecdotes.concat(content)
                    );
                    //Approach 2: Additional GET request required
                    //queryClient.invalidateQueries("anecdotes");
                },
            }
        );
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
