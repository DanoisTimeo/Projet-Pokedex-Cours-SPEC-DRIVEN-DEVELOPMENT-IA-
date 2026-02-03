# Project Tasks

## Done

- [x] Write AGENT.md - Agent onboarding guide
- [x] Write docs/01-introduction.md - Core features and behavior specifications
- [x] Write docs/02-pokeapi.md - PokeAPI endpoint documentation and data paths
- [x] Write docs/03-ui-gameboy.md - Game Boy UI styling specifications
- [x] Write project-manager/general-objectives.md - Project principles and constraints

### Phase 0.1: Project Foundation - ✅ COMPLETED

- [x] Verify project structure and dependencies
- [x] Installed React, React DOM, and React Router dependencies
- [x] Installed TypeScript type definitions
- [x] Configure TypeScript interfaces for Pokemon data
    - [x] Create Pokemon interface (name, id, sprites, types, stats, height, weight)
    - [x] Create PokemonSpecies interface (description, flavor_text_entries)
    - [x] Create PokemonListItem interface (name, url)
    - [x] Created additional supporting interfaces (PokemonType, PokemonStat, PokemonSprites, FlavorTextEntry, PokemonListResponse)
- [x] Setup routing (React Router or similar)
    - [x] Home route: Pokemon list
    - [x] Detail route: Pokemon detail page
    - [x] Created App.tsx with BrowserRouter and Routes
    - [x] Created PokemonList.tsx component (placeholder)
    - [x] Created PokemonDetail.tsx component (placeholder)
    - [x] Created main.tsx entry point
    - [x] Created index.html with root div

### Phase 0.2: API Integration - ✅ COMPLETED & TESTED

- [x] Create PokeAPI service module
    - [x] Implement fetchPokemonList(offset, limit) function
    - [x] Implement fetchPokemonDetails(idOrName) function
    - [x] Implement fetchPokemonSpecies(idOrName) function
    - [x] Add proper error handling for API calls
    - [x] Created src/services/pokeapi.ts with all three fetch functions
    - [x] Added 404 handling for "No Pokémon found" message
    - [x] Added comprehensive error messages for debugging
- [x] Create utility functions
    - [x] Height conversion (decimeters to meters)
    - [x] Weight conversion (hectograms to kg)
    - [x] Description text cleaning (replace \f with spaces)
    - [x] Filter English descriptions from flavor_text_entries
    - [x] Created src/utils/pokemon.ts with all transformation utilities
- [x] Testing completed successfully
    - [x] All API functions tested and working
    - [x] Error handling verified (404 responses)
    - [x] All utility functions validated
    - [x] Test files removed after validation

### Phase 0.3: Pokemon List Implementation - ✅ COMPLETED

- [x] Create PokemonList component
    - [x] Display loading state ("Loading...")
    - [x] Fetch and display first 20 Pokemon
    - [x] Render Pokemon cards (sprite, name, ID)
    - [x] Sort by ascending ID order
    - [x] Added error handling and error display
    - [x] Created src/pages/PokemonList.tsx with full fetching logic
- [x] Implement pagination
    - [x] Add "Load More" button controls
    - [x] Load 20 Pokemon per page
    - [x] Continue until no more Pokemon available
    - [x] Disable button while loading more
- [x] Add card interactions
    - [x] Hover effect (scale-up animation)
    - [x] Click navigation to detail page
    - [x] Pointer cursor on hover
    - [x] Created src/components/PokemonCard.tsx component
- [x] Basic styling
    - [x] Created src/styles/main.css
    - [x] Grid layout for cards
    - [x] Responsive card sizing
    - [x] Hover animations and transitions

### Phase 0.4: Search Functionality - ✅ COMPLETED

- [x] Create SearchBar component
    - [x] Input field for name or ID
    - [x] Search button
    - [x] Enter key validation
    - [x] Clear button to return to list
    - [x] Created src/components/SearchBar.tsx
- [x] Implement search logic
    - [x] Search by Pokemon name (English)
    - [x] Search by Pokemon ID (number)
    - [x] Display "No Pokémon found" message on no results
    - [x] Clear search and return to list
    - [x] Integrated into PokemonList component
    - [x] Search mode displays single result
    - [x] Error handling for invalid searches
- [x] Styling
    - [x] Search bar layout and styling
    - [x] "No Pokémon found" message styling
    - [x] Responsive search input

### Phase 0.5: Pokemon Detail Page - ✅ COMPLETED

- [x] Create PokemonDetail component
    - [x] Display loading state in detail area
    - [x] Fetch Pokemon data (from /pokemon endpoint)
    - [x] Fetch species data (from /pokemon-species endpoint)
    - [x] Parallel API calls for better performance
    - [x] Updated src/pages/PokemonDetail.tsx with full implementation
