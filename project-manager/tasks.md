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

## In Progress

## Planned

### Phase 0.2: Pokemon Detail Navigation Feature

- [ ] Add navigation buttons to Pokemon detail page
    - [ ] Add Previous button (← Previous)
    - [ ] Add Next button (Next →)
    - [ ] Position controls near back button or in header
- [ ] Implement navigation logic
    - [ ] Navigate to Pokemon (current ID - 1) for Previous
    - [ ] Navigate to Pokemon (current ID + 1) for Next
    - [ ] Update URL route to new Pokemon ID
    - [ ] Handle loading states during navigation
- [ ] Handle edge cases and errors
    - [ ] Disable Previous button on Pokemon #1
    - [ ] Handle non-existent Pokemon IDs gracefully (404 errors)
    - [ ] Determine and handle reasonable upper bounds for Pokemon IDs
    - [ ] Show appropriate error states
- [ ] Style navigation controls
    - [ ] Match Game Boy pixel-art aesthetic
    - [ ] Clear enabled/disabled button states
    - [ ] Responsive layout for small screens
- [ ] Manual test navigation functionality
    - [ ] Test navigation from various Pokemon (start, middle, high IDs)
    - [ ] Test edge cases (ID 1, non-existent IDs)
    - [ ] Validate smooth user experience
