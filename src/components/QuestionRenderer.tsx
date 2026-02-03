import React from "react";
import type { Question } from "../types/quiz";

interface QuestionRendererProps {
    question: Question;
    selectedAnswerId: string | null;
    onSelectAnswer: (answerId: string) => void;
    showFeedback: boolean;
    isExpertMode: boolean;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
    question,
    selectedAnswerId,
    onSelectAnswer,
    showFeedback,
    isExpertMode
}) => {
    const renderQuestionContent = () => {
        const data = question.questionData;

        switch (question.type) {
            // Type 1: Image → Name
            case "image-to-name":
                return (
                    <div className="question-content image-type">
                        <p className="question-text">What is this Pokémon?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="question-image"
                            />
                        )}
                    </div>
                );

            // Type 2: Name → Image
            case "name-to-image":
                return (
                    <div className="question-content text-type">
                        <p className="question-text">Which sprite belongs to {data.name}?</p>
                    </div>
                );

            // Type 3: Pokémon → Type(s)
            case "pokemon-to-type":
                return (
                    <div className="question-content image-type">
                        <p className="question-text">What type(s) is this Pokémon?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="question-image"
                            />
                        )}
                        <p className="question-subtitle">{data.name}</p>
                    </div>
                );

            // Type 4: Description → Pokémon
            case "description-to-pokemon":
                return (
                    <div className="question-content text-type">
                        <p className="question-text">Which Pokémon is described as:</p>
                        <div className="question-description">{data.description}</div>
                    </div>
                );

            // Type 5: Number → Pokémon
            case "number-to-pokemon":
                return (
                    <div className="question-content text-type">
                        <p className="question-text">Which Pokémon has this number?</p>
                        <div className="question-number">{data.number}</div>
                    </div>
                );

            // Type 6: Pokémon → Number
            case "pokemon-to-number":
                return (
                    <div className="question-content image-type">
                        <p className="question-text">What is this Pokémon's number?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="question-image"
                            />
                        )}
                        <p className="question-subtitle">{data.name}</p>
                    </div>
                );

            // Type 7: Pre-evolution → Pokémon
            case "pre-evolution-to-pokemon":
                return (
                    <div className="question-content image-type">
                        <p className="question-text">Who evolves into {data.pokemonName}?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="question-image"
                            />
                        )}
                    </div>
                );

            // Type 8: Pokémon → Post-evolution
            case "pokemon-to-post-evolution":
                return (
                    <div className="question-content image-type">
                        <p className="question-text">What does this Pokémon evolve into?</p>
                        {data.image && (
                            <img
                                src={data.image}
                                alt="Pokemon"
                                className="question-image"
                            />
                        )}
                        <p className="question-subtitle">{data.name}</p>
                    </div>
                );

            // Type 9: Height/Weight → Pokémon
            case "height-weight-to-pokemon":
                return (
                    <div className="question-content text-type">
                        <p className="question-text">Which Pokémon has these measurements?</p>
                        <div className="question-measurements">
                            <div>Height: {data.height}</div>
                            <div>Weight: {data.weight}</div>
                        </div>
                    </div>
                );

            // Type 10: Base Statistics → Pokémon
            case "stats-to-pokemon":
                return (
                    <div className="question-content text-type">
                        <p className="question-text">Which Pokémon has these stats?</p>
                        <div className="question-stats">
                            <div className="stat-row">
                                <span>HP:</span>
                                <span>{data.hp}</span>
                            </div>
                            <div className="stat-row">
                                <span>ATK:</span>
                                <span>{data.attack}</span>
                            </div>
                            <div className="stat-row">
                                <span>DEF:</span>
                                <span>{data.defense}</span>
                            </div>
                            <div className="stat-row">
                                <span>SpA:</span>
                                <span>{data.spAtk}</span>
                            </div>
                            <div className="stat-row">
                                <span>SpD:</span>
                                <span>{data.spDef}</span>
                            </div>
                            <div className="stat-row">
                                <span>SPD:</span>
                                <span>{data.speed}</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div className="question-content">Unknown question type</div>;
        }
    };

    const renderAnswerOptions = () => {
        return (
            <div className="answer-options">
                {question.options.map((option) => {
                    const isSelected = selectedAnswerId === option.id;
                    const isCorrect = option.value === question.correctAnswer;
                    const showCorrectFeedback = showFeedback && isCorrect;
                    const showIncorrectFeedback = showFeedback && isSelected && !isCorrect;

                    let buttonClass = "answer-button";
                    if (isSelected) buttonClass += " selected";
                    if (showCorrectFeedback) buttonClass += " correct";
                    if (showIncorrectFeedback) buttonClass += " incorrect";

                    return (
                        <button
                            key={option.id}
                            className={buttonClass}
                            onClick={() => !showFeedback && onSelectAnswer(option.id)}
                            disabled={showFeedback}
                        >
                            <div className="answer-content">
                                {/* Display image if available (sprite questions) */}
                                {option.displayData?.image && (
                                    <img
                                        src={option.displayData.image}
                                        alt="Answer option"
                                        className="answer-image"
                                    />
                                )}

                                {/* Display text label */}
                                <span className="answer-label">{option.label}</span>

                                {/* Show feedback icons after submission */}
                                {showFeedback && (
                                    <span className="answer-feedback">
                                        {isCorrect && <span className="checkmark">✓</span>}
                                        {showIncorrectFeedback && <span className="cross">✕</span>}
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}

                {/* Expert mode: "The answer is not here" button */}
                {isExpertMode && (
                    <button
                        className={`answer-button expert-button ${selectedAnswerId === "answer-not-here" ? "selected" : ""} ${
                            showFeedback && question.expertHasAnswerNotHere ? "correct" : ""
                        } ${
                            showFeedback &&
                            selectedAnswerId === "answer-not-here" &&
                            !question.expertHasAnswerNotHere
                                ? "incorrect"
                                : ""
                        }`}
                        onClick={() =>
                            !showFeedback && onSelectAnswer("answer-not-here")
                        }
                        disabled={showFeedback}
                    >
                        <div className="answer-content">
                            <span className="answer-label">
                                The answer is not here
                            </span>
                            {showFeedback && (
                                <span className="answer-feedback">
                                    {question.expertHasAnswerNotHere && (
                                        <span className="checkmark">✓</span>
                                    )}
                                    {selectedAnswerId === "answer-not-here" &&
                                        !question.expertHasAnswerNotHere && (
                                            <span className="cross">✕</span>
                                        )}
                                </span>
                            )}
                        </div>
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="question-renderer">
            {renderQuestionContent()}
            {renderAnswerOptions()}
        </div>
    );
};

export default QuestionRenderer;