- [x] Display Pokemon information
    - [x] High quality sprite (official-artwork)
    - [x] Name and ID
    - [x] Types (primary and secondary)
    - [x] Height and weight (with unit conversion)
    - [x] Description (English, cleaned text)
    - [x] Base stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
    - [x] Visual stat bars for each statistic
- [x] Add navigation
    - [x] Back button to return to list
    - [x] Error handling with back button
- [x] Styling
    - [x] Detail card layout
    - [x] Type badges styling
    - [x] Stat bars with visual representation
    - [x] Clean information display
    - [x] Responsive design

### Phase 0.6: Game Boy UI Styling - ✅ COMPLETED

- [x] Create Game Boy frame container
    - [x] Red shell design
    - [x] Screen area with white background
    - [x] Maintain aspect ratio
- [x] Apply retro styling
    - [x] Import "Press Start 2P" font
    - [x] Apply pixel-style font to UI
    - [x] Simple, flat design (no shadows, no modern effects)
- [x] Style Pokemon cards
    - [x] Grid layout
    - [x] Hover animations (scale-up)
    - [x] Pointer cursor on hover
- [x] Style detail page
    - [x] Clean information layout
    - [x] Stats display format
    - [x] Type badges

### Phase 0.7: Ajouter Docker pour le projet - ✅ COMPLETED

- [x] Ajouter un Dockerfile multi-stage (development & production)
- [x] Ajouter un docker-compose.yml pour le développement
- [x] Ajouter un .dockerignore
- [x] Configurer le hot reload
- [x] Vérifier le lancement du projet via Docker

### Phase 0.8: Documentation - ✅ COMPLETED

- [x] Update README.md with project description
- [x] Add installation instructions (npm and Docker)
- [x] Add usage guide (browsing, searching, navigation)
- [x] Document API limitations and constraints
- [x] Document tech stack and project structure
- [x] Add Docker commands reference

### Recent documentation updates

- [x] Write docs/04-evolution-chain.md - feature spec for evolution chain UI (name + image + link)
- [x] Update docs/02-pokeapi.md - add Evolution Chain section and notes about evolution_details and ID differences

### Phase 1.1: Evolution Chain Feature - ✅ COMPLETED

- [x] Add types for evolution chain data structures
- [x] Create EvolutionChain interface for API response
- [x] Create ChainNode interface for recursive structure
- [x] Create EvolutionDisplayData interface for UI display
- [x] Extend PokeAPI service for evolution-chain endpoint
- [x] Add fetchEvolutionChain(speciesIdOrName) function
- [x] Add helper to collect species names from chain recursively
- [x] Update PokemonSpecies interface to include evolution_chain.url
- [x] Create EvolutionChain component
- [x] Display horizontal list of evolution items
- [x] Handle loading, error, and empty states ("No evolutions")
- [x] Make each evolution item clickable (navigate to detail page)
- [x] Use official artwork thumbnails for each evolution
- [x] Integrate EvolutionChain into PokemonDetail page
- [x] Add evolution chain section at bottom of detail page
- [x] Fetch evolution data after main Pokemon data loads
- [x] Handle errors gracefully without breaking main detail view
- [x] Add styling for evolution chain
- [x] Horizontal scrollable layout for small screens
- [x] Card-style layout for each evolution item
- [x] Consistent with existing Game Boy pixel-art styling
- [x] Fix logic for Pokemon with single-member evolution chains
- [x] Filter out evolution chains that contain only the current Pokemon
- [x] Display "No evolutions" when evolution chain has only one member
- [x] Manual testing and validation completed
- [x] Feature working correctly for Pokemon with and without evolutions
- [x] Navigation between evolution stages functional
- [x] Proper handling of edge cases (single Pokemon chains)

### Phase 1.2: Pokemon Detail Navigation Feature

- [x] Add navigation buttons to Pokemon detail page
    - [x] Add Previous button (← Previous)
    - [x] Add Next button (Next →)
    - [x] Position controls near back button or in header
- [x] Implement navigation logic
    - [x] Navigate to Pokemon (current ID - 1) for Previous
    - [x] Navigate to Pokemon (current ID + 1) for Next
    - [x] Update URL route to new Pokemon ID
    - [x] Handle loading states during navigation
- [x] Handle edge cases and errors
    - [x] Disable Previous button on Pokemon #1
    - [x] Handle non-existent Pokemon IDs gracefully (404 errors)
    - [x] Determine and handle reasonable upper bounds for Pokemon IDs
    - [x] Show appropriate error states
