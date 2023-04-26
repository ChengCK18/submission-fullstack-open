import { useSelector } from "react-redux"


const UserInfoSelected = ({ userSelected, resetUserSelected }) => {
    const blogs = useSelector(state => state.blog)
    const blogsBySelectedUser = blogs.filter(item => item.user.name === userSelected)

    return (

        <div>
            <h2>{userSelected}'s Blogs</h2>
            <button className="btn btn-secondary" onClick={resetUserSelected}>Back</button>
            <ul className="list-group">
                {blogsBySelectedUser.map((item, index) => {
                    return (<li className="list-group-item"key={'UserInfoSelected_' + index}>{item.title}</li>)
                })}
            </ul>
        </div>

    )
}


export default UserInfoSelected
