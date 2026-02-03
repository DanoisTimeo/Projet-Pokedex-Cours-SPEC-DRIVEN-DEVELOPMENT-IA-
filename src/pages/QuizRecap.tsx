import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizResult, QuizConfig } from "../types/quiz";

interface RecapQuestionDisplayProps {
    questionIndex: number;
    answer: any;
    question: any;
}

const RecapQuestionDisplay: React.FC<RecapQuestionDisplayProps> = ({
    questionIndex,
    answer,
    question
}) => {
    const renderQuestionContent = () => {
        const data = question.questionData;

        switch (question.type) {
            case "image-to-name":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">What is this Pokémon?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="recap-question-image"
                            />
                        )}
                    </div>
                );

            case "name-to-image":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">
                            Which sprite belongs to {data.name}?
                        </p>
                    </div>
                );

            case "pokemon-to-type":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">What type(s) is this Pokémon?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="recap-question-image"
                            />
                        )}
                        <p className="recap-question-subtitle">{data.name}</p>
                    </div>
                );

            case "description-to-pokemon":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">Which Pokémon is described as:</p>
                        <div className="recap-question-description">
                            {data.description}
                        </div>
                    </div>
                );

            case "number-to-pokemon":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">Which Pokémon has this number?</p>
                        <div className="recap-question-number">{data.number}</div>
                    </div>
                );

            case "pokemon-to-number":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">What is this Pokémon's number?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="recap-question-image"
                            />
                        )}
                        <p className="recap-question-subtitle">{data.name}</p>
                    </div>
                );

            case "pre-evolution-to-pokemon":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">
                            Who evolves into {data.pokemonName}?
                        </p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="recap-question-image"
                            />
                        )}
                    </div>
                );

            case "pokemon-to-post-evolution":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">
                            What does this Pokémon evolve into?
                        </p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="recap-question-image"
                            />
                        )}
                        <p className="recap-question-subtitle">{data.name}</p>
                    </div>
                );

            case "height-weight-to-pokemon":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">
                            Which Pokémon has these measurements?
                        </p>
                        <div className="recap-question-measurements">
                            <div>Height: {data.height}</div>
                            <div>Weight: {data.weight}</div>
                        </div>
                    </div>
                );

            case "stats-to-pokemon":
                return (
                    <div className="recap-question-content">
                        <p className="recap-question-text">Which Pokémon has these stats?</p>
                        <div className="recap-question-stats">
                            <div className="recap-stat-row">
                                <span>hp:</span>
                                <span>{data.hp}</span>
                            </div>
                            <div className="recap-stat-row">
                                <span>atk:</span>
                                <span>{data.attack}</span>
                            </div>
                            <div className="recap-stat-row">
                                <span>def:</span>
                                <span>{data.defense}</span>
                            </div>
                            <div className="recap-stat-row">
                                <span>sp.atk:</span>
                                <span>{data.spAtk}</span>
                            </div>
                            <div className="recap-stat-row">
                                <span>sp.def:</span>
                                <span>{data.spDef}</span>
                            </div>
                            <div className="recap-stat-row">
                                <span>speed:</span>
                                <span>{data.speed}</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div className="recap-question-content">Unknown question type</div>;
        }
    };

    const findOptionDisplay = (optionValue: string) => {
        const option = question.options.find(
            (opt: any) => opt.value === optionValue
        );

        if (option?.displayData?.image) {
            return (
                <div className="recap-answer-with-image">
                    <img
                        src={option.displayData.image}
                        alt="Answer"
                        className="recap-answer-image"
                    />
                    <span>{option.label}</span>
                </div>
            );
        }

        return <span>{option?.label || optionValue}</span>;
    };

    const isCorrect = answer.isCorrect;

    return (
        <div className="recap-question-card">
            <div className="recap-question-number">
                Question {questionIndex + 1}
            </div>

            {renderQuestionContent()}

            <div className="recap-answer-section">
                {isCorrect ? (
                    // Show only correct answer for correct responses
                    <div className="recap-answer-result correct">
                        <span className="recap-answer-icon">✓</span>
                        <div className="recap-answer-content">
                            <p className="recap-answer-label">Correct Answer:</p>
                            {findOptionDisplay(answer.correctAnswerId)}
                        </div>
                    </div>
                ) : (
                    // Show both user's answer and correct answer for incorrect responses
                    <>
                        <div className="recap-answer-result incorrect">
                            <span className="recap-answer-icon">✕</span>
                            <div className="recap-answer-content">
                                <p className="recap-answer-label">Your Answer:</p>
                                {findOptionDisplay(answer.selectedAnswerId)}
                            </div>
                        </div>
                        <div className="recap-answer-result correct">
                            <span className="recap-answer-icon">✓</span>
                            <div className="recap-answer-content">
                                <p className="recap-answer-label">Correct Answer:</p>
                                {findOptionDisplay(answer.correctAnswerId)}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const QuizRecap: React.FC = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState<QuizResult | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    // Load result from sessionStorage
    useEffect(() => {
        try {
            const resultStr = sessionStorage.getItem("quizResult");
            const questionsStr = sessionStorage.getItem("quizQuestions");

            if (!resultStr) {
                setError("No quiz result found. Please take a quiz first.");
                return;
            }

            const quizResult: QuizResult = JSON.parse(resultStr);
            setResult(quizResult);

            if (questionsStr) {
                const quizQuestions = JSON.parse(questionsStr);
                setQuestions(quizQuestions);
            }
        } catch (err) {
            setError("Failed to load quiz results. Please try again.");
            console.error("Error loading result:", err);
        }
    }, []);

    const handleTryAgain = () => {
        if (!result) return;

        // Keep same config for restart
        sessionStorage.setItem("quizConfig", JSON.stringify(result.config));
        sessionStorage.removeItem("quizResult");
        sessionStorage.removeItem("quizQuestions");
        // Keep quizPool if it exists for faster restart

        // Navigate directly to play page to restart with same parameters
        navigate("/quiz/play");
    };

    const handleChangeQuiz = () => {
        sessionStorage.removeItem("quizConfig");
        sessionStorage.removeItem("quizResult");
        sessionStorage.removeItem("quizQuestions");
        navigate("/quiz");
    };

    const handleBackToPokédex = () => {
        sessionStorage.removeItem("quizConfig");
        sessionStorage.removeItem("quizResult");
        sessionStorage.removeItem("quizQuestions");
        navigate("/");
    };

    if (error) {
        return (
            <div className="quiz-recap-container">
                <div className="error-message">{error}</div>
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    Back to Pokédex
                </button>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="quiz-recap-container">
                <p>Loading results...</p>
            </div>
        );
    }

    const isSuddenDeath = result.isSuddenDeath;

    return (
        <div className="quiz-recap-container">
            <div className="quiz-recap-header">
                {isSuddenDeath ? (
                    <h1>Sudden Death: {result.correctAnswers} Questions Correct</h1>
                ) : (
                    <div className="recap-score-header">
                        <h1>Quiz Complete!</h1>
                        <div className="recap-score">
                            Score: {result.correctAnswers}/{result.totalQuestions} (
                            {result.score}%)
                        </div>
                    </div>
                )}

                <div className="recap-config-summary">
                    <span>Difficulty: {result.config.difficulty}</span>
                    <span>Length: {result.config.length}</span>
                </div>
            </div>

            {/* Question Review Section */}
            <div className="recap-questions-section">
                {isSuddenDeath ? (
                    // Sudden Death: Show only the final question (the incorrect one)
                    <>
                        {result.answers.length > 0 && questions.length > 0 && (
                            <RecapQuestionDisplay
                                questionIndex={result.answers.length - 1}
                                answer={result.answers[result.answers.length - 1]}
                                question={
                                    questions[questions.length - 1] ||
                                    result.answers[result.answers.length - 1]
                                }
                            />
                        )}
                    </>
                ) : (
                    // Standard Mode: Show all questions in order
                    <>
                        {result.answers.map((answer, index) => (
                            <RecapQuestionDisplay
                                key={answer.questionId}
                                questionIndex={index}
                                answer={answer}
                                question={questions[index] || answer}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* Action Buttons */}
            <div className="recap-actions">
                {isSuddenDeath ? (
                    <>
                        <button
                            className="recap-button primary"
                            onClick={handleTryAgain}
                        >
                            Try Again Sudden Death
                        </button>
                        <button
                            className="recap-button secondary"
                            onClick={handleChangeQuiz}
                        >
                            Change Quiz
                        </button>
                        <button
                            className="recap-button secondary"
                            onClick={handleBackToPokédex}
                        >
                            Back to Pokédex
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="recap-button primary"
                            onClick={handleTryAgain}
                        >
                            Try Again
                        </button>
                        <button
                            className="recap-button secondary"
                            onClick={handleChangeQuiz}
                        >
                            Change Quiz
                        </button>
                        <button
                            className="recap-button secondary"
                            onClick={handleBackToPokédex}
                        >
                            Back to Pokédex
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizRecap;
