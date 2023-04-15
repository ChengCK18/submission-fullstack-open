import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filterAnecdoteSlice = createSlice({
    name: 'filterAnecdote',
    initialState,
    reducers: {
        updateFilter(state, action) {
            return action.payload
        }
    }
})




export const { updateFilter } = filterAnecdoteSlice.actions
export default filterAnecdoteSlice.reducer