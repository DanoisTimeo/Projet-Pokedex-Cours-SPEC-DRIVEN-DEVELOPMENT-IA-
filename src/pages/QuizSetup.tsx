import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { QuizConfig, QuizDifficulty, QuizLength } from "../types/quiz";
import type { GenerationListResponse } from "../types/quiz";
import { fetchGenerationList } from "../services/pokeapi";
import { buildQuestionPool } from "../services/quizService";

const QuizSetup: React.FC = () => {
    const navigate = useNavigate();

    // Configuration state
    const [difficulty, setDifficulty] = useState<QuizDifficulty>("Normal");
    const [length, setLength] = useState<QuizLength>("Normal");
    const [isCustomGenerations, setIsCustomGenerations] = useState(false);
    const [selectedGenerations, setSelectedGenerations] = useState<number[]>([]);

    // UI state
    const [generations, setGenerations] = useState<Array<{ id: number; name: string }>>([]);
    const [loadingGenerations, setLoadingGenerations] = useState(true);
    const [generationsError, setGenerationsError] = useState<string>("");
    const [isStarting, setIsStarting] = useState(false);
    const [startError, setStartError] = useState<string>("");

    // Load available generations on mount and restore config if available
    useEffect(() => {
        loadGenerations();
        restoreConfigFromSession();
    }, []);

    // Restore config from sessionStorage if available (for Try Again functionality)
    const restoreConfigFromSession = () => {
        const savedConfig = sessionStorage.getItem("quizConfig");
        if (savedConfig) {
            try {
                const config: QuizConfig = JSON.parse(savedConfig);
                setDifficulty(config.difficulty);
                setLength(config.length);
                setIsCustomGenerations(config.isCustomGenerations);
                if (config.isCustomGenerations) {
                    setSelectedGenerations(config.generations);
                }
            } catch (error) {
                console.error("Error restoring quiz config:", error);
            }
        }
    };

    /**
     * Load list of available generations from API
     */
    const loadGenerations = async () => {
        try {
            setLoadingGenerations(true);
            setGenerationsError("");

            const response: GenerationListResponse = await fetchGenerationList();
            const generationsList = response.results.map((gen, index) => ({
                id: index + 1, // Generation IDs start from 1
                name: gen.name.charAt(0).toUpperCase() + gen.name.slice(1)
            }));

            setGenerations(generationsList);

            // Default: select all generations
            setSelectedGenerations(generationsList.map(g => g.id));
        } catch (error) {
            setGenerationsError("Unable to load generation list. Please try again.");
            console.error("Error loading generations:", error);
        } finally {
            setLoadingGenerations(false);
        }
    };

    /**
     * Handle generation checkbox toggle
     */
    const toggleGeneration = (genId: number) => {
        setSelectedGenerations(prev =>
            prev.includes(genId)
                ? prev.filter(id => id !== genId)
                : [...prev, genId]
        );
    };

    /**
     * Handle start quiz button
     */
    const handleStartQuiz = async () => {
        try {
            setIsStarting(true);
            setStartError("");

            // Validate at least one generation is selected
            if (selectedGenerations.length === 0) {
                setStartError("Please select at least one generation.");
                setIsStarting(false);
                return;
            }

            // Determine question count
            let questionCount = 20;
            if (length !== "Sudden Death") {
                switch (length) {
                    case "Quick":
                        questionCount = 5;
                        break;
                    case "Short":
                        questionCount = 10;
                        break;
                    case "Normal":
                        questionCount = 20;
                        break;
                    case "Long":
                        questionCount = 40;
                        break;
                }
            } else {
                questionCount = 100; // Large number for Sudden Death (no hard limit)
            }

            // Build question pool
            const pool = await buildQuestionPool(selectedGenerations);

            // Validate pool size
            if (pool.length < questionCount && length !== "Sudden Death") {
                setStartError(
                    `Not enough Pokémon in selected generation(s). Please select more generations or reduce quiz length.`
                );
                setIsStarting(false);
                return;
            }

            if (pool.length < 1) {
                setStartError(
                    "No Pokémon found in selected generation(s). Please select more generations."
                );
                setIsStarting(false);
                return;
            }

            // Store quiz config in sessionStorage
            const quizConfig: QuizConfig = {
                difficulty,
                length,
                generations: selectedGenerations,
                isCustomGenerations
            };

            sessionStorage.setItem("quizConfig", JSON.stringify(quizConfig));
            sessionStorage.setItem("quizPool", JSON.stringify(pool));

            // Navigate to quiz play page
            navigate("/quiz/play");
        } catch (error) {
            setStartError("Unable to start quiz. Please try again.");
            console.error("Error starting quiz:", error);
        } finally {
            setIsStarting(false);
        }
    };

    /**
     * Handle back button
     */
    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="quiz-setup-container">
            <div className="quiz-setup-header">
                <h1>Quiz Configuration</h1>
                <button className="back-button" onClick={handleBack}>
                    ← Back to Pokédex
                </button>
            </div>

            {/* Difficulty Selector */}
            <div className="quiz-setup-section">
                <h2>Difficulty Level</h2>
                <div className="difficulty-options">
                    <button
                        className={`difficulty-button ${difficulty === "Normal" ? "selected" : ""}`}
                        onClick={() => setDifficulty("Normal")}
                    >
                        Normal
                        <span className="difficulty-info">
                            20 sec/question<br />3 types
                        </span>
                    </button>
                    <button
                        className={`difficulty-button ${difficulty === "Hard" ? "selected" : ""}`}
                        onClick={() => setDifficulty("Hard")}
                    >
                        Hard
                        <span className="difficulty-info">
                            20 sec/question<br />8 types mixed
                        </span>
                    </button>
                    <button
                        className={`difficulty-button ${difficulty === "Expert" ? "selected" : ""}`}
                        onClick={() => setDifficulty("Expert")}
                    >
                        Expert
                        <span className="difficulty-info">
                            5-15 sec/question<br />all types
                        </span>
                    </button>
                </div>
            </div>

            {/* Quiz Length Selector */}
            <div className="quiz-setup-section">
                <h2>Quiz Length</h2>
                <div className="length-options">
                    <button
                        className={`length-button ${length === "Quick" ? "selected" : ""}`}
                        onClick={() => setLength("Quick")}
                    >
                        Quick<br/>(5 questions)
                    </button>
                    <button
                        className={`length-button ${length === "Short" ? "selected" : ""}`}
                        onClick={() => setLength("Short")}
                    >
                        Short<br/>(10 questions)
                    </button>
                    <button
                        className={`length-button ${length === "Normal" ? "selected" : ""}`}
                        onClick={() => setLength("Normal")}
                    >
                        Normal<br/>(20 questions)
                    </button>
                    <button
                        className={`length-button ${length === "Long" ? "selected" : ""}`}
                        onClick={() => setLength("Long")}
                    >
                        Long<br/>(40 questions)
                    </button>
                    <button
                        className={`length-button ${length === "Sudden Death" ? "selected" : ""}`}
                        onClick={() => setLength("Sudden Death")}
                    >
                        Sudden Death<br/>(1st wrong = end)
                    </button>
                </div>
            </div>

            {/* Generations Selector */}
            <div className="quiz-setup-section">
                <h2>Pokémon Generations</h2>

                {loadingGenerations ? (
                    <div className="loading-message">Loading generations...</div>
                ) : generationsError ? (
                    <div className="error-message">{generationsError}</div>
                ) : (
                    <>
                        <div className="generations-mode">
                            <label className="mode-toggle">
                                <input
                                    type="checkbox"
                                    checked={isCustomGenerations}
                                    onChange={() => {
                                        setIsCustomGenerations(!isCustomGenerations);
                                        if (!isCustomGenerations) {
                                            // Custom mode: user can select
                                        } else {
                                            // Default mode: select all
                                            setSelectedGenerations(
                                                generations.map(g => g.id)
                                            );
                                        }
                                    }}
                                />
                                Custom Selection
                            </label>
                        </div>

                        <div className="generations-list">
                            {isCustomGenerations ? (
                                // Custom selection mode: show checkboxes
                                <div className="generations-checkboxes">
                                    {generations.map(gen => (
                                        <label key={gen.id} className="generation-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={selectedGenerations.includes(gen.id)}
                                                onChange={() => toggleGeneration(gen.id)}
                                            />
                                            {gen.name}
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                // Default mode: show all selected
                                <div className="generations-display">
                                    <p>All generations selected ({generations.length} total)</p>
                                    <div className="selected-gens">
                                        {generations.map(gen => (
                                            <span key={gen.id} className="gen-badge">
                                                {gen.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Start Button */}
            <div className="quiz-setup-actions">
                {startError && (
                    <div className="error-message large">{startError}</div>
                )}
                <button
                    className="start-quiz-button"
                    onClick={handleStartQuiz}
                    disabled={isStarting || loadingGenerations}
                >
                    {isStarting ? "Starting Quiz..." : "Start Quiz"}
                </button>
            </div>
        </div>
    );
};

export default QuizSetup;
