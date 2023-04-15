import axios from 'axios'
const baseUrl = '/api/persons'


const getAllContact = () =>{
    const request = axios.get(baseUrl)
    return request.then( response => response.data)
}

const addContact = newContact =>{
    const request = axios.post(baseUrl,newContact)
    console.log("Adding")
    return request.then(response => response.data)
}

const deleteContact = id =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then( response => response.data)
}

const updateContact = updatedExistingContact =>{
    const request = axios.put(`${baseUrl}/${updatedExistingContact.id}`,updatedExistingContact)
    return request.then(response => response.data)
}

const contactService = {
    getAllContact,
    addContact,
    deleteContact,
    updateContact
}


export default contactService