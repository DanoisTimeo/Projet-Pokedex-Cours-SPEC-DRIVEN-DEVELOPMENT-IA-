import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import QuizSetup from "./pages/QuizSetup";
import QuizPlay from "./pages/QuizPlay";
import QuizRecap from "./pages/QuizRecap";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="gameboy-shell">
                <div className="gameboy-screen">
                    <Routes>
                        <Route path="/" element={<PokemonList />} />
                        <Route path="/pokemon/:id" element={<PokemonDetail />} />
                        <Route path="/quiz" element={<QuizSetup />} />
                        <Route path="/quiz/play" element={<QuizPlay />} />
                        <Route path="/quiz/recap" element={<QuizRecap />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
