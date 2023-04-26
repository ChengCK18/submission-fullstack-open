import HomePanel from './components/HomePanel';
import LoginPanel from './components/LoginPanel';
import './index.css';
import { useSelector } from 'react-redux';



const App = () => {
    const user = useSelector(({ notification, blog, user }) => {
        return user;
    });

    return (
        <div style = {{height:"100vh"}} className="container">
            {user === null && <LoginPanel />}
            {user !== null && <HomePanel />}
           
        </div>
    );
};

export default App;
