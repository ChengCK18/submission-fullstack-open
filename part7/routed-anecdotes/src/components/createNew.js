import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNew, setNotification }) => {

    // a variable contaning all props for input except for onReset(not a valid input's prop)
    const content = useField('text', 'content')
    let { onReset: onReset1, ...contentInput } = content

    const author = useField('text', 'author')
    let { onReset: onReset2, ...authorInput } = author

    const info = useField('text', 'info')
    let { onReset: onReset3, ...infoInput } = info



    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (content.value !== '' && author.value !== '' && info.value !== '') {
            addNew({
                content: content.value,
                author: author.value,
                info: info.value,
                votes: 0
            })
            navigate('/')
            setNotification(`SUCCESS: A new anecdote created => ${content.value}`)

            setTimeout(() => {
                setNotification('')
            }, 5000)
        }
        else {
            setNotification(`FAILED: All input fields need to be filled in`)
            setTimeout(() => {
                setNotification('')
            }, 5000)
        }
    }

    const handleOnReset = () => {
        content.onReset()
        author.onReset()
        info.onReset()
    }
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...contentInput} />
                </div>
                <div>
                    author
                    <input {...authorInput} />
                </div>
                <div>
                    url for more info
                    <input  {...infoInput} />
                </div>
                <button type='submit'>create</button>
                <button type='button' onClick={handleOnReset}>reset</button>
            </form>
        </div>
    )

}


export default CreateNew