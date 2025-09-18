import React, { useEffect, useState } from 'react';


const StopWatch = ({ timeGiven }) => {
    const [time, setTime] = useState(timeGiven);
    const [paused, setPaused] = useState(false);
    const intervalRef = React.useRef(null);

    useEffect(() => {
        setTime(timeGiven);
        setPaused(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (!paused) {
                setTime(prev => (prev > 0 ? prev - 1 : 0));
            }
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [timeGiven]);

    useEffect(() => {
        // Pause/resume effect
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (!paused) {
                setTime(prev => (prev > 0 ? prev - 1 : 0));
            }
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, [paused]);

    const urgent = time <= 3 && time > 0;
    const blinkStyle = urgent
        ? {
            color: '#FF0000',
            animation: 'fast-blink 0.3s steps(2, start) infinite',
            fontWeight: 'bold',
            fontSize: '2rem',
        }
        : { color: time === 0 ? '#FF0000' : '#000', fontWeight: 'bold', fontSize: '2rem' };

    return (
        <div className='absolute top-20 left-20'>
            <div className='bg-white flex justify-center items-center flex-col min-h-[80px] text-sm min-w-[80px] border border-white rounded-full font-Outfit'>
                <div  className='flex absolute top-2 left-[18px]'></div>
                <div>
                    <h1 onClick={() => setPaused(p => !p)} className='cursor-pointer' style={blinkStyle}>{time}</h1>
                </div>
            </div>
            {/* Fast blink keyframes */}
            <style>{`
                @keyframes fast-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default StopWatch;
