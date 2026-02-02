// PokeAPI service module
// Based on specifications in docs/02-pokeapi.md

import type { 
    PokemonListResponse, 
    Pokemon, 
    PokemonSpecies, 
    EvolutionChain,
    ChainNode,
    EvolutionDisplayData
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetch a paginated list of Pokemon
 * @param offset - Starting index (default: 0)
 * @param limit - Number of Pokemon to fetch (default: 20)
 * @returns Promise with Pokemon list response
 */
export async function fetchPokemonList(
    offset: number = 0,
    limit: number = 20
): Promise<PokemonListResponse> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch Pokemon list: ${response.status} ${response.statusText}`
            );
        }

        const data: PokemonListResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error fetching Pokemon list: ${error.message}`);
        }
        throw new Error("Unknown error occurred while fetching Pokemon list");
    }
}

/**
 * Fetch detailed information about a specific Pokemon
 * @param idOrName - Pokemon ID (number) or name (string)
 * @returns Promise with Pokemon data
 */
export async function fetchPokemonDetails(idOrName: string | number): Promise<Pokemon> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No Pokémon found");
            }
            throw new Error(
                `Failed to fetch Pokemon details: ${response.status} ${response.statusText}`
            );
        }

        const data: Pokemon = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown error occurred while fetching Pokemon details");
    }
}

/**
 * Fetch Pokemon species information (includes description)
 * @param idOrName - Pokemon ID (number) or name (string)
 * @returns Promise with Pokemon species data
 */
export async function fetchPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies> {
    try {
        const response = await fetch(`${BASE_URL}/pokemon-species/${idOrName}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No Pokémon species found");
            }
            throw new Error(
                `Failed to fetch Pokemon species: ${response.status} ${response.statusText}`
            );
        }

        const data: PokemonSpecies = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown error occurred while fetching Pokemon species");
    }
}

/**
 * Fetch evolution chain data
 * @param evolutionChainUrl - URL to the evolution chain endpoint
 * @returns Promise with evolution chain data
 */
export async function fetchEvolutionChain(evolutionChainUrl: string): Promise<EvolutionChain> {
    try {
        const response = await fetch(evolutionChainUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No evolution chain found");
            }
            throw new Error(
                `Failed to fetch evolution chain: ${response.status} ${response.statusText}`
            );
        }

        const data: EvolutionChain = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Unknown error occurred while fetching evolution chain");
    }
}

/**
 * Collect all species names from evolution chain recursively
 * @param chain - The evolution chain node
 * @returns Array of species names
 */
export function collectEvolutionSpeciesNames(chain: ChainNode): string[] {
    const names: string[] = [];
    
    function traverse(node: ChainNode) {
        names.push(node.species.name);
        node.evolves_to.forEach(evolution => traverse(evolution));
    }
    
    traverse(chain);
    return names;
}

/**
 * Get complete evolution chain display data for a Pokemon
 * @param speciesData - Pokemon species data containing evolution_chain URL
 * @returns Promise with array of evolution display data
 */
export async function getEvolutionChainData(speciesData: PokemonSpecies): Promise<EvolutionDisplayData[]> {
    try {
        // Check if evolution chain exists
        if (!speciesData.evolution_chain?.url) {
            return [];
        }

        // Fetch evolution chain
        const evolutionChain = await fetchEvolutionChain(speciesData.evolution_chain.url);
        
        // Collect species names
        const speciesNames = collectEvolutionSpeciesNames(evolutionChain.chain);
        
        // If there's only one species (the Pokemon itself), return empty array
        if (speciesNames.length <= 1) {
            return [];
        }
        
        // Fetch Pokemon data for each species to get images and IDs
        const evolutionData = await Promise.all(
            speciesNames.map(async (name) => {
                const pokemon = await fetchPokemonDetails(name);
                return {
                    name: pokemon.name,
                    id: pokemon.id,
                    imageUrl: pokemon.sprites.other["official-artwork"].front_default
                };
            })
        );

        return evolutionData;
    } catch (error) {
        // Return empty array on error to not break the main detail page
        console.error("Error fetching evolution chain:", error);
        return [];
    }
}
