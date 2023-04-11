const Total = ({ parts }) => {
    return (
        <p>
            Number of exercises{" "}
            {parts.reduce((sum, val) => sum + val.exercises, 0)}
        </p>
    );
};

export default Total;
