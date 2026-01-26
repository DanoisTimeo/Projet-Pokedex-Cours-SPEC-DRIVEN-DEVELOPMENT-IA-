import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetails, fetchPokemonSpecies, getEvolutionChainData } from "../services/pokeapi";
import { convertHeight, convertWeight, getEnglishDescription } from "../utils/pokemon";
import EvolutionChain from "../components/EvolutionChain";
import type { Pokemon, PokemonSpecies, EvolutionDisplayData } from "../types/pokemon";

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [species, setSpecies] = useState<PokemonSpecies | null>(null);
    const [evolutions, setEvolutions] = useState<EvolutionDisplayData[]>([]);
    const [loading, setLoading] = useState(true);
    const [evolutionLoading, setEvolutionLoading] = useState(false);
    const [navigationLoading, setNavigationLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [evolutionError, setEvolutionError] = useState<string | null>(null);

    useEffect(() => {
        const loadPokemonData = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError(null);

                // Fetch Pokemon details and species data in parallel
                const [pokemonData, speciesData] = await Promise.all([
                    fetchPokemonDetails(id),
                    fetchPokemonSpecies(id),
                ]);

                setPokemon(pokemonData);
                setSpecies(speciesData);

                // Fetch evolution chain data after main data is loaded
                setEvolutionLoading(true);
                setEvolutionError(null);
                try {
                    const evolutionData = await getEvolutionChainData(speciesData);
                    setEvolutions(evolutionData);
                } catch (evolutionErr) {
                    const evolutionErrorMessage = evolutionErr instanceof Error 
                        ? evolutionErr.message 
                        : "Unable to load evolution data";
                    setEvolutionError(evolutionErrorMessage);
                } finally {
                    setEvolutionLoading(false);
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "An error occurred while loading Pokémon";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        loadPokemonData();
    }, [id]);

    const handleBack = () => {
        navigate("/");
    };

    const handlePrevious = async () => {
        if (!pokemon || pokemon.id <= 1 || navigationLoading) return;
        
        setNavigationLoading(true);
        try {
            navigate(`/pokemon/${pokemon.id - 1}`);
        } catch (err) {
            console.error("Navigation error:", err);
        } finally {
            // Navigation loading will be reset by the new component mount
            setNavigationLoading(false);
        }
    };

    const handleNext = async () => {
        if (!pokemon || navigationLoading) return;
        
        setNavigationLoading(true);
        try {
            navigate(`/pokemon/${pokemon.id + 1}`);
        } catch (err) {
            console.error("Navigation error:", err);
        } finally {
            // Navigation loading will be reset by the new component mount
            setNavigationLoading(false);
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className="pokemon-detail-container">
                <h1>Pokédex</h1>
                <p>Loading...</p>
            </div>
        );
    }

    // Render error state
    if (error || !pokemon) {
        return (
            <div className="pokemon-detail-container">
                <h1>Pokédex</h1>
                <div className="error-message">
                    <p>Error: {error || "Pokémon not found"}</p>
                </div>
                <button className="back-button" onClick={handleBack}>
                    Back to List
                </button>
            </div>
        );
    }

    // Get description
    const description = species ? getEnglishDescription(species.flavor_text_entries) : undefined;

    return (
        <div className="pokemon-detail-container">
            <h1>Pokédex</h1>

            <div className="pokemon-detail-navigation">
                <button className="back-button" onClick={handleBack}>
                    ← Back to List
                </button>
                
                <div className="pokemon-navigation-controls">
                    <button 
                        className="nav-button nav-previous" 
                        onClick={handlePrevious}
                        disabled={pokemon.id <= 1 || navigationLoading}
                    >
                        {navigationLoading ? "Loading..." : "← Previous"}
                    </button>
                    <button 
                        className="nav-button nav-next" 
                        onClick={handleNext}
                        disabled={navigationLoading}
                    >
                        {navigationLoading ? "Loading..." : "Next →"}
                    </button>
                </div>
            </div>

            <div className="pokemon-detail-card">
                {/* High quality sprite */}
                <div className="pokemon-detail-image">
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        className="pokemon-artwork"
                    />
                </div>

                {/* Basic Information */}
                <div className="pokemon-detail-info">
                    <h2 className="pokemon-detail-name">
                        {pokemon.name}
                        <span className="pokemon-detail-id">#{pokemon.id}</span>
                    </h2>

                    {/* Types */}
                    <div className="pokemon-types">
                        {pokemon.types
                            .sort((a, b) => a.slot - b.slot)
                            .map((typeInfo) => (
                                <span key={typeInfo.slot} className="pokemon-type-badge">
                                    {typeInfo.type.name}
                                </span>
                            ))}
                    </div>

                    {/* Physical stats */}
                    <div className="pokemon-physical-stats">
                        <div className="stat-item">
                            <span className="stat-label">Height:</span>
                            <span className="stat-value">{convertHeight(pokemon.height)} m</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Weight:</span>
                            <span className="stat-value">{convertWeight(pokemon.weight)} kg</span>
                        </div>
                    </div>

                    {/* Description */}
                    {description && (
                        <div className="pokemon-description">
                            <p>{description}</p>
                        </div>
                    )}

                    {/* Base Stats */}
                    <div className="pokemon-base-stats">
                        <h3>Base Stats</h3>
                        <div className="stats-list">
                            <div className="stat-row">
                                <span className="stat-name">HP</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[0].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[0].base_stat}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-name">Attack</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[1].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[1].base_stat}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-name">Defense</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[2].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[2].base_stat}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-name">Sp. Atk</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[3].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[3].base_stat}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-name">Sp. Def</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[4].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[4].base_stat}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-name">Speed</span>
                                <span className="stat-bar-container">
                                    <span
                                        className="stat-bar"
                                        style={{
                                            width: `${(pokemon.stats[5].base_stat / 255) * 100}%`,
                                        }}
                                    ></span>
                                </span>
                                <span className="stat-number">{pokemon.stats[5].base_stat}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Evolution Chain */}
            <EvolutionChain 
                evolutions={evolutions}
                loading={evolutionLoading}
                error={evolutionError}
            />
        </div>
    );
};

export default PokemonDetail;
