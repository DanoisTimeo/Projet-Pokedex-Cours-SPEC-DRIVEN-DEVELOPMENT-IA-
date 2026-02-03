import React, { useEffect, useState } from "react";

interface QuizTimerProps {
    timeLimit: number; // Total seconds
    onTimeUp: () => void; // Called when timer reaches 0
    isActive: boolean; // Whether timer should count down
}

const QuizTimer: React.FC<QuizTimerProps> = ({ timeLimit, onTimeUp, isActive }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(timeLimit);

    useEffect(() => {
        setRemainingSeconds(timeLimit);
    }, [timeLimit]);

    useEffect(() => {
        if (!isActive || remainingSeconds <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setRemainingSeconds((prev) => {
                const newTime = prev - 1;
                if (newTime <= 0) {
                    onTimeUp();
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, remainingSeconds, onTimeUp]);

    // Determine color based on remaining time
    const getTimerClass = () => {
        if (remainingSeconds > 10) return "timer-safe";
        if (remainingSeconds > 5) return "timer-warning";
        return "timer-critical";
    };

    return (
        <div className={`quiz-timer ${getTimerClass()}`}>
            <div className="timer-display">{remainingSeconds}s</div>
        </div>
    );
};

export default QuizTimer;
