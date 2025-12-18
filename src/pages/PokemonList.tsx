import React, { useState, useEffect } from "react";
import { fetchPokemonList, fetchPokemonDetails } from "../services/pokeapi";
import PokemonCard from "../components/PokemonCard";
import type { Pokemon } from "../types/pokemon";

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const LIMIT = 20;

    // Fetch Pokemon list and their details
    const loadPokemon = async (currentOffset: number, isLoadMore: boolean = false) => {
        try {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError(null);

            // Fetch list of Pokemon
            const listResponse = await fetchPokemonList(currentOffset, LIMIT);

            // Check if there are more Pokemon available
            setHasMore(listResponse.next !== null);

            // Fetch detailed data for each Pokemon
            const detailsPromises = listResponse.results.map((item) => {
                // Extract ID from URL
                const urlParts = item.url.split("/");
                const id = urlParts[urlParts.length - 2];
                return fetchPokemonDetails(id);
            });

            const pokemonDetails = await Promise.all(detailsPromises);

            // Sort by ID in ascending order
            pokemonDetails.sort((a, b) => a.id - b.id);

            // Update the list
            if (isLoadMore) {
                setPokemonList((prev) => [...prev, ...pokemonDetails]);
            } else {
                setPokemonList(pokemonDetails);
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "An error occurred while loading Pokémon";
            setError(errorMessage);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // Load initial Pokemon on component mount
    useEffect(() => {
        loadPokemon(0);
    }, []);

    // Handle "Load More" button click
    const handleLoadMore = () => {
        const newOffset = offset + LIMIT;
        setOffset(newOffset);
        loadPokemon(newOffset, true);
    };

    // Render loading state
    if (loading) {
        return (
            <div className="pokemon-list-container">
                <h1>Pokédex</h1>
                <p>Loading...</p>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="pokemon-list-container">
                <h1>Pokédex</h1>
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pokemon-list-container">
            <h1>Pokédex</h1>

            <div className="pokemon-grid">
                {pokemonList.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>

            {hasMore && (
                <div className="pagination-controls">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="load-more-button"
                    >
                        {loadingMore ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
