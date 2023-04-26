import { createSlice } from '@reduxjs/toolkit';
let timeoutExist = null;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notifySuccess(state, action) {
            const content = action.payload;
            return 'Success => ' + content;
        },
        notifyError(state, action) {
            const content = action.payload;
            return 'Error => ' + content;
        },
        notifyReset(state, action) {
            return null;
        }
    }
});

export const showNotification = (outcome, message, duration) => {
    return async (dispatch) => {
        clearTimeout(timeoutExist);
        if (outcome === 'success') {
            dispatch(notifySuccess(message));
            timeoutExist = setTimeout(() => {
                dispatch(notifyReset());
            }, duration * 1000);
        } else {
            dispatch(notifyError(message));
            timeoutExist = setTimeout(() => {
                dispatch(notifyReset());
            }, duration * 1000);
        }
    };
};

export const { notifySuccess, notifyError, notifyReset } =
    notificationSlice.actions;

export default notificationSlice.reducer;
