// const anecdotesAtStart = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//     return {
//         content: anecdote,
//         id: getId(),
//         votes: 0
//     }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//     console.log('state now: ', state)
//     console.log('action', action)

//     switch (action.type) {
//         case 'INCREMENT_VOTE':
//             const id = action.data.id
//             const anecdoteToVote = state.find(anec => anec.id === id)
//             const votedAnecdote = {
//                 ...anecdoteToVote,
//                 votes: anecdoteToVote.votes + 1
//             }
//             return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)

//         case 'NEW_ANECDOTES':
//             return state.concat(action.data)
//         default:
//             return state
//     }

// }


// export const voteAnecdote = (id) => { //Redux action creators
//     return {
//         type: 'INCREMENT_VOTE',
//         data: { id }
//     }
// }

// export const newAnecdotes = (newContent) => { //Redux action creators
//     return {
//         type: 'NEW_ANECDOTES',
//         data: {
//             content: newContent,
//             id: getId(),
//             votes: 0
//         }
//     }
// }
// export default reducer


import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'



//const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        newAnecdotes(state, action) {
            // const content = action.payload
            // state.push({
            //     content,
            //     id: getId(),
            //     votes: 0
            // })
            state.push(action.payload)
        },
        voteAnecdote(state, action) {
            // const id = action.payload
            // const anecdoteToVote = state.find(anec => anec.id === id)
            // const votedAnecdote = {
            //     ...anecdoteToVote,
            //     votes: anecdoteToVote.votes + 1
            // }
            const votedAnecdote = action.payload
            const id = votedAnecdote.id

            return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
        },

        setAnecdotes(state, action) {
            return action.payload
        }

    }
})




export const { newAnecdotes, voteAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdotesService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}


export const createNewAnecdote = (content) => {
    return async dispatch => {
        const addedAnecdote = await anecdotesService.createNewAnec(content)
        dispatch(newAnecdotes(addedAnecdote))
    }
}

export const updateAnecdoteVote = (id) => {
    return async dispatch => {
        const votedAnecdote = await anecdotesService.updateVote(id)
        dispatch(voteAnecdote(votedAnecdote))
    }
}




export default anecdotesSlice.reducer


