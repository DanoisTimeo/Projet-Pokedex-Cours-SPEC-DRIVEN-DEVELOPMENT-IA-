# Evolution Chain — Pokédex feature

## Purpose

Document the feature that shows a Pokémon's evolution chain on its detail page. The UI displays only each species' name and official artwork thumbnail; each item is clickable and navigates to that Pokémon's detail page.

## Behavior (summary)

- Show an "Evolution" section at the bottom of the Pokémon detail page when an evolution chain exists.
- If there is no evolution, show the text: "No evolutions".
- For each evolution step display: name, official artwork thumbnail, and make the item clickable (link to detail page).
- Only display the default form for each species.

## Data flow (recommended, reliable)

1. Call `GET /pokemon-species/{id or name}` → read `evolution_chain.url`.
2. Call `GET /evolution-chain/{id}` → parse `chain` recursively to collect species names.
3. For each species name call `GET /pokemon/{name}` → use `id` and `sprites.other['official-artwork'].front_default` for image and linking.

Notes: use local caching for species and pokemon data to respect fair-use and reduce repeated requests.

## UI notes

- Layout: horizontal list of small cards (image + name). Support horizontal scroll on small screens.
- States: loading skeleton, empty message "No evolutions", non-intrusive error message "Unable to load evolutions".
- Click behavior: link to internal route `/pokemon/{id}` or `/pokemon/{name}` depending on app routing; prefer `id` when available.

## Files impacted (suggested)

- `src/services/pokeapi.ts`: add helpers `getEvolutionChain(speciesNameOrId)` and `getPokemonByName(name)`.
- `src/pages/PokemonDetail.tsx`: render the Evolution section, handle loading/error/empty states.
- `src/components/PokemonCard.tsx`: reuse for each evolution item (default form only).
- `src/types/pokemon.ts`: add minimal types for evolution chain parsing if needed.

---

References: `docs/02-pokeapi.md` — see sections for `pokemon-species` and `evolution-chain`.
