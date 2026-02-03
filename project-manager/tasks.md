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

### Phase 2.1: Quiz Infrastructure & Types - ✅ COMPLETED

- [x] Create src/types/quiz.ts (QuizDifficulty, QuizLength, Generation, QuizConfig, QuestionType, Question, QuizSession, QuizAnswer, QuizResult)
    - [x] Define QuizDifficulty type (Normal, Hard, Expert)
    - [x] Define QuizLength type (Quick, Short, Normal, Long, Sudden Death)
    - [x] Create Generation interface with pokemon_species array
    - [x] Create QuizConfig interface with difficulty, length, generations, isCustomGenerations
    - [x] Create QuestionType union with all 10 question types
    - [x] Create Question interface with id, type, difficulty, timeLimit, correctAnswer, options, questionData
    - [x] Create QuestionOption interface with id, label, value, displayData
    - [x] Create QuizSession interface with config, questions, currentQuestionIndex, answers, timing, status
    - [x] Create QuizAnswer interface with questionId, questionType, selectedAnswerId, correctAnswerId, isCorrect, timeSpent, answeredAt
    - [x] Create QuizResult interface with config, totalQuestions, correctAnswers, score, answers, duration, isSuddenDeath
    - [x] Create API response types (GenerationListResponse, GenerationDetailsResponse)
    - [x] Create cache and error types
- [x] Extend src/services/pokeapi.ts (fetchGenerationList, fetchGenerationDetails, caching)
    - [x] Import generation types from quiz.ts
    - [x] Implement fetchGenerationList() - fetch list of all generations
    - [x] Implement fetchGenerationDetails(id) - fetch specific generation with pokemon_species
    - [x] Add error handling for 404 and network errors
    - [x] Proper TypeScript typing for generation data
- [x] Create src/utils/quiz.ts (weighted random, shuffle, filter duplicates, calculate score, filter English text)
    - [x] weightedRandom<T>(items, weights) - select items based on probability weights
    - [x] shuffle<T>(array) - Fisher-Yates shuffle implementation
    - [x] randomSelect<T>(array, count) - select N random items without duplicates
    - [x] getQuestionTypesForDifficulty(difficulty) - return available types per difficulty
    - [x] getQuestionTypeWeights(difficulty) - return probability distribution per spec
    - [x] selectRandomQuestionType(difficulty) - pick random type with weighted distribution
    - [x] getTimeLimitForQuestion(difficulty, type) - return time limit per difficulty and type
    - [x] filterEnglishDescription(entries) - extract English text from flavor_text_entries
    - [x] cleanDescription(text) - remove \f and normalize whitespace
    - [x] removeDuplicates<T>(array) - return array without duplicates
    - [x] filterOut<T>(array, exclude) - filter out specific value
    - [x] calculateScore(correct, total) - return percentage (0-100)
    - [x] calculateDuration(start, end) - return duration in seconds
    - [x] validateQuestionPoolSize(poolSize, questionCount) - check sufficiency
    - [x] validateQuestionData(type, data) - basic validation of question data
    - [x] shouldAnswerNotBeHere() - 10% probability for Expert mode
- [x] Create src/services/quizService.ts (buildQuestionPool, generateQuestion, validateAnswer, caching)
    - [x] QuizServiceCache class with generation, pokemon, species caching
    - [x] buildQuestionPool(generationIds) - fetch all species from selected generations
    - [x] generateQuestion(type, difficulty, pokemon, pool, index) - create complete question object
    - [x] Implement all 10 question type generators:
        - [x] generateImageToName - display sprite, select name
        - [x] generateNameToImage - display name, select sprite
        - [x] generatePokemonToType - display pokemon, select type(s)
        - [x] generateDescriptionToPokemon - display description, select pokemon
        - [x] generateNumberToPokemon - display number, select pokemon
        - [x] generatePokemonToNumber - display pokemon, select number
        - [x] generatePreEvolutionToPokemon - display evolved form, select pre-evolution
        - [x] generatePokemonToPostEvolution - display pokemon, select evolution
        - [x] generateHeightWeightToPokemon - display measurements, select pokemon
        - [x] generateStatsToPokemon - display stats, select pokemon
    - [x] validateAnswer(question, selectedId) - check if answer is correct
    - [x] createQuizSession(config) - initialize new session
    - [x] recordAnswer(session, answer) - add answer to session
    - [x] calculateQuizResult(session) - compute final score and result
    - [x] clearQuizCache() - cleanup session cache

