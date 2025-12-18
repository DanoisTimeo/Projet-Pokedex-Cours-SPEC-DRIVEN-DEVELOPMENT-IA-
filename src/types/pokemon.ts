// TypeScript interfaces for Pokemon data
// Based on PokeAPI specification in docs/02-pokeapi.md

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string;
    other: {
        "official-artwork": {
            front_default: string;
        };
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number; // in decimeters
    weight: number; // in hectograms
    sprites: PokemonSprites;
    types: PokemonType[];
    stats: PokemonStat[];
    species: {
        name: string;
        url: string;
    };
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

export interface PokemonSpecies {
    id: number;
    name: string;
    flavor_text_entries: FlavorTextEntry[];
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}
