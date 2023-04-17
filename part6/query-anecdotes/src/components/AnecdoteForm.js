import { addAnecdotes } from "../requests";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
    const newAnecdoteMutation = useMutation(addAnecdotes);
    const queryClient = useQueryClient();
    const notificationDispatch = useNotificationDispatch();

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";

        newAnecdoteMutation.mutate(
            { content },
            {
                onSuccess: () => {
                    //Approach 1: no additional GET request required
                    // const anecdotes = queryClient.getQueryData("anecdotes");
                    // console.log({ content });
                    // queryClient.setQueryData(
                    //     "anecdotes",
                    //     anecdotes.concat({ content })
                    // );

                    // notificationDispatch({
                    //     type: "Success",
                    //     payload: "Anecdote successfully created.",
                    // });

                    //Approach 2: Additional GET request required
                    queryClient.invalidateQueries("anecdotes"); //needed as require new id

                    notificationDispatch({
                        type: "Success",
                        payload: "Anecdote successfully created.",
                    });
                },
                onError: (error) => {
                    notificationDispatch({
                        type: "Error",
                        payload: error.response.data.error,
                    });
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
