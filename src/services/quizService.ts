// Quiz Service - Core quiz logic and state management
// Based on quiz feature specification in docs/06-quiz-feature.md

import type {
    QuizConfig,
    QuizSession,
    QuizAnswer,
    QuizResult,
    Generation,
    Question,
    QuestionOption,
    QuestionType,
    QuizDifficulty,
    QuizError,
    QuizPoolEntry
} from "../types/quiz";
import type { Pokemon, PokemonSpecies } from "../types/pokemon";
import {
    fetchGenerationDetails,
    fetchPokemonDetails,
    fetchPokemonSpecies
} from "./pokeapi";
import {
    selectRandomQuestionType,
    getTimeLimitForQuestion,
    filterEnglishDescription,
    cleanDescription,
    removeDuplicates,
    filterOut,
    shouldAnswerNotBeHere,
    validateQuestionPoolSize,
    randomSelect,
    shuffle
} from "../utils/quiz";

// ============================================================================
// CACHE MANAGEMENT
// ============================================================================

class QuizServiceCache {
    private generationCache: Map<number, Generation> = new Map();
    private pokemonCache: Map<string, Pokemon> = new Map();
    private speciesCache: Map<string, PokemonSpecies> = new Map();

    getGeneration(id: number): Generation | undefined {
        return this.generationCache.get(id);
    }

    setGeneration(id: number, generation: Generation): void {
        this.generationCache.set(id, generation);
    }

    getPokemon(nameOrId: string | number): Pokemon | undefined {
        return this.pokemonCache.get(String(nameOrId));
    }

    setPokemon(nameOrId: string | number, pokemon: Pokemon): void {
        this.pokemonCache.set(String(nameOrId), pokemon);
    }

    getSpecies(nameOrId: string | number): PokemonSpecies | undefined {
        return this.speciesCache.get(String(nameOrId));
    }

    setSpecies(nameOrId: string | number, species: PokemonSpecies): void {
        this.speciesCache.set(String(nameOrId), species);
    }

    clear(): void {
        this.generationCache.clear();
        this.pokemonCache.clear();
        this.speciesCache.clear();
    }
}

const quizCache = new QuizServiceCache();

// ============================================================================
// QUESTION POOL BUILDING
// ============================================================================

/**
 * Build a question pool from selected generations
 * Retrieves all Pokemon species from specified generations
 * @param generationIds - Array of generation IDs to include
 * @returns Array of Pokemon names available for question generation
 * @throws QuizError if pool building fails or is insufficient
 */
export async function buildQuestionPool(generationIds: number[]): Promise<string[]> {
    try {
        const allSpecies: string[] = [];

        // Fetch all generations and collect species
        for (const genId of generationIds) {
            let generation = quizCache.getGeneration(genId);

            if (!generation) {
                generation = await fetchGenerationDetails(genId);
                quizCache.setGeneration(genId, generation);
            }

            // Extract species names from this generation
            const speciesNames = generation.pokemon_species.map(species => species.name);
            allSpecies.push(...speciesNames);
        }

        // Remove duplicates
        const uniqueSpecies = removeDuplicates(allSpecies);

        if (uniqueSpecies.length === 0) {
            throw {
                code: "INSUFFICIENT_POKEMON",
                message: "No Pokémon found in selected generation(s)"
            } as QuizError;
        }

        return uniqueSpecies;
    } catch (error) {
        if (error && typeof error === "object" && "code" in error) {
            throw error as QuizError;
        }

        throw {
            code: "POOL_FETCH_FAILED",
            message: error instanceof Error ? error.message : "Failed to build question pool"
        } as QuizError;
    }
}

// ============================================================================
// QUESTION GENERATION
// ============================================================================

/**
 * Get question count for a quiz configuration
 */
function getQuestionCount(length: string): number {
    switch (length) {
        case "Quick":
            return 5;
        case "Short":
            return 10;
        case "Normal":
            return 20;
        case "Long":
            return 40;
        case "Sudden Death":
            return Infinity; // Continue until wrong answer
        default:
            return 20;
    }
}

/**
 * Select random wrong answers for a question
 * @param correctAnswer - The correct answer to exclude
 * @param pool - Pool of all possible answers
 * @param count - Number of wrong answers to select
 * @returns Array of wrong answer names
 */
async function selectWrongAnswers(
    correctAnswer: string,
    pool: string[],
    count: number
): Promise<string[]> {
    const available = filterOut(pool, correctAnswer);

    if (available.length < count) {
        throw {
            code: "INSUFFICIENT_POKEMON",
            message: `Not enough Pokémon to generate wrong answers (need ${count}, have ${available.length})`
        } as QuizError;
    }

    return randomSelect(available, count);
}

