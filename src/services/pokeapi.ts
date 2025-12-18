// PokeAPI service module
// Based on specifications in docs/02-pokeapi.md

import type { PokemonListResponse, Pokemon, PokemonSpecies } from "../types/pokemon";

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
