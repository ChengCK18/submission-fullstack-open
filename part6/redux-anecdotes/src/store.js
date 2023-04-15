
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterAnecdoteReducer from './reducers/filterAnecdoteReducer'
const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer,
        filterAnecdote: filterAnecdoteReducer
    }
})

export default store