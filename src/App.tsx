import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="gameboy-shell">
                <div className="gameboy-screen">
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
