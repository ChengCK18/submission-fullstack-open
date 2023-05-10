const Notification = ({ notifMsg }) => {
    if (!notifMsg) {
        return null;
    }
    return (
        <div style={{ color: "red" }}>
            <br />
            {notifMsg}
        </div>
    );
};

export default Notification;