### Phase 2.2: Quiz Setup Page - ✅ COMPLETED

- [x] Create src/pages/QuizSetup.tsx
    - [x] Setup component with all configuration state
    - [x] Fetch and display generation list from API
    - [x] Handle generation loading and errors
    - [x] Store config in sessionStorage for quiz session
- [x] Difficulty selector (Normal, Hard, Expert)
    - [x] Three radio-style buttons with descriptions
    - [x] Display difficulty info (time limit and question types)
    - [x] Default: Normal
- [x] Length selector (Quick, Short, Normal, Long, Sudden Death)
    - [x] Five option buttons with question counts
    - [x] Display appropriate count for each option
    - [x] Default: Normal (20 questions)
- [x] Generation selector (fetch, checkbox, validation)
    - [x] Load generation list from /generation endpoint
    - [x] Default mode: show all generations (auto-selected)
    - [x] Custom mode: checkboxes for individual selection
    - [x] Validation: at least one generation required
    - [x] Build question pool from selected generations
- [x] Start button (build pool, navigate to /quiz/play)
    - [x] Validate pool size vs question count
    - [x] Error handling for insufficient Pokemon
    - [x] Navigate to /quiz/play with config
    - [x] Store pool in sessionStorage
- [x] Update App.tsx with routes
    - [x] Add /quiz route (QuizSetup)
    - [x] Add /quiz/play route (QuizPlay)
    - [x] Add /quiz/recap route (QuizRecap)
- [x] Add Quiz button to PokemonList
    - [x] Button in list header
    - [x] Navigate to /quiz on click
- [x] Style to match Game Boy theme
    - [x] Quiz Setup container styling
    - [x] Difficulty buttons (selected/unselected states)
    - [x] Length buttons (selected/unselected states)
    - [x] Generation selector (default/custom modes)
    - [x] Start button styling
    - [x] Error/loading message styling
    - [x] Responsive design for mobile
    - [x] Back button styling

### Phase 2.3: Quiz Play Page - ✅ COMPLETED

- [x] Create src/pages/QuizPlay.tsx with question loop
    - [x] Load quiz config and pool from sessionStorage
    - [x] Initialize quiz session
    - [x] Display current question number / total
    - [x] Handle answer selection (highlight selected)
    - [x] Confirm answer button (disabled until selection)
    - [x] Auto-advance on answer (0 second delay)
    - [x] Handle timer timeout (auto-submit or mark wrong)
    - [x] Quit button with confirmation modal
    - [x] Error handling for question loading
    - [x] Sudden Death mode display
    - [x] Complete quiz when done and navigate to recap
- [x] Create src/components/QuizTimer.tsx (countdown, auto-submit)
    - [x] Display remaining seconds countdown
    - [x] Call onTimeUp callback when timer reaches 0
    - [x] Color-coded display (safe/warning/critical)
    - [x] Only countdown when isActive is true
    - [x] Reset when timeLimit prop changes
- [x] Create src/components/QuestionRenderer.tsx (dispatch to question types)
    - [x] Render all 10 question types with proper content
    - [x] Display answer options as buttons
    - [x] Visual feedback for selected answer (highlight)
    - [x] Feedback display after submission (green/red)
    - [x] Expert mode: "The answer is not here" button
