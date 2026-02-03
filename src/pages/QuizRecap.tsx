import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizResult, QuizConfig } from "../types/quiz";

interface RecapQuestionDisplayProps {
    questionIndex: number;
    answer: any;
    question: any;
}

/**
 * Component to display a Pokemon answer in card style (image + name)
 */
const PokemonAnswerCard: React.FC<{
    label: string;
    image?: string;
    variant?: "correct" | "incorrect" | "neutral";
}> = ({ label, image, variant = "neutral" }) => {
    const variantClass = variant === "correct" 
        ? "pokemon-answer-card--correct" 
        : variant === "incorrect" 
            ? "pokemon-answer-card--incorrect" 
            : "";

    return (
        <div className={`pokemon-answer-card ${variantClass}`}>
            {image && (
                <img
                    src={image}
                    alt={label}
                    className="pokemon-answer-card__image"
                />
            )}
            <span className="pokemon-answer-card__name">{label}</span>
        </div>
    );
};

const RecapQuestionDisplay: React.FC<RecapQuestionDisplayProps> = ({
    questionIndex,
    answer,
    question
}) => {
    const isCorrect = answer.isCorrect;

    // Get question text based on type
    const getQuestionText = () => {
        switch (question.type) {
            case "image-to-name":
                return "What is this Pokémon?";
            case "name-to-image":
                return `Which sprite belongs to ${question.questionData?.name}?`;
            case "pokemon-to-type":
                return `What type(s) is ${question.questionData?.name}?`;
            case "description-to-pokemon":
                return "Which Pokémon is described as:";
            case "number-to-pokemon":
                return "Which Pokémon has this number?";
            case "pokemon-to-number":
                return `What is ${question.questionData?.name}'s number?`;
            case "pre-evolution-to-pokemon":
                return `Who evolves into ${question.questionData?.pokemonName}?`;
            case "pokemon-to-post-evolution":
                return `What does ${question.questionData?.name} evolve into?`;
            case "height-weight-to-pokemon":
                return "Which Pokémon has these measurements?";
            case "stats-to-pokemon":
                return "Which Pokémon has these stats?";
            default:
                return "Question";
        }
    };

    // Get question image if applicable
    const getQuestionImage = () => {
        const data = question.questionData;
        switch (question.type) {
            case "image-to-name":
            case "pokemon-to-type":
            case "pokemon-to-number":
            case "pre-evolution-to-pokemon":
            case "pokemon-to-post-evolution":
                return data?.image;
            default:
                return null;
        }
    };

    // Get additional question info (description, number, stats, etc.)
    const renderQuestionExtras = () => {
        const data = question.questionData;
        
        switch (question.type) {
            case "description-to-pokemon":
                return (
                    <div className="recap-question-extra recap-question-extra--description">
                        {data?.description}
                    </div>
                );
            case "number-to-pokemon":
                return (
                    <div className="recap-question-extra recap-question-extra--number">
                        {data?.number}
                    </div>
                );
            case "height-weight-to-pokemon":
                return (
                    <div className="recap-question-extra recap-question-extra--measurements">
                        <span>Height: {data?.height}</span>
                        <span>Weight: {data?.weight}</span>
                    </div>
                );
            case "stats-to-pokemon":
                return (
                    <div className="recap-question-extra recap-question-extra--stats">
                        <div className="recap-stat"><span>hp:</span> <strong>{data?.hp}</strong></div>
                        <div className="recap-stat"><span>atk:</span> <strong>{data?.attack}</strong></div>
                        <div className="recap-stat"><span>def:</span> <strong>{data?.defense}</strong></div>
                        <div className="recap-stat"><span>sp.atk:</span> <strong>{data?.spAtk}</strong></div>
                        <div className="recap-stat"><span>sp.def:</span> <strong>{data?.spDef}</strong></div>
                        <div className="recap-stat"><span>speed:</span> <strong>{data?.speed}</strong></div>
                    </div>
                );
            default:
                return null;
        }
    };

    // Find option data by value
    const findOption = (optionValue: string) => {
        return question.options?.find((opt: any) => opt.value === optionValue);
    };

    const userOption = findOption(answer.selectedAnswerId?.replace("opt-", "")) 
        || findOption(answer.selectedAnswerId);
    const correctOption = findOption(answer.correctAnswerId?.replace("opt-", ""))
        || findOption(answer.correctAnswerId);

    const questionImage = getQuestionImage();

    return (
        <div className={`recap-question-block ${isCorrect ? "recap-question-block--correct" : "recap-question-block--incorrect"}`}>
            {/* Question Header */}
            <div className="recap-question-block__header">
                <span className="recap-question-block__number">Q{questionIndex + 1}</span>
                <span className={`recap-question-block__status ${isCorrect ? "status--correct" : "status--incorrect"}`}>
                    {isCorrect ? "✓ Correct" : "✕ Incorrect"}
                </span>
            </div>

            {/* Question Content */}
            <div className="recap-question-block__question">
                <p className="recap-question-block__text">{getQuestionText()}</p>
                
                {questionImage && (
                    <img
                        src={questionImage}
                        alt="Question Pokemon"
                        className="recap-question-block__image"
                    />
                )}

                {renderQuestionExtras()}
            </div>

            {/* Answer Section */}
            <div className="recap-question-block__answers">
                {isCorrect ? (
                    // Correct: Show only user's answer
                    <div className="recap-answer-row">
                        <span className="recap-answer-row__label">Your answer:</span>
                        <PokemonAnswerCard
                            label={userOption?.label || answer.selectedAnswerId}
                            image={userOption?.displayData?.image}
                            variant="correct"
                        />
                    </div>
                ) : (
                    // Incorrect: Show user's answer + correct answer
                    <>
                        <div className="recap-answer-row">
                            <span className="recap-answer-row__label">Your answer:</span>
                            <PokemonAnswerCard
                                label={userOption?.label || answer.selectedAnswerId || "No answer"}
                                image={userOption?.displayData?.image}
                                variant="incorrect"
                            />
                        </div>
                        <div className="recap-answer-row">
                            <span className="recap-answer-row__label">Correct answer:</span>
                            <PokemonAnswerCard
                                label={correctOption?.label || answer.correctAnswerId}
                                image={correctOption?.displayData?.image}
                                variant="correct"
                            />
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
                            className="recap-button secondary secondary-blue"
                            onClick={handleChangeQuiz}
                        >
                            Change Quiz
                        </button>
                        <button
                            className="recap-button secondary secondary-blue"
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
                            className="recap-button secondary secondary-blue"
                            onClick={handleChangeQuiz}
                        >
                            Change Quiz
                        </button>
                        <button
                            className="recap-button secondary secondary-blue"
                            onClick={handleBackToPokédex}
                        >
                            Back to Pokédex
                        </button>
                    </>
                )}
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
        </div>
    );
};

export default QuizRecap;
