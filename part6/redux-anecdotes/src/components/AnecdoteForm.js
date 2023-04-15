import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdotesForm = (props) => {

    const addAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesString.value
        event.target.anecdotesString.value = ''
        props.createNewAnecdote(content)



        const notificationMessage = `You have created "${content}"`
        props.showNotification(notificationMessage, 5)
    }

    return (
        <div>
            <h2>Create new anecdotes</h2>
            <form onSubmit={addAnecdotes}>
                <div><input name='anecdotesString' /></div>
                <button
                    type='submit'
                >create</button>
            </form>
        </div>
    )

}

const mapDispatchToProps = {
    createNewAnecdote,
    showNotification
}


const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdotesForm)



export default ConnectedAnecdoteForm