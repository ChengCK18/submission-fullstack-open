import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
  

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="navbar">
            <div className="m-1">
                <Link className="btn btn-primary m-1" to='/'>Blogs</Link>
                <Link className="btn btn-primary m-1" to='/users'>Users</Link>
            </div>
            <div className="m-1">
                {user.name} is logged in.{' '}
                <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default NavigationBar