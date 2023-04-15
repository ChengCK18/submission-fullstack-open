import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutExist = null

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {

            return action.payload
        },
        notifyAnecdotesCreation(state, action) { //not used
            const payloadCreatedAnecdote = action.payload
            return (`You have created => ${payloadCreatedAnecdote}`)
        },
        notifyAnecdotesVoted(state, action) { //not used
            const payloadVotedAnecdote = action.payload.content
            return (`You have voted for => ${payloadVotedAnecdote}`)
        },
        removeNotification(state, action) { //not used
            console.log('removing')
            return ''
        }

    }
})

export const { notifyAnecdotesCreation, notifyAnecdotesVoted, removeNotification, setNotification } = notificationSlice.actions

export const showNotification = (text, duration) => {
    return async dispatch => {
        clearTimeout(timeoutExist)
        dispatch(setNotification(text))
        timeoutExist = setTimeout(() => {
            dispatch(setNotification(''))
        }, duration * 1000)
    }
}

export default notificationSlice.reducer