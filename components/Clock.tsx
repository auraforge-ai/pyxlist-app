import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className="text-lg text-[var(--color-primary)] text-center">
            <div>{time.toLocaleTimeString('en-US', { hour12: true })}</div>
            <div className="text-xs text-[var(--color-secondary)]">{time.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</div>
        </div>
    );
};

export default Clock;
