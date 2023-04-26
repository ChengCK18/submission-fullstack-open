import UserInfoTable from "./UserInfoTable";
import NavigationBar from "./NavigationBar";
import BlogSpecific from "./BlogSpecific";
import DefaultHomeView from "./DefaultHomeView";

import {
    Routes,
    Route,
    useMatch
} from "react-router-dom"

const HomePanel = () => {
    const match = useMatch('/blogs/:id')

    return (
        <div>
            <NavigationBar />
            <Routes>
                <Route path='/users' element={<UserInfoTable />} />
                <Route path='/' element={<DefaultHomeView />} />
                <Route path='/blogs/:id' element={<BlogSpecific match={match} />} />
            </Routes>


        </div>
    );
};


export default HomePanel