- [x] Implement 10 question type renderers:
    - [x] Image → Name (display sprite, select name)
    - [x] Name → Image (display name, select sprite)
    - [x] Pokémon → Type(s) (display pokemon, select type)
    - [x] Description → Pokémon (display description, select pokemon)
    - [x] Number → Pokémon (display number, select pokemon)
    - [x] Pokémon → Number (display pokemon, select number)
    - [x] Pre-evolution → Pokémon (display evolved, select pre-evo)
    - [x] Pokémon → Post-evolution (display pokemon, select evolution)
    - [x] Height/Weight → Pokémon (display measurements, select pokemon)
    - [x] Base Stats → Pokémon (display stats, select pokemon)
- [x] Answer selection with confirmation button
    - [x] Click to select answer (visual feedback)
    - [x] Confirm Answer button enabled only with selection
    - [x] Disabled during feedback display
- [x] Expert mode: "The answer is not here" button
    - [x] Display as 5th option in Expert mode
    - [x] 10% chance of being correct
    - [x] 90% chance of being decoy
    - [x] Proper validation logic
- [x] Feedback display (green ✅ / red ❌)
    - [x] Green checkmark for correct
    - [x] Red X for incorrect
    - [x] Display selected vs correct answer
    - [x] No text explanation (visual only per spec)
- [x] Auto-advance (0 second delay)
    - [x] Next question loads immediately after feedback
    - [x] Clear state for new question
- [x] Quit button with confirmation
    - [x] Modal dialog asking for confirmation
    - [x] "Are you sure? Your progress will not be saved."
    - [x] Quit saves current progress to recap
    - [x] Cancel returns to question
- [x] Style to match Game Boy theme
    - [x] Quiz Play header with question indicator
    - [x] Timer styling with color codes
    - [x] Question content styling (image/text types)
    - [x] Answer buttons with image and text support
    - [x] Feedback indicator styling
    - [x] Modal overlay and dialog styling
    - [x] Responsive design for mobile
    - [x] Pixel-art friendly image rendering

### Phase 2.4: Quiz Recap Page - ✅ COMPLETED

- [x] Create src/pages/QuizRecap.tsx
    - [x] RecapQuestionDisplay sub-component for rendering all 10 question types
    - [x] Load quizResult and quizQuestions from sessionStorage
    - [x] Error handling for missing results
    - [x] Functional recap component with full question display
- [x] Standard mode: "Score: X/Y (Z%)" + all questions in order
    - [x] Display score in "Score: X/Y (Z%)" format
    - [x] Show all questions in answer order
    - [x] Display each question with answer options and user's answer
    - [x] Show correct answer with visual feedback
- [x] Sudden Death mode: "X Questions Correct" + only final question
    - [x] Display question count instead of percentage score
    - [x] Show only the final (incorrect) question
    - [x] Display attempt number for the failed question
    - [x] Show previous attempts summary
- [x] Action buttons (Try Again, Change Quiz, Back to Pokédex)
    - [x] Three button set with appropriate labels per mode
    - [x] Try Again: Clear session and restart with same config
    - [x] Change Quiz: Return to QuizSetup to change settings
    - [x] Back to Pokédex: Return to main Pokemon list
    - [x] Buttons navigate correctly to appropriate routes
- [x] Style to match Game Boy theme
    - [x] Quiz recap container and header styling
    - [x] Score display styling with color emphasis
    - [x] Question card styling with numbered headers
    - [x] Answer option styling with correct/incorrect states
    - [x] Visual feedback icons (✓/✕) for answers
    - [x] Button styling consistent with Game Boy theme
    - [x] Responsive design for mobile
    - [x] Pixel-art friendly image rendering
- [x] Enhanced QuizPlay.tsx
    - [x] Track questions in questionsAsked state array
    - [x] Store questions in sessionStorage during gameplay
    - [x] Update handleConfirmQuit to persist questions before navigation
    - [x] Enable recap page to display full question context

