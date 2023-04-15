import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdoteVote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterValue = useSelector(state => state.filterAnecdote)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(updateAnecdoteVote(id))
        const votedAnecdote = anecdotes.find(anec => anec.id === id)
        const notificationMessage = `You have voted for "${votedAnecdote.content}"`
        dispatch(showNotification(notificationMessage, 5))

    }


    //make a copy, not modify the state directly. Map the sorted copy later
    const sortedByVotes = [].concat(anecdotes).sort((a, b) => a.votes > b.votes ? -1 : 1)
    const filteredSortedByVotes = sortedByVotes.filter(anec => anec.content.match(filterValue));
    return (
        <div>
            <h2>Anecdotes</h2>
            {filteredSortedByVotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList