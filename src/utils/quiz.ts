// Utility functions for Quiz feature
// Based on quiz feature specification in docs/06-quiz-feature.md

import type { QuestionType, QuizDifficulty } from "../types/quiz";

// ============================================================================
// RANDOM & SHUFFLING UTILITIES
// ============================================================================

/**
 * Get a weighted random value from an array
 * Useful for difficulty-based question type distribution
 * @param items - Array of items to choose from
 * @param weights - Array of weights (must be same length as items)
 * @returns Randomly selected item based on weights
 */
export function weightedRandom<T>(items: T[], weights: number[]): T {
    if (items.length !== weights.length) {
        throw new Error("Items and weights arrays must have the same length");
    }

    if (items.length === 0) {
        throw new Error("Items array cannot be empty");
    }

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return items[i];
        }
    }

    // Fallback (should not reach here)
    return items[items.length - 1];
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param array - Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Select random items from array without duplicates
 * @param array - Array to select from
 * @param count - Number of items to select
 * @returns Array of randomly selected items (no duplicates)
 */
export function randomSelect<T>(array: T[], count: number): T[] {
    if (count > array.length) {
        throw new Error(`Cannot select ${count} items from array of length ${array.length}`);
    }

    const shuffled = shuffle(array);
    return shuffled.slice(0, count);
}

// ============================================================================
// QUESTION TYPE SELECTION & DISTRIBUTION
// ============================================================================

/**
 * Get question types available for a difficulty level
 * Based on docs/06-quiz-feature.md specification
 */
export function getQuestionTypesForDifficulty(difficulty: QuizDifficulty): QuestionType[] {
    switch (difficulty) {
        case "Normal":
            return [
                "image-to-name",
                "name-to-image",
                "pokemon-to-type"
            ];
        case "Hard":
            return [
                // Normal level types (Group A)
                "image-to-name",
                "name-to-image",
                "pokemon-to-type",
                // Hard-only types (Group B)
                "description-to-pokemon",
                "number-to-pokemon",
                "pokemon-to-number",
                "pre-evolution-to-pokemon",
                "pokemon-to-post-evolution"
            ];
        case "Expert":
            return [
                // Normal level types
                "image-to-name",
                "name-to-image",
                "pokemon-to-type",
                // Hard level types
                "description-to-pokemon",
                "number-to-pokemon",
                "pokemon-to-number",
                "pre-evolution-to-pokemon",
                "pokemon-to-post-evolution",
                // Expert-only types
                "height-weight-to-pokemon",
                "stats-to-pokemon"
            ];
    }
}

/**
 * Get weights for question type distribution based on difficulty
 * Implements equal probability within groups as per specification
 */
export function getQuestionTypeWeights(
    difficulty: QuizDifficulty
): Map<QuestionType, number> {
    const weights = new Map<QuestionType, number>();

    switch (difficulty) {
        case "Normal":
            // 3 types, each with 33.3% chance
            weights.set("image-to-name", 1 / 3);
            weights.set("name-to-image", 1 / 3);
            weights.set("pokemon-to-type", 1 / 3);
            break;

        case "Hard":
            // Group A (Normal questions): 40% total
            // - 3 types, each with 13.3% chance (1/3 of 40%)
            const groupAWeight = 0.4 / 3;
            weights.set("image-to-name", groupAWeight);
            weights.set("name-to-image", groupAWeight);
            weights.set("pokemon-to-type", groupAWeight);

            // Group B (Hard-only questions): 60% total
            // - 5 types, each with 12% chance (1/5 of 60%)
            const groupBWeight = 0.6 / 5;
            weights.set("description-to-pokemon", groupBWeight);
            weights.set("number-to-pokemon", groupBWeight);
            weights.set("pokemon-to-number", groupBWeight);
            weights.set("pre-evolution-to-pokemon", groupBWeight);
            weights.set("pokemon-to-post-evolution", groupBWeight);
            break;

        case "Expert":
            // Group A (Normal + Hard questions): 60% total
            // - 8 types, scaled inheritance from Hard level
            const hardTypeWeights = getQuestionTypeWeights("Hard");
            for (const [type, weight] of hardTypeWeights) {
                weights.set(type, weight * 0.6);
            }

            // Group B (Expert-only questions): 40% total
            // - 2 types, each with 20% chance (1/2 of 40%)
            const expertGroupBWeight = 0.4 / 2;
            weights.set("height-weight-to-pokemon", expertGroupBWeight);
            weights.set("stats-to-pokemon", expertGroupBWeight);
            break;
    }

    return weights;
}

/**
 * Select a random question type based on difficulty distribution
 */