### Phase 2.5: Routing & Navigation - ✅ COMPLETED

- [x] Update App.tsx with /quiz, /quiz/play, /quiz/recap routes
    - [x] Imported QuizSetup, QuizPlay, QuizRecap components
    - [x] Added route: /quiz → QuizSetup
    - [x] Added route: /quiz/play → QuizPlay
    - [x] Added route: /quiz/recap → QuizRecap
    - [x] All routes use main gameboy-shell and gameboy-screen containers
    - [x] Fixed import paths in QuizSetup.tsx (removed duplicate buildQuestionPool import)
- [x] Add "Quiz" button to PokemonList page
    - [x] Quiz button added to pokemon-list-header
    - [x] Button navigates to /quiz route using useNavigate hook
    - [x] Button styled with quiz-button class
    - [x] Button appears in header next to Pokédex title
- [x] Test navigation flows
    - [x] Verified App.tsx imports and routes configuration
    - [x] Verified PokemonList.tsx has Quiz button with proper navigation
    - [x] Verified all quiz page files exist and have proper exports
    - [x] Verified QuizSetup imports are correct (buildQuestionPool from quizService)
    - [x] All components properly type-safe with TypeScript
    - [x] Navigation flow: PokemonList (Quiz button) → QuizSetup → QuizPlay → QuizRecap → PokemonList

#### Phase 2.5.1: Critical Bug Fixes - ✅ COMPLETED

- [x] Fix QuizTimer reset - Remove remainingSeconds from dependency array
    - [x] Timer now properly resets when timeLimit prop changes
    - [x] Timer displays correct countdown on new question
    - [x] Prevents timer from getting stuck at 0
- [x] Fix Sudden Death mode termination
    - [x] Quiz now terminates immediately after first wrong answer
    - [x] Both handleConfirmAnswer and handleTimeUp check for Sudden Death mode
    - [x] Properly completes quiz instead of continuing indefinitely
- [x] Fix Pokemon-to-Type question generation
    - [x] Now generates 4 answer options (correct + 3 wrong type combinations)
    - [x] Fetches 3 random Pokemon to extract their type combinations
    - [x] Shuffles options for proper randomization
- [x] Fix Pokemon-to-Number question generation
    - [x] Now generates 4 answer options (correct + 3 wrong numbers)
    - [x] Fetches 3 random Pokemon to extract their IDs
    - [x] Formats numbers as #XXX for consistent display
- [x] Fix image/label display in question options
    - [x] Name-to-image questions: Show image only, no label
    - [x] Image-to-name questions: Show label only, no image
    - [x] Number-to-pokemon questions: Show both label and image
    - [x] All other questions: Show label, hide image unless specifically configured
