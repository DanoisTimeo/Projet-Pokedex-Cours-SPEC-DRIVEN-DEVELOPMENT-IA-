# Pokédex - Game Boy Edition

A retro-styled Pokédex application inspired by the classic Game Boy, built with React and TypeScript. Browse, search, and explore detailed information about Pokémon using data from the public [PokeAPI](https://pokeapi.co/).

![Game Boy Pokédex](https://img.shields.io/badge/React-19.2.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## ⚠️ Warning — Academic Project & Generative AI

This project is **my submission for a generative AI course**.

The development was carried out **with the assistance of an artificial intelligence**, following the **Spec Driven Development** methodology.

## ✨ Features

-   🎮 **Retro Game Boy UI** - Authentic red shell design with Press Start 2P pixel font
-   📋 **Pokémon List** - Browse Pokémon with infinite scroll pagination (20 per page)
-   🔍 **Search** - Find Pokémon by name or ID number
-   📊 **Detailed View** - View complete Pokémon information including:
    -   High-quality official artwork
    -   Types, height, and weight (with unit conversions)
    -   English descriptions
    -   Base stats with visual bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
-   🎯 **Client-side Only** - No backend, no authentication, no database
-   🐳 **Docker Support** - Run in development or production mode with Docker

## 🚀 Installation

### Prerequisites

-   **Node.js** 20+ (or Docker)
-   **npm** (comes with Node.js)

### Method 1: Local Development (npm)

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Projet-Pokedex-Cours-SPEC-DRIVEN-DEVELOPMENT-IA-
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the development server**

    ```bash
    npm run dev
    ```

4. **Open your browser**
    - Navigate to `http://localhost:3000`

### Method 2: Docker (Development)

1. **Start with Docker Compose**

    ```bash
    docker-compose up pokedex-dev
    ```

2. **Open your browser**
    - Navigate to `http://localhost:3000`
    - Hot reload is enabled - changes auto-refresh

### Method 3: Docker (Production)

1. **Build and run production container**

    ```bash
    docker-compose up pokedex-prod
    ```

2. **Open your browser**
    - Navigate to `http://localhost:8080`

## 📖 Usage Guide

### Browsing Pokémon

1. **Initial Load**: The app displays the first 20 Pokémon in ascending ID order (#1 → #20)
2. **Load More**: Click the "Load More" button at the bottom to load the next 20 Pokémon
3. **View Details**: Click any Pokémon card to see detailed information

### Searching Pokémon

1. **By Name**: Type a Pokémon name (e.g., `pikachu`) and press Enter or click Search
2. **By ID**: Type a Pokémon ID number (e.g., `25`) and press Enter or click Search
3. **Clear Search**: Click the "Clear" button to return to the full list
4. **Not Found**: If no Pokémon matches, you'll see a "No Pokémon found" message

### Navigation

-   **Back Button**: Click the back button on detail pages to return to the list
-   **Card Hover**: Cards scale up slightly when you hover over them
-   **Keyboard**: Press Enter in the search field to validate your search

## 🏗️ Project Structure

````
Projet-Pokedex-Cours-SPEC-DRIVEN-DEVELOPMENT-IA-/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── PokemonCard.tsx  # Individual Pokémon card
│   │   └── SearchBar.tsx    # Search input component
│   ├── pages/               # Page components
│   │   ├── PokemonList.tsx  # Home page with list
│   │   └── PokemonDetail.tsx # Detail page
│   ├── services/            # API integration
│   │   └── pokeapi.ts       # PokeAPI fetch functions
│   ├── types/               # TypeScript interfaces
│   │   └── pokemon.ts       # Type definitions
│   ├── utils/               # Utility functions
│   │   └── pokemon.ts       # Data transformation helpers
│   ├── styles/              # CSS styling
│   │   └── main.css         # Game Boy theme
│   ├── App.tsx              # Root component with routing
│   └── main.tsx             # Application entry point
├── docs/                    # Specification documentation
│   ├── 01-introduction.md   # Feature specifications
│   ├── 02-pokeapi.md        # API documentation
│   └── 03-ui-gameboy.md     # UI/UX specifications
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # Docker orchestration
└── package.json             # Dependencies and scripts

## 🔧 Available Scripts

- `npm run dev` - Start Vite development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🌐 API Information

This project uses the public [PokeAPI](https://pokeapi.co/):
- **Base URL**: `https://pokeapi.co/api/v2`
- **No authentication required**
- **Endpoints used**:
  - `/pokemon` - List and details
  - `/pokemon/{id}` - Individual Pokémon data
  - `/pokemon-species/{id}` - Pokémon descriptions

### API Limitations & Constraints

1. **Rate Limiting**: PokeAPI may rate-limit requests. The app handles errors gracefully.
2. **Data Scope**:
   - Not limited to first 151 Pokémon - all generations available
   - English names and descriptions only
   - Official artwork used for high-quality images
3. **Data Transformations**:
   - Heights converted from decimeters to meters
   - Weights converted from hectograms to kilograms
   - Descriptions cleaned (replaces `\f` with spaces)
4. **Network Dependency**: Requires internet connection to fetch Pokémon data
5. **CORS**: API supports CORS, works directly from browser

## 🎨 Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Docker** - Containerization
- **Press Start 2P Font** - Retro pixel typography

## 📝 Development Approach

The project was developed in sequential phases:
1. **Phase 1**: Project Foundation (TypeScript interfaces, routing)
2. **Phase 2**: API Integration (PokeAPI service, utilities)
3. **Phase 3**: Pokémon List (cards, pagination)
4. **Phase 4**: Search Functionality
5. **Phase 5**: Pokémon Detail Page
6. **Phase 6**: Game Boy UI Styling
7. **Phase 7**: Docker Configuration
8. **Phase 8**: Documentation

## 🐳 Docker Commands

```bash
# Development mode (hot reload enabled)
docker-compose up pokedex-dev

# Production mode
docker-compose up pokedex-prod

# Rebuild containers
docker-compose up --build pokedex-dev

# Stop all containers
docker-compose down

# Remove images and volumes
docker-compose down --rmi all -v
````
