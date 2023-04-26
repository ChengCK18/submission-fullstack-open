

const UserInfoBlogCount = ({ blogsGroupByUserName, userSelectedToggleButton }) => {

    if (blogsGroupByUserName.length !== 0) {
        return (
            <div>
                <h2 className="text-center p-3">Users</h2>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Author Name</th>
                            <th scope="col">Blog Created</th>
                        </tr>
                    </thead>
                    
                    <tbody >
                        {blogsGroupByUserName.map((item, index) => {
                            return (
                                <tr key={'userInfo_' + index}>
                                    <td><a href="#/" onClick={userSelectedToggleButton}>{item[0]}</a></td>
                                    <td>{item[1]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>


            </div>)
    }
    return <></>

}

export default UserInfoBlogCount
