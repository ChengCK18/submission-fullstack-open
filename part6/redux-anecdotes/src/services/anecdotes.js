import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNewAnec = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)

    return response.data
}

const updateVote = async (id) => {
    const originalAnecdote = await axios.get(`${baseUrl}/${id}`)
    const updatedAnecdote = {
        ...originalAnecdote.data,
        votes: originalAnecdote.data.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    console.log(response)

    return response.data
}

export default { getAll, createNewAnec, updateVote }