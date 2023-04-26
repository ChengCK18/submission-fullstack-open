import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { setUser, loginUser } from '../reducers/userReducer';


const LoginPanel = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const notificationMsg = useSelector(state => state.notification);

    useEffect(() => {
        window.localStorage.getItem('loggedInUser') !== null &&
            dispatch(setUser(JSON.parse(window.localStorage.getItem('loggedInUser'))));
    }, []);


    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password))
    };



    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
        
        
        
        <form  className='text-center' onSubmit={handleLogin}>
            <h1 className='text-center m-3'>Blogs</h1>
            <Notification message={notificationMsg} />
            <div>
                Username<br/>
                <input
                    type="text"
                    id="username_input"
                    value={username}
                    name="Username"
                    onChange={({ target }) => {
                        setUsername(target.value);
                    }}
                    placeholder='Enter usernames here'
                />
            </div>
            <div>
                Password<br/>
                <input
                    type="password"
                    id="password_input"
                    value={password}
                    name="Password"
                    onChange={({ target }) => {
                        setPassword(target.value);
                    }}
                    placeholder='Enter password here'
                />
            </div>
            <div className='text-center m-3'>
                <button className='btn btn-primary' type="submit" id="login_button">
                    Login
                </button>
            </div>
           
        </form>
        </div>
    );
};


export default LoginPanel