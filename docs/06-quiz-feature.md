# Quiz Feature — Phase 2.0

## Overview

The Quiz feature is a standalone, client-side interactive experience that allows users to test their Pokémon knowledge through multiple-choice questions. No authentication, registration, or backend is required.

The quiz is accessible via a dedicated button on the main Pokédex page and operates independently from the main Pokédex list view.

---

## Quiz Configuration Page

### Entry Point

- A **"Quiz"** button is added to the Pokémon list page (main menu).
- Clicking the button navigates to `/quiz`.

### Configuration Parameters

Before starting a quiz, the user must configure three parameters:

#### 1. Difficulty Level

**Three options (default: Normal)**

- **Normal**: 20 seconds per question, 3 types of questions
- **Hard**: 20 seconds base time (5 seconds for some questions), 8 types of questions mixed
- **Expert**: 5 seconds for most questions, 15 seconds for description-based questions, all question types mixed + additional variants

#### 2. Quiz Length

**Five options (default: Normal)**

- **Quick**: 5 questions
- **Short**: 10 questions
- **Normal**: 20 questions (default)
- **Long**: 40 questions
- **Sudden Death**: Questions continue until the user answers incorrectly (1st wrong answer = quiz ends)

#### 3. Pokémon Generations

**Two selection modes:**

1. **Default** (auto-selected): All generations are included in the question pool
2. **Custom**: User selects one or more specific generations from a checklist

**Data Source:**

- Fetch from `GET /generation` endpoint to populate available generations
- For each selected generation, fetch from `GET /generation/{id}` to retrieve the `pokemon_species` list
- These species names form the question pool for that quiz session

---

## Question Types by Difficulty

### Difficulty Distribution Algorithm

Within each difficulty level, questions are randomly distributed using **equal probability within question groups**:

#### Normal Level

- 3 question types available
- Each type has **33.3% chance** of appearing
- Time per question: **20 seconds**

#### Hard Level

- Questions are split into two groups:
    1. **Group A (Normal questions)**: Includes all 3 types from Normal level → **40% of all questions**
        - Each type from Group A has 13.3% chance (1/3 of 40%)
    2. **Group B (Hard-only questions)**: 5 new types → **60% of all questions**
        - Each type from Group B has 12% chance (1/5 of 60%)
- Time per question: **20 seconds** (base)

#### Expert Level

- Questions are split into two groups:
    1. **Group A (Normal + Hard questions)**: All 8 types from Normal and Hard → **60% of all questions**
        - Inherited distribution: same as Hard level, but scaled to 60%
    2. **Group B (Expert-only questions)**: 2 new types → **40% of all questions**
        - Each Expert-only type has **20% chance** (1/2 of 40%)
- Time per question: **5 seconds** (most questions), **15 seconds** (description-based questions)
- **Special rule**: Every question displays a "The answer is not here" option
    - This option has a **10% base probability** of being the correct answer
    - When active, the displayed 4 Pokémon choices do not include the actual answer
    - When inactive, this option is a decoy/trap

---

## Question Types Specification

### Normal Level

#### Type 1: Image → Name

- **Display**: Pokémon sprite (front_default)
- **Task**: Select the correct name from 4 option buttons
- **Options**: 4 valid Pokémon names (1 correct, 3 random)
- **Validation**: Exact match required

#### Type 2: Name → Image

- **Display**: Pokémon name (English)
- **Task**: Select the correct sprite from 4 option buttons
- **Options**: 4 Pokémon sprites (front_default) (1 correct, 3 random)
- **Validation**: Exact image match required

#### Type 3: Pokémon → Type(s)

- **Display**: Pokémon image + name
- **Task**: Select the correct type(s)
- **Options**: 4 buttons showing type combinations
    - Single-type Pokémon: Display 4 single-type options (e.g., [Grass], [Fire], [Water], [Electric])
    - Dual-type Pokémon: Display 4 dual-type combination options (e.g., [Grass/Poison], [Fire/Flying], [Water/Ground], [Electric/Steel])
