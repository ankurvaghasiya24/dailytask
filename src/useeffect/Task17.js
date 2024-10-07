// 17. Countdown Timer: Create a countdown timer that stops automatically using useEffect 
// and useState.


import React, { useState, useEffect } from 'react';

const Task17 = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [seconds]);

    return <h2>Countdown: {seconds} seconds</h2>;
};

const App = () => <Task17 initialSeconds={10} />;

export default App;

