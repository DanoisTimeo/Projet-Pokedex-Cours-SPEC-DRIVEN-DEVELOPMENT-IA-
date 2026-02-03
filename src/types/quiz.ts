// TypeScript interfaces for Quiz feature
// Based on quiz feature specification in docs/06-quiz-feature.md

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

export type QuizDifficulty = "Normal" | "Hard" | "Expert";
export type QuizLength = "Quick" | "Short" | "Normal" | "Long" | "Sudden Death";

export interface Generation {
    id: number;
    name: string;
    pokemon_species: PokemonSpeciesReference[];
}

export interface PokemonSpeciesReference {
    name: string;
    url: string;
}

export interface QuizConfig {
    difficulty: QuizDifficulty;
    length: QuizLength;
    generations: number[]; // Array of generation IDs
    isCustomGenerations: boolean; // true if user selected custom generations, false if default (all)
}

// ============================================================================
// QUESTION TYPES
// ============================================================================

export type QuestionType =
    | "image-to-name" // Type 1: Image → Name (Normal)
    | "name-to-image" // Type 2: Name → Image (Normal)
    | "pokemon-to-type" // Type 3: Pokémon → Type(s) (Normal)
    | "description-to-pokemon" // Type 4: Description → Pokémon (Hard)
    | "number-to-pokemon" // Type 5: Number → Pokémon (Hard)
    | "pokemon-to-number" // Type 6: Pokémon → Number (Hard)
    | "pre-evolution-to-pokemon" // Type 7: Pre-evolution → Pokémon (Hard)
    | "pokemon-to-post-evolution" // Type 8: Pokémon → Post-evolution (Hard)
    | "height-weight-to-pokemon" // Type 9: Height/Weight → Pokémon (Expert)
    | "stats-to-pokemon"; // Type 10: Base Statistics → Pokémon (Expert)

export interface Question {
    id: string; // Unique question ID in quiz
    type: QuestionType;
    difficulty: QuizDifficulty;
    timeLimit: number; // Seconds
    correctAnswer: string; // Pokémon name or ID or combination depending on type
    options: QuestionOption[];
    questionData: Record<string, any>; // Type-specific data (image, description, stats, etc.)
    expertHasAnswerNotHere?: boolean; // Expert mode only: whether "The answer is not here" is the correct answer
}

export interface QuestionOption {
    id: string;
    label: string;
    value: string; // The actual answer value
    displayData?: Record<string, any>; // Type-specific display data (image, sprite, etc.)
}

// ============================================================================
// QUIZ SESSION STATE
// ============================================================================

export interface QuizSession {
    config: QuizConfig;
    questions: Question[];
    currentQuestionIndex: number;
    answers: QuizAnswer[];
    startTime: number; // Timestamp when quiz started
    endTime?: number; // Timestamp when quiz ended
    status: "setup" | "loading" | "playing" | "completed" | "quit";
}

export interface QuizAnswer {
    questionId: string;
    questionType: QuestionType;
    selectedAnswerId: string;
    correctAnswerId: string;
    isCorrect: boolean;
    timeSpent: number; // Seconds spent on this question
    answeredAt: number; // Timestamp
}

export interface QuizResult {
    config: QuizConfig;
    totalQuestions: number;
    correctAnswers: number;
    score: number; // Percentage (0-100)
    answers: QuizAnswer[];
    duration: number; // Total duration in seconds
    isSuddenDeath: boolean;
    questionsBeforeSuddenDeath?: number; // For sudden death mode
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface GenerationListResponse {
    count: number;
    next?: string;
    previous?: string;
    results: Array<{
        name: string;
        url: string;
    }>;
}

export interface GenerationDetailsResponse {
    id: number;
    name: string;
    pokemon_species: PokemonSpeciesReference[];
    main_region: {
        name: string;
        url: string;
    };
    names: Array<{
        language: { name: string; url: string };
        name: string;
    }>;
}

// ============================================================================
// CACHE & POOL TYPES
// ============================================================================

export interface QuizCache {
    generations: Map<number, Generation>;
    pokemonPool: Map<string, QuizPoolEntry>; // Cached during quiz session
}

export interface QuizPoolEntry {
    name: string;
    id: number;
    data: any; // Cached Pokemon data to avoid re-fetching
}

// ============================================================================
// ERROR & VALIDATION TYPES
// ============================================================================

export interface QuizError {
    code:
        | "GENERATION_FETCH_FAILED"
        | "POOL_FETCH_FAILED"
        | "QUIZ_START_FAILED"
        | "INSUFFICIENT_POKEMON"
        | "QUESTION_LOAD_FAILED"
        | "INVALID_CONFIG";
    message: string;
}
