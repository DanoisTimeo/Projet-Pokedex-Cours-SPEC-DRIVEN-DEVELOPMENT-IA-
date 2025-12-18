import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
