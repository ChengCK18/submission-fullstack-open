const Anecdote = ({ specificAnecdote }) => {


    return (
        <div>
            <h2>Anecdote #{specificAnecdote.id}</h2>

            <h2>{specificAnecdote.content}</h2>
            has {specificAnecdote.votes} votes

            <p></p>
        </div>
    )
}

export default Anecdote