/**
 * Generate a single question based on type and configuration
 */
export async function generateQuestion(
    type: QuestionType,
    difficulty: QuizDifficulty,
    pokemonName: string,
    pool: string[],
    questionIndex: number
): Promise<Question> {
    try {
        // Fetch Pokemon data
        let pokemon = quizCache.getPokemon(pokemonName);
        if (!pokemon) {
            pokemon = await fetchPokemonDetails(pokemonName);
            quizCache.setPokemon(pokemonName, pokemon);
        }

        const timeLimit = getTimeLimitForQuestion(difficulty, type);
        const questionId = `q-${questionIndex}-${Date.now()}`;

        // Generate question based on type
        switch (type) {
            case "image-to-name":
                return generateImageToName(pokemon, pool, questionId, timeLimit);

            case "name-to-image":
                return generateNameToImage(pokemon, pool, questionId, timeLimit);

            case "pokemon-to-type":
                return generatePokemonToType(pokemon, pool, questionId, timeLimit);

            case "description-to-pokemon":
                return generateDescriptionToPokemon(pokemon, pool, questionId, timeLimit);

            case "number-to-pokemon":
                return generateNumberToPokemon(pokemon, pool, questionId, timeLimit);

            case "pokemon-to-number":
                return generatePokemonToNumber(pokemon, pool, questionId, timeLimit);

            case "pre-evolution-to-pokemon":
                return generatePreEvolutionToPokemon(pokemon, pool, questionId, timeLimit);

            case "pokemon-to-post-evolution":
                return generatePokemonToPostEvolution(pokemon, pool, questionId, timeLimit);

            case "height-weight-to-pokemon":
                return generateHeightWeightToPokemon(pokemon, pool, questionId, timeLimit);

            case "stats-to-pokemon":
                return generateStatsToPokemon(pokemon, pool, questionId, timeLimit);

            default:
                throw new Error(`Unknown question type: ${type}`);
        }
    } catch (error) {
        throw {
            code: "QUESTION_LOAD_FAILED",
            message: error instanceof Error ? error.message : "Failed to generate question"
        } as QuizError;
    }
}

// ============================================================================
// QUESTION TYPE GENERATORS
// ============================================================================

async function generateImageToName(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const options = shuffle([pokemon.name, ...wrongAnswers]);

    return {
        id: questionId,
        type: "image-to-name",
        difficulty: "Normal",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            image: pokemon.sprites.front_default,
            pokemonId: pokemon.id
        },
        options: options.map(name => ({
            id: `opt-${name}`,
            label: name,
            value: name
        }))
    };
}

async function generateNameToImage(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswerNames = await selectWrongAnswers(pokemon.name, pool, 3);

    // Fetch sprites for wrong answers
    const wrongPokemon = await Promise.all(
        wrongAnswerNames.map(name => fetchPokemonDetails(name))
    );

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "name-to-image",
        difficulty: "Normal",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            name: pokemon.name
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.front_default
            }
        }))
    };
}

async function generatePokemonToType(
    pokemon: Pokemon,
    _pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const correctTypes = pokemon.types
        .sort((a, b) => a.slot - b.slot)
        .map(t => t.type.name)
        .join("/");

    return {
        id: questionId,
        type: "pokemon-to-type",
        difficulty: "Normal",
        timeLimit,
        correctAnswer: correctTypes,
        questionData: {
            image: pokemon.sprites.other["official-artwork"].front_default,
            name: pokemon.name,
            pokemonId: pokemon.id
        },
        options: [
            {
                id: "opt-correct",
                label: correctTypes,
                value: correctTypes
            }
            // Additional options would be generated based on Pokemon type count
            // This is simplified for infrastructure phase
        ]
    };
}

async function generateDescriptionToPokemon(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    // Fetch species data for description
    let species = quizCache.getSpecies(pokemon.id);
    if (!species) {
        species = await fetchPokemonSpecies(pokemon.id);
        quizCache.setSpecies(pokemon.id, species);
    }

    const description = filterEnglishDescription(species.flavor_text_entries || []);
    const cleanedDescription = cleanDescription(description);

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "description-to-pokemon",
        difficulty: "Hard",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            description: cleanedDescription
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.front_default
            }
        }))
    };
}

async function generateNumberToPokemon(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "number-to-pokemon",
        difficulty: "Hard",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            number: `#${pokemon.id}`,
            pokedexNumber: pokemon.id
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.front_default
            }
        }))
    };
}

