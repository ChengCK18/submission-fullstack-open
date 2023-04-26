import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login';
import { showNotification } from "./notificationReducer";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            const content = action.payload
            return content
        }
    }

})


export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const response = await loginService.loginWithUsernameAndPass({
                username,
                password
            });
            if (response.status === 401) {
                dispatch(showNotification('error', response.data.error, 5));
            } else {
                window.localStorage.setItem(
                    'loggedInUser',
                    JSON.stringify(response)
                );
                dispatch(setUser(response));
            }
        } catch (error) {
            dispatch(showNotification('error', error, 5))
        }
    }
}


export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedInUser');
        window.localStorage.clear();
        dispatch(setUser(null))
    }
}


export const { setUser } = userSlice.actions

export default userSlice.reducer