export function selectRandomQuestionType(difficulty: QuizDifficulty): QuestionType {
    const types = getQuestionTypesForDifficulty(difficulty);
    const weights = getQuestionTypeWeights(difficulty);

    const weightArray = types.map(type => weights.get(type) || 0);

    return weightedRandom(types, weightArray);
}

// ============================================================================
// TIME LIMIT UTILITIES
// ============================================================================

/**
 * Get time limit for a question based on difficulty and type
 * Per docs/06-quiz-feature.md specification
 */
export function getTimeLimitForQuestion(
    difficulty: QuizDifficulty,
    questionType: QuestionType
): number {
    switch (difficulty) {
        case "Normal":
            return 20; // All questions: 20 seconds

        case "Hard":
            return 20; // All questions: 20 seconds base time

        case "Expert":
            // 5 seconds for most questions
            // 15 seconds for description-based questions
            if (questionType === "description-to-pokemon") {
                return 15;
            }
            return 5;
    }
}

// ============================================================================
// TEXT PROCESSING UTILITIES
// ============================================================================

/**
 * Filter English text from flavor text entries
 * @param entries - Array of flavor text entries from PokeAPI
 * @returns First English description found, or empty string
 */
export function filterEnglishDescription(
    entries: Array<{ language: { name: string }; flavor_text: string }>
): string {
    for (const entry of entries) {
        if (entry.language.name === "en") {
            return entry.flavor_text;
        }
    }
    return "";
}

/**
 * Clean Pokemon description text
 * Remove form feeds and extra whitespace
 * @param text - Raw description text
 * @returns Cleaned description
 */
export function cleanDescription(text: string): string {
    return text
        .replace(/\f/g, " ") // Replace form feeds with spaces
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();
}

// ============================================================================
// DUPLICATE FILTERING
// ============================================================================

/**
 * Remove duplicates from array
 * @param array - Array that may contain duplicates
 * @returns Array with duplicates removed
 */
export function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}

/**
 * Filter out a value from array
 * Useful for excluding correct answer from wrong options
 * @param array - Source array
 * @param exclude - Value to exclude
 * @returns Filtered array
 */
export function filterOut<T>(array: T[], exclude: T): T[] {
    return array.filter(item => item !== exclude);
}

// ============================================================================
// SCORE & RESULT UTILITIES
// ============================================================================

/**
 * Calculate quiz score as percentage
 * @param correctAnswers - Number of correct answers
 * @param totalQuestions - Total number of questions
 * @returns Score as percentage (0-100), rounded to nearest integer
 */
export function calculateScore(correctAnswers: number, totalQuestions: number): number {
    if (totalQuestions === 0) {
        return 0;
    }
    return Math.round((correctAnswers / totalQuestions) * 100);
}

/**
 * Calculate total duration in seconds
 * @param startTime - Timestamp when started
 * @param endTime - Timestamp when ended
 * @returns Duration in seconds
 */
export function calculateDuration(startTime: number, endTime: number): number {
    return Math.floor((endTime - startTime) / 1000);
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate Pokemon pool has enough entries for requested question count
 * @param poolSize - Number of Pokemon in pool
 * @param questionCount - Number of questions requested
 * @returns true if pool is sufficient, false otherwise
 */
export function validateQuestionPoolSize(poolSize: number, questionCount: number): boolean {
    return poolSize >= questionCount;
}

/**
 * Validate question data before rendering
 * Ensures all required fields are present
 */
export function validateQuestionData(questionType: QuestionType, data: Record<string, any>): boolean {
    // Basic validation - can be expanded based on specific question requirements
    if (!data) return false;

    switch (questionType) {
        case "image-to-name":
        case "name-to-image":
        case "pokemon-to-type":
        case "pokemon-to-number":
        case "pokemon-to-post-evolution":
        case "height-weight-to-pokemon":
        case "stats-to-pokemon":
            return data.pokemonId !== undefined || data.pokemonName !== undefined;

        case "description-to-pokemon":
            return data.description !== undefined && typeof data.description === "string";

        case "number-to-pokemon":
            return data.pokedexNumber !== undefined;

        case "pre-evolution-to-pokemon":
            return data.pokemonId !== undefined || data.pokemonName !== undefined;

        default:
            return false;
    }
}

// ============================================================================
// EXPERT MODE UTILITIES
// ============================================================================

/**
 * Determine if Expert mode question should have "The answer is not here" as correct
 * 10% chance per specification
 * @returns true if "The answer is not here" should be correct, false if it's a decoy
 */
export function shouldAnswerNotBeHere(): boolean {
    return Math.random() < 0.1;
}