async function generatePokemonToNumber(
    pokemon: Pokemon,
    _pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const correctNumber = pokemon.id.toString();

    return {
        id: questionId,
        type: "pokemon-to-number",
        difficulty: "Hard",
        timeLimit,
        correctAnswer: correctNumber,
        questionData: {
            image: pokemon.sprites.other["official-artwork"].front_default,
            name: pokemon.name,
            pokemonId: pokemon.id
        },
        options: [
            {
                id: "opt-correct",
                label: `#${pokemon.id}`,
                value: correctNumber
            }
            // Additional number options would be generated here
        ]
    };
}

async function generatePreEvolutionToPokemon(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "pre-evolution-to-pokemon",
        difficulty: "Hard",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            pokemonName: pokemon.name,
            pokemonId: pokemon.id,
            image: pokemon.sprites.other["official-artwork"].front_default
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.front_default
            }
        }))
    };
}

async function generatePokemonToPostEvolution(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "pokemon-to-post-evolution",
        difficulty: "Hard",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            image: pokemon.sprites.other["official-artwork"].front_default,
            name: pokemon.name,
            pokemonId: pokemon.id
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.front_default
            }
        }))
    };
}

async function generateHeightWeightToPokemon(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKg = (pokemon.weight / 10).toFixed(1);

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "height-weight-to-pokemon",
        difficulty: "Expert",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            height: `${heightInMeters} m`,
            weight: `${weightInKg} kg`,
            heightDecimeters: pokemon.height,
            weightHectograms: pokemon.weight
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.other["official-artwork"].front_default
            }
        }))
    };
}

async function generateStatsToPokemon(
    pokemon: Pokemon,
    pool: string[],
    questionId: string,
    timeLimit: number
): Promise<Question> {
    const wrongAnswers = await selectWrongAnswers(pokemon.name, pool, 3);
    const wrongPokemon = await Promise.all(
        wrongAnswers.map(name => fetchPokemonDetails(name))
    );

    // Format stats
    const stats = pokemon.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {} as Record<string, number>);

    const allPokemon = [pokemon, ...wrongPokemon];
    const shuffled = shuffle(allPokemon);

    return {
        id: questionId,
        type: "stats-to-pokemon",
        difficulty: "Expert",
        timeLimit,
        correctAnswer: pokemon.name,
        questionData: {
            stats: stats,
            hp: stats["hp"],
            attack: stats["attack"],
            defense: stats["defense"],
            spAtk: stats["sp-atk"],
            spDef: stats["sp-def"],
            speed: stats["speed"]
        },
        options: shuffled.map(p => ({
            id: `opt-${p.name}`,
            label: p.name,
            value: p.name,
            displayData: {
                image: p.sprites.other["official-artwork"].front_default
            }
        }))
    };
}

// ============================================================================
// ANSWER VALIDATION
// ============================================================================

/**
 * Validate an answer for a question
 * @param question - The question being answered
 * @param selectedAnswerId - ID of the selected option
 * @returns true if answer is correct, false otherwise
 */
export function validateAnswer(question: Question, selectedAnswerId: string): boolean {
    const selectedOption = question.options.find(opt => opt.id === selectedAnswerId);

    if (!selectedOption) {
        return false;
    }

    return selectedOption.value === question.correctAnswer;
}

// ============================================================================
// QUIZ SESSION MANAGEMENT
// ============================================================================

/**
 * Create a new quiz session
 */
export function createQuizSession(config: QuizConfig): QuizSession {
    return {
        config,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        startTime: Date.now(),
        status: "loading"
    };
}

/**
 * Record an answer in the quiz session
 */
export function recordAnswer(
    session: QuizSession,
    answer: QuizAnswer
): void {
    session.answers.push(answer);
}

/**
 * Calculate final quiz result
 */
export function calculateQuizResult(session: QuizSession): QuizResult {
    const correctAnswers = session.answers.filter(a => a.isCorrect).length;
    const endTime = Date.now();
    const duration = Math.floor((endTime - session.startTime) / 1000);

    return {
        config: session.config,
        totalQuestions: session.answers.length,
        correctAnswers,
        score: correctAnswers === 0 ? 0 : Math.round((correctAnswers / session.answers.length) * 100),
        answers: session.answers,
        duration,
        isSuddenDeath: session.config.length === "Sudden Death"
    };
}

// ============================================================================
// CACHE CLEANUP
// ============================================================================

/**
 * Clear quiz cache
 */
export function clearQuizCache(): void {
    quizCache.clear();
}
