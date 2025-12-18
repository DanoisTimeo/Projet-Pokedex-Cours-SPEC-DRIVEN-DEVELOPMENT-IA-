# Project Tasks

## Done

-   [x] Write AGENT.md - Agent onboarding guide
-   [x] Write docs/01-introduction.md - Core features and behavior specifications
-   [x] Write docs/02-pokeapi.md - PokeAPI endpoint documentation and data paths
-   [x] Write docs/03-ui-gameboy.md - Game Boy UI styling specifications
-   [x] Write project-manager/general-objectives.md - Project principles and constraints

### Phase 1: Project Foundation - ✅ COMPLETED

-   [x] Verify project structure and dependencies
-   [x] Installed React, React DOM, and React Router dependencies
-   [x] Installed TypeScript type definitions
-   [x] Configure TypeScript interfaces for Pokemon data
    -   [x] Create Pokemon interface (name, id, sprites, types, stats, height, weight)
    -   [x] Create PokemonSpecies interface (description, flavor_text_entries)
    -   [x] Create PokemonListItem interface (name, url)
    -   [x] Created additional supporting interfaces (PokemonType, PokemonStat, PokemonSprites, FlavorTextEntry, PokemonListResponse)
-   [x] Setup routing (React Router or similar)
    -   [x] Home route: Pokemon list
    -   [x] Detail route: Pokemon detail page
    -   [x] Created App.tsx with BrowserRouter and Routes
    -   [x] Created PokemonList.tsx component (placeholder)
    -   [x] Created PokemonDetail.tsx component (placeholder)
    -   [x] Created main.tsx entry point
    -   [x] Created index.html with root div

## In Progress

## Planned

### Phase 2: API Integration

-   [ ] Create PokeAPI service module
    -   [ ] Implement fetchPokemonList(offset, limit) function
    -   [ ] Implement fetchPokemonDetails(idOrName) function
    -   [ ] Implement fetchPokemonSpecies(idOrName) function
    -   [ ] Add proper error handling for API calls
-   [ ] Create utility functions
    -   [ ] Height conversion (decimeters to meters)
    -   [ ] Weight conversion (hectograms to kg)
    -   [ ] Description text cleaning (replace \f with spaces)
    -   [ ] Filter English descriptions from flavor_text_entries

### Phase 3: Pokemon List Implementation

-   [ ] Create PokemonList component
    -   [ ] Display loading state ("Loading...")
    -   [ ] Fetch and display first 20 Pokemon
    -   [ ] Render Pokemon cards (sprite, name, ID)
    -   [ ] Sort by ascending ID order
-   [ ] Implement pagination
    -   [ ] Add "Load More" or pagination controls
    -   [ ] Load 20 Pokemon per page
    -   [ ] Continue until no more Pokemon available
-   [ ] Add card interactions
    -   [ ] Hover effect (scale-up animation)
    -   [ ] Click navigation to detail page

### Phase 4: Search Functionality

-   [ ] Create SearchBar component
    -   [ ] Input field for name or ID
    -   [ ] Search button
    -   [ ] Enter key validation
-   [ ] Implement search logic
    -   [ ] Search by Pokemon name (English)
    -   [ ] Search by Pokemon ID (number)
    -   [ ] Display "No Pokémon found" message on no results
    -   [ ] Clear search and return to list

### Phase 5: Pokemon Detail Page

-   [ ] Create PokemonDetail component
    -   [ ] Display loading state in detail area
    -   [ ] Fetch Pokemon data (from /pokemon endpoint)
    -   [ ] Fetch species data (from /pokemon-species endpoint)
-   [ ] Display Pokemon information
    -   [ ] High quality sprite (official-artwork)
    -   [ ] Name and ID
    -   [ ] Types (primary and secondary)
    -   [ ] Height and weight (with unit conversion)
    -   [ ] Description (English, cleaned text)
    -   [ ] Base stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed)
-   [ ] Add navigation
    -   [ ] Back button to return to list

### Phase 6: Game Boy UI Styling

-   [ ] Create Game Boy frame container
    -   [ ] Red shell design
    -   [ ] Screen area with white background
    -   [ ] Maintain aspect ratio
-   [ ] Apply retro styling
    -   [ ] Import "Press Start 2P" font
    -   [ ] Apply pixel-style font to UI
    -   [ ] Simple, flat design (no shadows, no modern effects)
-   [ ] Style Pokemon cards
    -   [ ] Grid layout
    -   [ ] Hover animations (scale-up)
    -   [ ] Pointer cursor on hover
-   [ ] Style detail page
    -   [ ] Clean information layout
    -   [ ] Stats display format
    -   [ ] Type badges

### Phase 7: Error Handling & Loading States

-   [ ] Implement error boundary component
-   [ ] Add error display zone
    -   [ ] Show API error messages
    -   [ ] User-friendly error descriptions
    -   [ ] Non-blocking error display
-   [ ] Refine loading indicators
    -   [ ] Loading only in active zones
    -   [ ] Simple "Loading..." text

### Phase 8: Keyboard Navigation

-   [ ] Implement arrow key scrolling
-   [ ] Implement Enter key for search validation
-   [ ] Add keyboard shortcuts documentation (optional)

### Phase 9: Responsive Design

-   [ ] Make Game Boy frame responsive
-   [ ] Scale frame while preserving aspect ratio
-   [ ] Test on different screen sizes
-   [ ] Ensure readability on mobile

### Phase 10: Polish & Testing

-   [ ] Test all API endpoints
-   [ ] Verify data transformations (height, weight, description)
-   [ ] Test pagination edge cases
-   [ ] Test search with various inputs
-   [ ] Verify keyboard navigation
-   [ ] Cross-browser testing
-   [ ] Performance optimization (if needed)

### Phase 11: Documentation

-   [ ] Update README.md with project description
-   [ ] Add installation instructions
-   [ ] Add usage guide
-   [ ] Document API limitations