- **Validation**: User must select exactly one button matching the correct type(s)

---

### Hard Level

Inherits all 3 types from Normal level (with same rules), plus:

#### Type 4: Description → Pokémon

- **Display**: Pokédex entry description (English flavor text)
- **Task**: Identify the Pokémon from the description
- **Options**: 4 Pokémon (name or sprite, randomized per question)
- **Validation**: Exact species match required

#### Type 5: Number → Pokémon

- **Display**: Pokémon National Pokédex number (e.g., "#25")
- **Task**: Identify the Pokémon from its ID
- **Options**: 4 Pokémon (name or sprite, randomized per question)
- **Validation**: Exact species match required

#### Type 6: Pokémon → Number

- **Display**: Pokémon image + name
- **Task**: Select the correct National Pokédex number
- **Options**: 4 numbers (IDs)
- **Validation**: Exact ID match required

#### Type 7: Pre-evolution → Pokémon

- **Display**: Text format: "Who evolves into {Pokémon name + image}?"
- **Task**: Select the Pokémon that pre-evolves into the displayed Pokémon
- **Options**: 4 Pokémon (name or sprite, randomized)
    - Can include "This Pokémon has no pre-evolution" as one option (when applicable)
    - Optionally, pre-evolution candidates should share the same primary type when possible
- **Validation**: Exact species match required (or "no pre-evolution" if correct)

#### Type 8: Pokémon → Post-evolution

- **Display**: Pokémon image + name
- **Task**: Select the Pokémon's post-evolution
- **Options**: 4 Pokémon (name or sprite, randomized)
    - Can include "This Pokémon has no evolution" as one option (when applicable)
- **Validation**: Exact species match required (or "no evolution" if correct)

---

### Expert Level

Inherits all 8 types from Normal and Hard levels, plus:

#### Type 9: Height/Weight → Pokémon

- **Display**: Height and weight specifications
    - Format: "Height: 2.2 m | Weight: 210 kg"
- **Task**: Identify the Pokémon from its physical measurements
- **Options**: 4 Pokémon (name + sprite)
- **Validation**: Exact species match required
- **Time**: 5 seconds

#### Type 10: Base Statistics → Pokémon

- **Display**: Stat block showing all 6 base stats (HP, ATK, DEF, SPATK, SPDEF, SPD)
- **Task**: Identify the Pokémon from its stats
- **Options**: 4 Pokémon (name + sprite)
- **Validation**: Exact species match required
- **Time**: 10 seconds

#### Special Expert Rule: "The Answer Is Not Here"

- Every question in Expert mode displays a fifth button: **"The answer is not here"**
- When this is the correct answer (10% probability):
    - The 4 Pokémon options do **not** include the actual answer
    - The displayed options are valid Pokémon but are not the correct response
    - The user must recognize this and select "The answer is not here"
- When this is a decoy (90% probability):
    - The correct answer IS among the 4 Pokémon options
    - Selecting "The answer is not here" is incorrect

---

## Quiz Execution Flow

### Starting a Quiz

1. User navigates to `/quiz`
2. User configures all three parameters (difficulty, length, generations)
3. User clicks **"Start Quiz"** button
4. The application loads the question pool based on selected generations
5. Display loading indicator until first question is ready
6. Navigate to `/quiz/play`

### Question Display Screen

**UI Elements:**

- Current question indicator: "Question X/Y" (e.g., "Question 9/40") or "Sudden Death: X Correct" for Sudden Death mode
- Timer display showing remaining seconds (countdown)
- Question content (varies by type)
- Answer options (4–5 buttons depending on difficulty)
- **"Confirm Answer" button** (enabled once user selects an option)
- **"Quit Quiz" button** (with confirmation dialog)

**User Interaction:**

- Click an answer option to select it (visual feedback: highlight/border)
- Click **"Confirm Answer"** button to submit (or wait for timeout)
- If no answer is selected when timeout occurs, the question is automatically marked as **wrong** and the next question loads immediately
- If user selects an answer and timeout occurs before confirmation, the selected answer is automatically submitted

