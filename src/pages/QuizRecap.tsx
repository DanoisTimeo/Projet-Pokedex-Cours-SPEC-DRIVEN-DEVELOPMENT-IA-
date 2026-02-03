import React from "react";
import { useNavigate } from "react-router-dom";

const QuizRecap: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="quiz-recap-container">
            <div className="quiz-recap-header">
                <h1>Quiz Results</h1>
                <button className="back-button" onClick={handleBack}>
                    ← Back to Pokédex
                </button>
            </div>
            <p>Quiz Recap Page - Coming Soon</p>
        </div>
    );
};

export default QuizRecap;
