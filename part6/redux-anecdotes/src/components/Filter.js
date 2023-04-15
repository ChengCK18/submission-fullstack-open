import { updateFilter } from "../reducers/filterAnecdoteReducer"
import { connect } from "react-redux"


const Filter = (props) => {


    const handleChange = (event) => {
        props.updateFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Anecdotes filter: <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    updateFilter
}

const ConnectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter)


export default ConnectedFilter