import React from "react";
import { useNavigate } from "react-router-dom";
import type { EvolutionDisplayData } from "../types/pokemon";

interface EvolutionChainProps {
    evolutions: EvolutionDisplayData[];
    loading: boolean;
    error: string | null;
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutions, loading, error }) => {
    const navigate = useNavigate();

    const handleEvolutionClick = (id: number) => {
        navigate(`/pokemon/${id}`);
    };

    // Render loading state
    if (loading) {
        return (
            <div className="evolution-chain">
                <h3>Evolution</h3>
                <div className="evolution-chain-content">
                    <div className="loading-text">Loading...</div>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="evolution-chain">
                <h3>Evolution</h3>
                <div className="evolution-chain-content">
                    <div className="error-text">Unable to load evolutions</div>
                </div>
            </div>
        );
    }

    // Render empty state
    if (evolutions.length === 0) {
        return (
            <div className="evolution-chain">
                <h3>Evolution</h3>
                <div className="evolution-chain-content">
                    <div className="no-evolutions-text">No evolutions</div>
                </div>
            </div>
        );
    }

    // Render evolution chain
    return (
        <div className="evolution-chain">
            <h3>Evolution</h3>
            <div className="evolution-chain-content">
                <div className="evolution-list">
                    {evolutions.map((evolution, index) => (
                        <React.Fragment key={evolution.id}>
                            <div 
                                className="evolution-item"
                                onClick={() => handleEvolutionClick(evolution.id)}
                            >
                                <div className="evolution-image">
                                    <img 
                                        src={evolution.imageUrl} 
                                        alt={evolution.name}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="evolution-name">
                                    {evolution.name.charAt(0).toUpperCase() + evolution.name.slice(1)}
                                </div>
                                <div className="evolution-id">
                                    #{evolution.id.toString().padStart(3, "0")}
                                </div>
                            </div>
                            {index < evolutions.length - 1 && (
                                <div className="evolution-arrow">→</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EvolutionChain;