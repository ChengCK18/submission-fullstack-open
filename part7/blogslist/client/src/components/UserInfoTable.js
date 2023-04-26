import { useSelector } from "react-redux"
import { useState } from "react";
import UserInfoBlogCount from "./UserInfoBlogCount";
import UserInfoSelected from "./UserInfoSelected";


const _ = require("lodash");

const UserInfoTable = () => {
    const blogs = useSelector(state => state.blog)
    const [userSelected, setUserSelected] = useState(null)

    let blogsGroupByUserName = Object.entries(_.countBy(blogs, 'user.name'))


    const userSelectedToggleButton = (event) => {
        setUserSelected(event.currentTarget.innerText)
        return true
    }

    const resetUserSelected = () => {
        setUserSelected(null)
        return true
    }

    return (
        <>
            {userSelected === null ?
                <UserInfoBlogCount blogsGroupByUserName={blogsGroupByUserName} userSelectedToggleButton={userSelectedToggleButton} />
                : <UserInfoSelected userSelected={userSelected} resetUserSelected={resetUserSelected} />}
        </>

    )
}

export default UserInfoTable