- [x] Style navigation controls
    - [x] Match Game Boy pixel-art aesthetic
    - [x] Clear enabled/disabled button states
    - [x] Responsive layout for small screens
- [x] Manual test navigation functionality
    - [x] Test navigation from various Pokemon (start, middle, high IDs)
    - [x] Test edge cases (ID 1, non-existent IDs)
    - [x] Validate smooth user experience

### Documentation updates (Phase 2.0)

- [x] Write docs/06-quiz-feature.md - Complete Quiz feature specification
- [x] Update docs/02-pokeapi.md - Add generation endpoints and examples
- [x] Update AGENT.md - Add reference to 06-quiz-feature.md

## In Progress

### Phase 2.1: Quiz Infrastructure & Types

- [ ] Create src/types/quiz.ts (QuizDifficulty, QuizLength, Generation, QuizConfig, QuestionType, Question, QuizSession, QuizAnswer, QuizResult)
- [ ] Extend src/services/pokeapi.ts (fetchGenerationList, fetchGenerationDetails, caching)
- [ ] Create src/utils/quiz.ts (weighted random, shuffle, filter duplicates, calculate score, filter English text)
- [ ] Create src/services/quizService.ts (buildQuestionPool, generateQuestion, validateAnswer, caching)

## Planned

### Phase 2.2: Quiz Setup Page

- [ ] Create src/pages/QuizSetup.tsx
- [ ] Difficulty selector (Normal, Hard, Expert)
- [ ] Length selector (Quick, Short, Normal, Long, Sudden Death)
- [ ] Generation selector (fetch, checkbox, validation)
- [ ] Start button (build pool, navigate to /quiz/play)
- [ ] Style to match Game Boy theme

### Phase 2.3: Quiz Play Page

- [ ] Create src/pages/QuizPlay.tsx with question loop
- [ ] Create src/components/QuizTimer.tsx (countdown, auto-submit)
- [ ] Create src/components/QuestionRenderer.tsx (dispatch to question types)
- [ ] Implement 10 question type renderers (ImageToName, NameToImage, PokemonToType, DescriptionToPokemon, NumberToPokemon, PokemonToNumber, PreEvolutionToPokemon, PokemonToPostEvolution, HeightWeightToPokemon, StatsToPokemon)
- [ ] Answer selection with confirmation button
- [ ] Expert mode: "The answer is not here" button (10% correct, 90% decoy)
- [ ] Feedback display (green ✅ / red ❌, correct: Q+A / incorrect: Q+user+correct)
- [ ] Auto-advance (0 second delay)
- [ ] Quit button with confirmation
- [ ] Style to match Game Boy theme

### Phase 2.4: Quiz Recap Page

- [ ] Create src/pages/QuizRecap.tsx
- [ ] Standard mode: "Score: X/Y (Z%)" + all questions in order
- [ ] Sudden Death mode: "X Questions Correct" + only final question
- [ ] Action buttons (Try Again, Change Quiz, Back to Pokédex)
- [ ] Style to match Game Boy theme

### Phase 2.5: Routing & Navigation

- [ ] Update App.tsx with /quiz, /quiz/play, /quiz/recap routes
- [ ] Add "Quiz" button to PokemonList page
- [ ] Test navigation flows

### Phase 2.6: Integration & Performance

- [ ] Session-level caching (pre-load question pool Pokemon)
- [ ] API call optimization (batch fetch, reuse cache)
- [ ] Error handling (network errors, insufficient Pokemon, skip failed questions)
- [ ] Performance testing (40-question quiz, multiple generations)

### Phase 2.7: Styling & Polish

- [ ] Game Boy theme consistency (Press Start 2P font, red/white colors)
- [ ] Answer button styling (touch-friendly, visual feedback)
- [ ] Responsive design for mobile
- [ ] Color + icon feedback (not color-only)

### Phase 2.8: Testing & Validation

- [ ] Manual testing: Setup (difficulty, length, generations, validation)
- [ ] Manual testing: Play (all 10 question types, timer, validation, quit)
- [ ] Manual testing: Recap (scores, question display, buttons)
- [ ] Edge cases (1 generation, all generations, Sudden Death, high IDs, network errors)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Phase 2.9: Documentation & Cleanup

- [ ] Add JSDoc comments to functions
- [ ] Update README.md with Quiz feature
- [ ] Remove debug code

### Phase 2.10: Final Validation & Release

- [ ] All tests passing
- [ ] No console errors
- [ ] Docker build works
- [ ] Quiz feature complete per docs/06-quiz-feature.md