### Feedback on Answer

**Immediate feedback (after submission or timeout):**

- Display a **brief visual indicator** (color signal + optional icon):
    - **Green light/checkmark**: Correct answer
    - **Red light/X**: Wrong answer
- Show the question content and the result:
    - **If correct**: Display the question + the correct answer (user's response is correct, no comparison needed)
    - **If wrong**: Display the question + user's selected answer + the correct answer (side-by-side for comparison)
- **No text explanation or justification** is provided
- Delay: **0 seconds** — next question loads immediately

### Quitting Mid-Quiz

- User clicks **"Quit Quiz"** button
- Display confirmation dialog: **"Are you sure? Your progress will not be saved."**
- If user confirms:
    - Quiz ends immediately
    - Navigate to the recap page with all questions answered so far
    - Recap shows the user's score and review of completed questions
- If user cancels:
    - Return to the question screen

### Sudden Death Mode

- When a user answers incorrectly for the first time, the quiz ends immediately
- No recap with all questions; instead, display a summary:
    - **"Sudden Death: X Questions Answered Correctly"**
    - A mini-recap showing the questions answered (all correct) and the final wrong question
    - Buttons: **"Return to Quiz Setup"** or **"Return to Pokédex"**

---

## Quiz Results/Recap Page

### Standard Modes (Quick, Short, Normal, Long)

Displayed after the final question or when user quits mid-quiz.

**Header:**

- Score display: **"Score: X/Y (Z%)"** where:
    - X = correct answers
    - Y = total questions answered
    - Z = percentage (rounded to nearest integer)
- Difficulty level, quiz length, and selected generations (summary)

**Question Review Section:**

- For each question answered, display in order:
    - **If user answered correctly**:
        - Question content (image, text, or combination depending on question type)
        - Correct answer (highlighted with checkmark)
    - **If user answered incorrectly**:
        - Question content (image, text, or combination depending on question type)
        - User's selected answer (highlighted with red X)
        - Correct answer (highlighted with green checkmark)
- Questions are displayed in the order they were asked (1 through Y)
- Scrollable if many questions

**Important Note on Question Display:**

- Image-based questions (Image → Name, Name → Image, etc.): Display the question's visual content + answers as shown during the quiz
- Text-based questions (Description → Pokémon, Number → Pokémon): Display the text/number + answers shown
- For questions where the user answered correctly, only display the question and correct answer (no need to show alternative options)
- For questions where the user answered incorrectly, display the question and **both** the user's answer and the correct answer for comparison

**Action Buttons:**

- **"Try Again"** — Return to quiz configuration page with same parameters pre-filled
- **"Change Quiz"** — Return to quiz configuration page with default parameters
- **"Back to Pokédex"** — Return to the main Pokémon list page

### Sudden Death Mode

Displayed when user answers their first question incorrectly.

**Header:**

- Display: **"Sudden Death: X Questions Answered Correctly"**

**Question Review Section:**

- Show only the final question (the one answered incorrectly)
- Display the question content + user's selected answer (red X) + correct answer (green checkmark)
- No other questions are shown in the recap (since the user got all others correct, showing them would be redundant)

**Action Buttons:**

- **"Try Again Sudden Death"** — Return to quiz setup with Sudden Death pre-selected
- **"Change Quiz"** — Return to quiz configuration page with default parameters
- **"Back to Pokédex"** — Return to the main Pokémon list page

---

## Data Sources & Caching Strategy

### Primary API Endpoint: `/generation`

- Fetch once at app load to populate generation selector
- Cache in memory for the session
- See `docs/02-pokeapi.md` for endpoint specification

### Secondary API Endpoint: `/generation/{id}`

- Called when quiz is started (to build the question pool)
- Cache the species list in memory for the quiz session
- Do not re-fetch if user restarts the same quiz config
- See `docs/02-pokeapi.md` for endpoint specification

### Pokémon Details

- For each question, fetch Pokémon data via `/pokemon/{name}` or `/pokemon/{id}`
- Implement **session-level caching**: store fetched Pokémon data in memory during the quiz
- Reuse cached data when the same Pokémon appears in multiple questions

### Descriptions (Flavor Text)

- Fetch via `/pokemon-species/{id}` only for description-type questions (Type 4 in Hard level)
- Filter for English descriptions only (language.name === "en")
- Replace `\f` characters with spaces
- Cache per quiz session
- See `docs/02-pokeapi.md` for endpoint specification

### Sprite & Artwork Handling

- Use **front_default** sprites (fast load, low bandwidth)
- Pre-load and cache all Pokémon sprites used in questions during the quiz load phase when possible
- Consider lazy-loading strategies for mobile networks

### Question Pool Generation

- When quiz starts, retrieve all selected generation(s) via `/generation/{id}`
- Extract the `pokemon_species` list from each generation
- Build an in-memory pool of species names
- Validate that pool size >= requested question count; if not, display error
- Use this pool to randomly select Pokémon for questions throughout the quiz

### Optional Response Options (for correctness validation)

- When generating answer options (wrong Pokémon choices), ensure:
    - The correct answer is **never** included in the wrong options
    - Wrong options are randomly selected from the remaining pool
    - For Expert mode "The answer is not here" (10% of the time): ensure the correct answer is **not** in any of the 4 displayed options

### Network Errors During Quiz Setup

- If generation list fails to load: Display "Unable to load generation list. Please try again."
- If selected generation(s) fail to load: Display "Unable to load Pokémon pool. Please try again."
- If quiz setup fails: Display "Unable to start quiz. Please try again."
- If selected Pokémon count is less than requested question count: Display "Not enough Pokémon in selected generation(s). Please select more generations or reduce quiz length."

### Network Errors During Quiz Execution

- If a question fails to load (due to API error):
    - Skip the question (do not count it toward the total)
    - Load the next question automatically
    - At the end, adjust the total question count to reflect skipped questions
    - Example: If 1 question fails in a 20-question quiz, final score displays as "Score: 15/19"

### Timeout Behavior

- If the user's connection is lost during a question, the timer continues
- If the user cannot submit their answer within the timeout window, the question is marked wrong and proceeds immediately to the next question

### Session State Loss

- **Quiz state is stored in memory only.**
- If the page is closed, refreshed (F5), or navigated away during a quiz, the current quiz is lost
- The user will return to the quiz setup page and must restart from the beginning
- No persistent state is maintained between sessions

---

## UI/UX Notes

### Visual Consistency

- Maintain the **Game Boy–inspired frame** from the main Pokédex page
- Use **"Press Start 2P"** font for consistency
- Simple, non-distracting layout inside the screen area

### Accessibility

- Display question timers clearly and prominently
- Use color + icon indicators (green checkmark, red X) in addition to color alone
- Ensure all buttons are keyboard-navigable (Enter to confirm answer, Tab to navigate)

### Responsiveness

- The Game Boy frame and quiz layout scale on smaller screens
- Ensure answer options (buttons) are touch-friendly on mobile

### Loading States

- Show a **"Loading questions..."** message while building the question pool
- Display a **skeleton or animation** during the load phase (kept simple, no modern UI patterns)

---

## Files Impacted (Suggested Architecture)

- `src/pages/QuizSetup.tsx` — Configuration page (difficulty, length, generations)
- `src/pages/QuizPlay.tsx` — Question display and timer logic
- `src/pages/QuizRecap.tsx` — Results and question review
- `src/components/QuestionRenderer.tsx` — Renders different question types
- `src/components/QuizTimer.tsx` — Timer display and countdown logic
- `src/services/quizService.ts` — Business logic (question generation, answer validation, stats calculation)
- `src/services/pokeapi.ts` — Add endpoints for generation and generation details
- `src/types/quiz.ts` — New TypeScript interfaces (Quiz config, Question, QuizResult, etc.)
- `src/utils/quiz.ts` — Utility functions (shuffle options, filter English text, calculate stats, etc.)

---

## Question Generation Algorithm

### Random Question Type Selection

For each question, a random question type is selected based on difficulty-level distribution:

**Normal Level (3 types):**

- Each type: 33.3% probability
- Selection: `random() * 3 → round down to [0, 1, 2]`

**Hard Level (8 types total: 3 Normal + 5 Hard-only):**

- If `random() < 0.4`: Select a Normal type (each 13.3% probability)
- Else: Select a Hard-only type (each 12% probability)

**Expert Level (10 types total: 8 Normal/Hard + 2 Expert-only):**

- If `random() < 0.6`: Select a Normal or Hard type (inheriting Hard level distribution, scaled to 60%)
- Else: Select an Expert-only type (each 20% probability)
- Every question also includes "The answer is not here" option (10% chance to be correct)

### Random Pokémon Selection for Wrong Answers

When generating answer options for a question:

1. **Identify the correct answer Pokémon** (based on question type)
2. **Filter the question pool** to exclude the correct answer
3. **Randomly select 3 (or 4 for Expert "The answer is not here") Pokémon** from the filtered pool
4. **Validate that selected options are valid**:
    - No duplicates
    - No correct answer in the list
    - For "The answer is not here" (10% mode): Ensure none of the 4 options match the correct answer
5. **Shuffle all options** randomly (maintain the correct answer in a random position)

### Pre-loading and Caching Strategy

To minimize API calls and improve performance:

1. **Quiz Initialization Phase**:
    - Fetch all generations and cache the list
    - When quiz starts, fetch the selected generation(s) and build the question pool
    - Identify all unique Pokémon that may appear in questions for the selected generations
    - Pre-fetch critical data for the question pool:
        - `/pokemon/{name}` for all pool Pokémon (image, types, stats, height, weight)
        - `/pokemon-species/{id}` for descriptions (if needed for Hard/Expert modes)
    - Store in-memory cache with structure: `{ pokemonName: { id, image, types, stats, height, weight, description } }`

2. **During Quiz Execution**:
    - When a question is generated, reference cached data (no additional API calls)
    - If a specific Pokémon is needed but not in cache, fetch on-demand and update cache
    - Reuse cached Pokémon data if the same Pokémon appears in multiple questions

3. **Session Cleanup**:
    - When quiz ends or user quits, clear the question pool and cached Pokémon data
    - Keep generation list cached for potential "Try Again" scenarios

---

## Answer Validation Rules

### Exact Match Requirement

- **Name comparisons**: Case-insensitive match (e.g., "pikachu" == "Pikachu")
- **Image comparisons**: Byte-for-byte URL match (same sprite)
- **Type comparisons**: Exact type name match (order matters for dual-types: [Grass, Poison] ≠ [Poison, Grass])
- **Number comparisons**: Exact ID match (e.g., 25 for Pikachu)
- **Stats comparisons**: All 6 stats must match exactly (HP, ATK, DEF, SPATK, SPDEF, SPD)
- **Size comparisons**: Exact height and weight match (to 1 decimal place after division)

### Multi-Option Handling

- For "Pokémon → Type(s)" question:
    - Single-type Pokémon: One button clicked (matching the type)
    - Dual-type Pokémon: One button clicked (matching the type combination, e.g., [Grass/Poison])
    - No partial credit for selecting only one type of a dual-type Pokémon

---

## Summary of Constraints

- **No authentication** — User progress is not saved between sessions
- **Client-side only** — All logic runs in the browser
- **PokeAPI only** — No external data sources
- **Simple UI** — No modern glassmorphism, cards with shadows, or overly animated elements
- **Exact answers** — No partial credit; answer must match exactly
- **No pausing** — Quiz runs continuously until completion or quit
- **Fair probability distribution** — Question type selection uses weighted random within difficulty groups
- **Session-only state** — All quiz data is stored in memory; closing/refreshing the page loses progress
