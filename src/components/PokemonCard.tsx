import React from "react";
import { useNavigate } from "react-router-dom";
import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/pokemon/${pokemon.id}`);
    };

    return (
        <div className="pokemon-card" onClick={handleClick}>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-card-sprite"
            />
            <p className="pokemon-card-name">{pokemon.name}</p>
            <p className="pokemon-card-id">#{pokemon.id}</p>
        </div>
    );
};

export default PokemonCard;