- [x] Fix ID number styling in questions
    - [x] Larger font size (2.5rem) for better visibility
    - [x] Full background color (#e63946) covering entire number
    - [x] Proper padding and border for emphasis
    - [x] Responsive sizing for mobile
- [x] Improve Quiz Recap page styling
    - [x] Clearer section headers with larger fonts
    - [x] Better contrast between correct/incorrect answers
    - [x] Larger answer images (50px) for better visibility
    - [x] Proper spacing and padding throughout
    - [x] Improved recap buttons with better sizing
    - [x] Mobile responsive design with stacked layouts
- [x] Add CSS class for small answer images
    - [x] Created .answer-image-small class for number-to-pokemon display
    - [x] Allows dual display of image + label in answer options

### Phase 2.6: Integration & Performance - ✅ COMPLETED

- [x] Session-level caching (pre-load question pool Pokemon)
    - [x] Added preloadPokemonPool function for batch pre-fetching
    - [x] Cache tracks preloaded Pokemon with Set
    - [x] Preloads configurable batch size (default: quiz length + 10)
- [x] API call optimization (batch fetch, reuse cache)
    - [x] Parallel fetching with Promise.allSettled (5 concurrent)
    - [x] Progress callback for loading UI updates
    - [x] Cache statistics function for debugging
- [x] Error handling (network errors, insufficient Pokemon, skip failed questions)
    - [x] Exponential backoff retry logic (max 3 retries)
    - [x] Automatic question skip after max retries
    - [x] Detailed loading messages during retries
- [x] Performance testing (40-question quiz, multiple generations)
    - [x] Preloading ensures faster question generation
    - [x] Cache reuse reduces API calls

### Phase 2.7: Styling & Polish - ✅ COMPLETED

- [x] Game Boy theme consistency (Press Start 2P font, red/white colors)
    - [x] Consistent styling across all quiz components
    - [x] Loading spinner with Game Boy red accent
- [x] Answer button styling (touch-friendly, visual feedback)
    - [x] Touch-friendly minimum sizes (44px+)
    - [x] touch-action: manipulation for better mobile response
    - [x] Box shadow feedback on hover/select
    - [x] Active state with scale transform
- [x] Responsive design for mobile
    - [x] Breakpoints at 768px and 480px
    - [x] Grid adjusts from 2-column to 1-column on small screens
    - [x] Optimized button sizes and spacing for touch
    - [x] Horizontal layout for answer buttons on extra small screens
- [x] Color + icon feedback (not color-only)
    - [x] Added ✓ icon for correct answers (green)
    - [x] Added ✕ icon for incorrect answers (red)
    - [x] Added ● icon for selected state (blue)
    - [x] Added ⚠ icon for expert "answer not here" option (orange)
    - [x] Icons positioned in top-right corner of buttons

### Phase 2.7.1: Quiz Recap Page Redesign - ✅ COMPLETED

- [x] Redesigned recap question display with distinct block cards
    - [x] Green bordered cards for correct answers
    - [x] Red bordered cards for incorrect answers
    - [x] Clear visual separation between questions
- [x] Improved question display structure
    - [x] Header with question number and status badge (✓ Correct / ✕ Incorrect)
    - [x] Question text with Pokemon image when applicable
    - [x] Extra info (description, number, stats, measurements) displayed inline
- [x] Answer display with Pokemon cards style
    - [x] PokemonAnswerCard component with image + name
    - [x] Correct answers: only user's answer shown (green card)
    - [x] Incorrect answers: user's answer + correct answer (red/green cards)
    - [x] Cards styled like quiz option buttons for consistency
- [x] Responsive design for recap
    - [x] Stack layout on mobile
    - [x] Adjusted image and text sizes for smaller screens

### Phase 2.7.2: Quiz Recap Button Reorganization - ✅ COMPLETED

- [x] Repositioned action buttons on recap page
    - [x] Moved buttons to appear BEFORE the question details list
    - [x] Buttons now positioned between score/config section and questions
- [x] Updated button styling
    - [x] "Change Quiz" and "Back to Pokédex" buttons now have blue text color (#0066cc)
    - [x] Blue text darkens to #0052a3 on hover
    - [x] "Try Again" button remains red (primary color)

### Phase 2.8: Testing & Validation

- [x] Manual testing: Setup (difficulty, length, generations, validation)
- [x] Manual testing: Play (all 10 question types, timer, validation, quit)
- [x] Manual testing: Recap (scores, question display, buttons)
- [x] Edge cases (1 generation, all generations, Sudden Death, high IDs, network errors)
- [x] Cross-browser testing (Chrome, Firefox, Safari, Edge)

## In Progress

## Planned

### Phase 2.9: Documentation & Cleanup

- [ ] Add JSDoc comments to functions
- [ ] Update README.md with Quiz feature
- [ ] Remove debug code

### Phase 2.10: Final Validation & Release

- [ ] All tests passing
- [ ] No console errors
- [ ] Docker build works
- [ ] Quiz feature complete per docs/06-quiz-feature.md
