import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const [good, setGood] = useState(0)
    const [bad, setBad] = useState(0)
    const [neutral, setNeutral] = useState(0)

    return (
        <div>
            <Header />
            <Button handleClick={() => setGood(good + 1) } text="good" />
            <Button handleClick={() => setNeutral(neutral + 1) } text="neutral" />
            <Button handleClick={() => setBad(bad + 1) } text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

const Header = () => <h1>Give feedback</h1>

const Statistics = ( {good, neutral, bad} ) => {
    if (All(good, neutral, bad) === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return(
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="all" value={All(good, neutral, bad)} />
                <Statistic text="average" value={Average(Sum(good, bad), All(good, bad, neutral))} />
                <Statistic text="positive" value={good / All(good, neutral, bad) * 100} unit="%" /> 
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ( {text, value, unit} ) => {
    return (
        <tr>
        <td>{text}</td>
        <td>{value} {unit}</td>
        </tr>
    )

}

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const All = (p1, p2, p3) => p1 + p2 + p3
const Sum = (p1, p2) => p1 - p2
const Average = (sum, all) => sum / all;


ReactDOM.render(<App />, document.getElementById('root'));

