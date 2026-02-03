import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizConfig, Question, QuizSession, QuizAnswer } from "../types/quiz";
import {
    generateQuestion,
    validateAnswer,
    createQuizSession,
    recordAnswer,
    calculateQuizResult,
    clearQuizCache,
    preloadPokemonPool
} from "../services/quizService";
import { selectRandomQuestionType, getTimeLimitForQuestion } from "../utils/quiz";
import QuizTimer from "../components/QuizTimer";
import QuestionRenderer from "../components/QuestionRenderer";

const QuizPlay: React.FC = () => {
    const navigate = useNavigate();

    // Quiz state
    const [session, setSession] = useState<QuizSession | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [quizPool, setQuizPool] = useState<string[]>([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState<string>("Loading quiz...");
    const [error, setError] = useState<string>("");
    const [showQuitConfirm, setShowQuitConfirm] = useState(false);
    const [timerActive, setTimerActive] = useState(false);
    const [questionsAsked, setQuestionsAsked] = useState<Question[]>([]);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 3;

    // Load quiz config and pool from sessionStorage
    useEffect(() => {
        const initQuiz = async () => {
            try {
                const configStr = sessionStorage.getItem("quizConfig");
                const poolStr = sessionStorage.getItem("quizPool");

                if (!configStr || !poolStr) {
                    setError("Quiz configuration not found. Please start a new quiz.");
                    setIsLoading(false);
                    return;
                }

                const config: QuizConfig = JSON.parse(configStr);
                const pool: string[] = JSON.parse(poolStr);

                setQuizPool(pool);

                // Preload Pokemon data for better performance
                setLoadingMessage("Preparing Pokémon data...");
                const preloadCount = getQuestionCount(config.length) === Infinity ? 20 : getQuestionCount(config.length);
                await preloadPokemonPool(pool, preloadCount + 10, (loaded, total) => {
                    setLoadingMessage(`Loading Pokémon... ${loaded}/${total}`);
                });

                // Create quiz session
                const newSession = createQuizSession(config);
                setSession(newSession);

                // Load first question
                setLoadingMessage("Loading first question...");
                loadQuestion(newSession, pool);
            } catch (err) {
                setError("Failed to load quiz configuration. Please start a new quiz.");
                console.error("Error loading quiz:", err);
                setIsLoading(false);
            }
        };
        
        initQuiz();
    }, []);

    /**
     * Load the next question
     */
    const loadQuestion = async (sess: QuizSession, pool: string[], currentRetry: number = 0) => {
        try {
            setIsLoading(true);
            setSelectedAnswerId(null);
            setShowFeedback(false);
            setLoadingMessage("Loading question...");

            // Determine max questions
            const maxQuestions =
                sess.config.length === "Sudden Death" ? pool.length : getQuestionCount(sess.config.length);

            // Check if quiz is complete
            if (sess.answers.length >= maxQuestions) {
                // Quiz is done
                completeQuiz(sess);
                return;
            }

            // Select random question type
            const questionType = selectRandomQuestionType(sess.config.difficulty);

            // Select random Pokemon from pool
            const randomIndex = Math.floor(Math.random() * pool.length);
            const pokemonName = pool[randomIndex];

            // Generate question
            const question = await generateQuestion(
                questionType,
                sess.config.difficulty,
                pokemonName,
                pool,
                sess.answers.length + 1
            );

            setCurrentQuestion(question);
            setQuestionsAsked(prev => [...prev, question]);
            setTimerActive(true);
            setRetryCount(0); // Reset retry count on success
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? (err as any).message || err.message
                    : "Failed to load question";

            console.error("Error loading question:", err);

            // Retry logic with exponential backoff
            if (currentRetry < MAX_RETRIES) {
                const delay = Math.min(500 * Math.pow(2, currentRetry), 2000);
                setLoadingMessage(`Retrying... (${currentRetry + 1}/${MAX_RETRIES})`);
                setTimeout(() => {
                    loadQuestion(sess, pool, currentRetry + 1);
                }, delay);
            } else {
                // Max retries reached - skip to next question or show error
                if ((err as any).code === "QUESTION_LOAD_FAILED" || (err as any).code === "INSUFFICIENT_POKEMON") {
                    setLoadingMessage("Skipping problematic question...");
                    setTimeout(() => {
                        loadQuestion(sess, pool, 0);
                    }, 300);
                } else {
                    setError(`Unable to load question: ${errorMessage}. Please try again.`);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Get max questions for a quiz length
     */
    const getQuestionCount = (length: string): number => {
        switch (length) {
            case "Quick":
                return 5;
            case "Short":
                return 10;
            case "Normal":
                return 20;
            case "Long":
                return 40;
            default:
                return 20;
        }
    };

    /**
     * Handle answer selection
     */
    const handleSelectAnswer = (answerId: string) => {
        if (!showFeedback) {
            setSelectedAnswerId(answerId);
        }
    };

    /**
     * Handle answer confirmation
     */
    const handleConfirmAnswer = useCallback(async () => {
        if (!session || !currentQuestion || selectedAnswerId === null) return;

        setTimerActive(false);

        // Validate answer
        let isCorrect = false;
        if (selectedAnswerId === "answer-not-here") {
            isCorrect = currentQuestion.expertHasAnswerNotHere === true;
        } else {
            isCorrect = validateAnswer(currentQuestion, selectedAnswerId);
        }

        // Record answer
        const answer: QuizAnswer = {
            questionId: currentQuestion.id,
            questionType: currentQuestion.type,
            selectedAnswerId,
            correctAnswerId:
                selectedAnswerId === "answer-not-here"
                    ? "answer-not-here"
                    : currentQuestion.correctAnswer,
            isCorrect,
            timeSpent: 0, // Simplified for now
            answeredAt: Date.now()
        };

        const updatedSession = { ...session };
        recordAnswer(updatedSession, answer);
        setSession(updatedSession);

        // Show feedback
        setShowFeedback(true);

        // Auto-advance after 0 second delay
        // For Sudden Death mode, quit after first wrong answer
        setTimeout(() => {
            if (updatedSession.config.length === "Sudden Death" && !isCorrect) {
                completeQuiz(updatedSession);
            } else {
                loadQuestion(updatedSession, quizPool);
            }
        }, 0);
    }, [session, currentQuestion, selectedAnswerId, quizPool]);

    /**
     * Handle timer timeout
     */
    const handleTimeUp = useCallback(async () => {
        if (session && currentQuestion) {
            // If no answer selected, mark as wrong
            if (selectedAnswerId === null) {
                const answer: QuizAnswer = {
                    questionId: currentQuestion.id,
                    questionType: currentQuestion.type,
                    selectedAnswerId: "timeout",
                    correctAnswerId: currentQuestion.correctAnswer,
                    isCorrect: false,
                    timeSpent: getTimeLimitForQuestion(session.config.difficulty, currentQuestion.type),
                    answeredAt: Date.now()
                };

                const updatedSession = { ...session };
                recordAnswer(updatedSession, answer);
                setSession(updatedSession);

                setShowFeedback(true);
                setTimeout(() => {
                    if (updatedSession.config.length === "Sudden Death") {
                        completeQuiz(updatedSession);
                    } else {
                        loadQuestion(updatedSession, quizPool);
                    }
                }, 0);
            } else {
                // Auto-submit selected answer
                handleConfirmAnswer();
            }
        }
    }, [session, currentQuestion, selectedAnswerId, quizPool, handleConfirmAnswer]);

    /**
     * Complete quiz and navigate to recap
     */
    const completeQuiz = (sess: QuizSession) => {
        const result = calculateQuizResult(sess);
        sessionStorage.setItem("quizResult", JSON.stringify(result));
        sessionStorage.setItem("quizQuestions", JSON.stringify(questionsAsked));
        clearQuizCache();
        navigate("/quiz/recap");
    };

    /**
     * Handle quit button
     */
    const handleQuit = () => {
        setShowQuitConfirm(true);
        setTimerActive(false);
    };

    /**
     * Confirm quit
     */
    const handleConfirmQuit = () => {
        if (session) {
            const result = calculateQuizResult(session);
            sessionStorage.setItem("quizResult", JSON.stringify(result));
            sessionStorage.setItem("quizQuestions", JSON.stringify(questionsAsked));
            clearQuizCache();
            navigate("/quiz/recap");
        }
    };

    // Loading state
    if (isLoading && !currentQuestion) {
        return (
            <div className="quiz-play-container">
                <div className="quiz-play-content">
                    <div className="loading-indicator">
                        <div className="loading-spinner"></div>
                        <p className="loading-message">{loadingMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !currentQuestion) {
        return (
            <div className="quiz-play-container">
                <div className="quiz-play-content">
                    <div className="error-message">{error}</div>
                    <button
                        className="back-button"
                        onClick={() => navigate("/quiz")}
                    >
                        Back to Quiz Setup
                    </button>
                </div>
            </div>
        );
    }

    if (!session || !currentQuestion) {
        return (
            <div className="quiz-play-container">
                <div className="quiz-play-content">
                    <p>Unable to load quiz. Please try again.</p>
                </div>
            </div>
        );
    }

    // Get total questions for display
    const maxQuestions =
        session.config.length === "Sudden Death"
            ? "∞"
            : getQuestionCount(session.config.length);

    // Determine if this is Sudden Death mode
    const isSuddenDeathMode = session.config.length === "Sudden Death";
    const currentQuestionNumber = session.answers.length + 1;

    return (
        <div className="quiz-play-container">
            <div className="quiz-play-header">
                <div className="quiz-question-indicator">
                    {isSuddenDeathMode ? (
                        <span>Sudden Death: {session.answers.length} Correct</span>
                    ) : (
                        <span>
                            Question {currentQuestionNumber}/{maxQuestions}
                        </span>
                    )}
                </div>

                <QuizTimer
                    timeLimit={getTimeLimitForQuestion(
                        session.config.difficulty,
                        currentQuestion.type
                    )}
                    onTimeUp={handleTimeUp}
                    isActive={timerActive}
                    questionId={currentQuestion.id}
                />

                <button
                    className="quit-button"
                    onClick={handleQuit}
                    disabled={showQuitConfirm}
                >
                    Quit Quiz
                </button>
            </div>

            {/* Quit Confirmation Dialog */}
            {showQuitConfirm && (
                <div className="quiz-modal-overlay">
                    <div className="quiz-modal">
                        <h2>Are you sure?</h2>
                        <p>Your progress will not be saved.</p>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleConfirmQuit}
                            >
                                Quit
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => {
                                    setShowQuitConfirm(false);
                                    setTimerActive(true);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="quiz-play-content">
                <QuestionRenderer
                    question={currentQuestion}
                    selectedAnswerId={selectedAnswerId}
                    onSelectAnswer={handleSelectAnswer}
                    showFeedback={showFeedback}
                    isExpertMode={session.config.difficulty === "Expert"}
                />

                {/* Confirm Answer Button */}
                {!showFeedback && (
                    <button
                        className="confirm-answer-button"
                        onClick={handleConfirmAnswer}
                        disabled={selectedAnswerId === null}
                    >
                        Confirm Answer
                    </button>
                )}

                {/* Feedback Indicator */}
                {showFeedback && (
                    <div className="feedback-indicator">
                        {(() => {
                            let isCorrect = false;
                            if (selectedAnswerId === "answer-not-here") {
                                isCorrect =
                                    currentQuestion.expertHasAnswerNotHere === true;
                            } else {
                                const selectedOption = currentQuestion.options.find(
                                    (opt) => opt.id === selectedAnswerId
                                );
                                isCorrect =
                                    selectedOption?.value ===
                                    currentQuestion.correctAnswer;
                            }
                            return isCorrect ? (
                                <div className="feedback-correct">✓ Correct!</div>
                            ) : (
                                <div className="feedback-incorrect">✕ Wrong!</div>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPlay;
