import React, { useState } from "react";

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleSetGood = () => {
        setGood(good + 1);
    };

    const handleSetNeutral = () => {
        setNeutral(neutral + 1);
    };

    const handleSetBad = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <Title text="Give Feedback" />
            <Button text="Good" handleClick={handleSetGood} />
            <Button text="Neutral" handleClick={handleSetNeutral} />
            <Button text="Bad" handleClick={handleSetBad} />

            <Title text="Statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

//Title Component
const Title = ({ text }) => <h1>{text}</h1>;

//Button Component
const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

//Statistic Component
const Statistic = ({ text, value }) => {
    return (
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    );
};
//Statistics  Component
const Statistics = ({ good, neutral, bad }) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic text="Good" value={good} />
                    <Statistic text="Neutral" value={neutral} />
                    <Statistic text="Bad" value={bad} />
                    <Statistic text="All" value={good + neutral + bad} />
                    <Statistic
                        text="Average"
                        value={((good - bad) / (good + neutral + bad)).toFixed(
                            1
                        )}
                    />
                    <Statistic
                        text="Positive"
                        value={
                            ((good / (good + neutral + bad)) * 100).toFixed(1) +
                            " %"
                        }
                    />
                </tbody>
            </table>
        </div>
    );
};

export default App;
