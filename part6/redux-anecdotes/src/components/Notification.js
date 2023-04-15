import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {notification}
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

const ConnectedNotification = connect(
    mapStateToProps,
    null
)(Notification)

export default ConnectedNotification