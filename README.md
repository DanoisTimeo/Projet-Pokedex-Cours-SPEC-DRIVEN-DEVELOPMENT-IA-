# Pokédex - Game Boy Edition

A retro-styled Pokédex application inspired by the classic Game Boy, built with React and TypeScript. Browse, search, and explore detailed information about Pokémon using data from the public [PokeAPI](https://pokeapi.co/).

![Game Boy Pokédex](https://img.shields.io/badge/React-19.2.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## ⚠️ Warning — Academic Project & Generative AI

This project is **my submission for a generative AI course**.

The development was carried out **with the assistance of an artificial intelligence**, following the **Spec Driven Development** methodology.

## ✨ Features

- 🎮 **Retro Game Boy UI** - Authentic red shell design with Press Start 2P pixel font
- 📋 **Pokémon List** - Browse Pokémon with infinite scroll pagination (20 per page)
- 🔍 **Search** - Find Pokémon by name or ID number
- 📊 **Detailed View** - View complete Pokémon information including:
    - High-quality official artwork
    - Types, height, and weight (with unit conversions)
    - English descriptions
    - Base stats with visual bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- 🧬 **Evolution Chain** - See how Pokémon evolve and navigate through evolution trees
- ⬅️ ➡️ **Detail Navigation** - Previous/next buttons to browse Pokémon without returning to list
- 🎯 **Quiz Mode** - Test your Pokémon knowledge with 10 dynamic question types:
    - **3 Normal difficulties**: Image→Name, Name→Image, Pokémon→Types
    - **5 Hard questions**: Description→Pokémon, Number→Pokémon, Pokémon→Number, Pre-evolution, Post-evolution
    - **2 Expert questions**: Height/Weight→Pokémon, Stats→Pokémon
    - Configurable difficulty (Normal/Hard/Expert), length (Quick/Short/Normal/Long/Sudden Death), and generation selection
    - Real-time timer with visual feedback
    - Detailed recap with score and question review
- 🎯 **Client-side Only** - No backend, no authentication, no database
- 🐳 **Docker Support** - Run in development or production mode with Docker

## 🚀 Installation

### Prerequisites

- **Node.js** 20+ (or Docker)
- **npm** (comes with Node.js)

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

### Viewing Evolution Chains

1. **From Detail Page**: Scroll down to see the evolution chain
2. **Click to Navigate**: Click any Pokémon in the chain to view its details
3. **Visual Design**: See connected evolution paths with images and names

### Navigating Pokémon

1. **Previous/Next Buttons**: Use the ⬅️ and ➡️ buttons on detail pages
2. **Sequential Browse**: Navigate through Pokémon in ascending ID order
3. **No Reset**: Stays in detail view without returning to list

### Playing the Quiz

1. **Enter Quiz Mode**: Click the "Quiz" button on the Pokémon list page
2. **Configure Your Quiz**:
    - **Difficulty**: Choose Normal (20s/question, 3 types), Hard (20s/question, 8 types), or Expert (5-15s/question, 10 types + special rules)
    - **Length**: Select Quick (5), Short (10), Normal (20), Long (40), or Sudden Death (until wrong)
    - **Generations**: Use default (all) or select specific generations
3. **Start the Quiz**: Click "Start Quiz" to begin
4. **Answer Questions**:
    - Read/view the question
    - Select an answer from available options
    - Click "Confirm Answer" or wait for timer
    - Get immediate visual feedback (green ✓ for correct, red ✕ for incorrect)
5. **Quit Anytime**: Click "Quit Quiz" for a confirmation dialog
6. **View Results**:
    - See your score and percentage
    - Review all questions with detailed answer explanations
    - Try again with same settings or start a new quiz

### Navigation

- **Back Button**: Click the back button on detail pages to return to the list
- **Card Hover**: Cards scale up slightly when you hover over them
- **Keyboard**: Press Enter in the search field to validate your search

## 🏗️ Project Structure

````
Projet-Pokedex-Cours-SPEC-DRIVEN-DEVELOPMENT-IA-/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── PokemonCard.tsx      # Individual Pokémon card
│   │   ├── SearchBar.tsx        # Search input component
│   │   ├── EvolutionChain.tsx   # Evolution chain display
│   │   ├── QuestionRenderer.tsx # Quiz question renderer
│   │   ├── QuizTimer.tsx        # Quiz countdown timer
│   ├── pages/                   # Page components
│   │   ├── PokemonList.tsx      # Home page with list
│   │   ├── PokemonDetail.tsx    # Pokémon detail page
│   │   ├── QuizSetup.tsx        # Quiz configuration page
│   │   ├── QuizPlay.tsx         # Quiz question screen
│   │   ├── QuizRecap.tsx        # Quiz results page
│   ├── services/                # API integration
│   │   ├── pokeapi.ts           # PokeAPI fetch functions
│   │   └── quizService.ts       # Quiz logic and generation
│   ├── types/                   # TypeScript interfaces
│   │   ├── pokemon.ts           # Pokémon type definitions
│   │   └── quiz.ts              # Quiz type definitions
│   ├── utils/                   # Utility functions
│   │   ├── pokemon.ts           # Pokémon data transformation
│   │   └── quiz.ts              # Quiz utility functions
│   ├── styles/                  # CSS styling
│   │   └── main.css             # Game Boy theme (2700+ lines)
│   ├── App.tsx              # Root component with routing
│   └── main.tsx             # Application entry point
├── docs/                        # Specification documentation
│   ├── 01-introduction.md       # Core features
│   ├── 02-pokeapi.md            # PokeAPI endpoints
│   ├── 03-ui-gameboy.md         # UI/UX specifications
│   ├── 04-evolution-chain.md    # Evolution feature spec
│   ├── 05-detail-navigation.md  # Navigation feature spec
│   └── 06-quiz-feature.md       # Quiz feature spec
├── project-manager/             # Project management
│   ├── general-objectives.md    # Project goals and constraints
│   └── tasks.md                 # Task tracking and progress
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
  - `/generation` - List of all generations
  - `/generation/{id}` - Pokémon species in a specific generation
  - `/pokemon/{id}/encounters` - Evolution chain data
  - `/evolution-chain/{id}` - Detailed evolution information

### API Limitations & Constraints

1. **Rate Limiting**: PokeAPI may rate-limit requests. The app handles errors gracefully with exponential backoff retry logic.
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
6. **Quiz Feature**:
   - Session-level caching minimizes API calls
   - Pre-loading strategy fetches data in parallel (5 concurrent requests)
   - Failed question loads are automatically skipped with smart retry logic

## 🎨 Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **React Router DOM 7.11.0** - Client-side routing
- **Docker** - Containerization
- **Press Start 2P Font** - Retro pixel typography

## 📝 Development Approach

The project was developed using **Spec Driven Development** methodology in sequential phases:

1. **Phase 0**: Foundation (TypeScript, routing, API setup)
2. **Phase 1**: Pokédex Core (list, search, detail page)
3. **Phase 2**: Evolution Chain (evolution display and navigation)
4. **Phase 3**: Detail Navigation (previous/next buttons)
5. **Phase 2.0-2.7**: Quiz Feature (comprehensive implementation)
   - Phase 2.0: Core quiz setup and basic question types
   - Phase 2.1-2.5: Advanced question types and features
   - Phase 2.6: Integration & Performance (caching, optimization)
   - Phase 2.7: Styling & Polish (Game Boy theme, responsive design)
   - Phase 2.7.1-2.7.2: Recap page improvements
6. **Phase 2.8**: Testing & Validation
7. **Phase 2.9**: Documentation & Cleanup
8. **Phase 2.10**: Final Validation & Release

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
