import axios from 'axios'
const baseUrl = '/api/login'



const loginWithUsernameAndPass = async ({ username, password }) => {
    try {
        const request = await axios.post(baseUrl, {
            username: username,
            password: password
        })
        return request.data
    } catch (error) {
        return error.response
    }

}


export default { loginWithUsernameAndPass }