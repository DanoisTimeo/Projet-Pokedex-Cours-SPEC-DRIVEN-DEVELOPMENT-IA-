import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.trim().toLowerCase());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setQuery("");
        onClear();
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search by name or ID..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
            <button className="clear-button" onClick={handleClear}>
                Clear
            </button>
        </div>
    );
};

export default SearchBar;
