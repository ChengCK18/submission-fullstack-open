import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdotesVote } from "./requests";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "./NotificationContext";

const App = () => {
    const result = useQuery("anecdotes", getAnecdotes);
    const queryClient = useQueryClient();
    const updateAnecdotesVotes = useMutation(updateAnecdotesVote);
    const notificationDispatch = useNotificationDispatch();

    const handleVote = (anecdote) => {
        const newAnecdote = {
            ...anecdote,
            votes: anecdote.votes === undefined ? 1 : anecdote.votes + 1,
        };

        updateAnecdotesVotes.mutate(
            { newAnecdote },
            {
                onSuccess: () => {
                    //Approach 1: no additional GET request required
                    let anecdotes = queryClient.getQueryData("anecdotes");

                    queryClient.setQueryData(
                        "anecdotes",
                        anecdotes.map((anec) =>
                            anec.id === anecdote.id ? newAnecdote : anec
                        )
                    );

                    notificationDispatch({
                        type: "Success",
                        payload: `anecdote '${newAnecdote.content}' voted`,
                    });
                    setTimeout(() => {
                        notificationDispatch({ type: "Reset" });
                    }, 5000);
                },
            }
        );
    };

    if (result.isLoading) {
        return (
            <div>Anecdote service not available due to problems in server</div>
        );
    }

    let anecdotes = result.data;
    console.log(anecdotes);
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
