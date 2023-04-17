import { createContext, useReducer, useContext, useEffect } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "Success":
            return `Success: ${action.payload}`;

        case "Error":
            return `Error: ${action.payload}`;
        case "Reset":
            return null;
        default:
            return action.payload;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    );

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                notificationDispatch({ type: "Reset" });
            }, 5000);

            return () => clearTimeout(timer); // cleanup
        }
    }, [notification]);

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
};

export default NotificationContext;
