import React, { useEffect, useState } from "react";

interface QuizTimerProps {
    timeLimit: number; // Total seconds
    onTimeUp: () => void; // Called when timer reaches 0
    isActive: boolean; // Whether timer should count down
    questionId: string; // Unique identifier to reset timer on new question
}

const QuizTimer: React.FC<QuizTimerProps> = ({ timeLimit, onTimeUp, isActive, questionId }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(timeLimit);

    // Reset timer when question changes (using questionId) or timeLimit changes
    useEffect(() => {
        setRemainingSeconds(timeLimit);
    }, [timeLimit, questionId]);

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
    }, [isActive, onTimeUp]); // Removed remainingSeconds and timeLimit from dependencies

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
