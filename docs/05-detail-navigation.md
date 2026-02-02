# Pokemon Detail Navigation — Pokédex feature

## Purpose

Document the feature that allows users to navigate between Pokémon from the detail page without returning to the list. Users can go to the next Pokémon (ID + 1) or previous Pokémon (ID - 1) directly from the detail view.

## Behavior (summary)

- Add navigation controls on the Pokemon detail page: "Previous" and "Next" buttons
- Previous button navigates to Pokemon with (current ID - 1)
- Next button navigates to Pokemon with (current ID + 1)
- Handle edge cases: disable Previous on Pokemon #1, handle non-existent Pokemon IDs gracefully
- Navigation should preserve the same detail view experience (smooth transitions)

## UI placement

- Navigation controls positioned near the back button or as part of the detail header
- Simple button layout: "← Previous" and "Next →"
- Buttons should be disabled/hidden when navigation is not possible
- Maintain Game Boy aesthetic with pixel-style controls

## Navigation logic

- Use Pokemon ID for sequential navigation (not list position)
- Navigate to `/pokemon/{id-1}` and `/pokemon/{id+1}` routes
- Handle API errors gracefully: if Pokemon doesn't exist, display error or skip to next valid ID
- No automatic navigation - only on explicit user button clicks

## Edge cases to handle

- Pokemon #1: Previous button should be disabled
- Non-existent Pokemon IDs: handle 404 gracefully, possibly skip to next available Pokemon
- Loading states: show loading indicator during navigation
- Invalid/high ID numbers: determine reasonable upper bound or handle dynamically

## User experience

- Instant navigation without losing context
- Clear visual feedback on button states (enabled/disabled)
- Preserve detail page layout and functionality
- Smooth transitions between Pokemon

## Files impacted (suggested)

- `src/pages/PokemonDetail.tsx`: add navigation buttons and logic
- `src/styles/main.css`: style navigation controls to match Game Boy theme
- Consider utility functions for ID validation/bounds checking
