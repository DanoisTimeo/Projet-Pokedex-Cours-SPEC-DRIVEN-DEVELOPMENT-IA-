import React from "react";
import { useParams } from "react-router-dom";

const PokemonDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h1>Pokémon Detail</h1>
            <p>Loading Pokémon {id}...</p>
        </div>
    );
};

export default PokemonDetail;
