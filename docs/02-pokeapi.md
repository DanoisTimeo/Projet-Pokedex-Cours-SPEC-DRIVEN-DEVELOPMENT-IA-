# PokeAPI Specification

Base URL:  
https://pokeapi.co/api/v2

Only the endpoints described below are allowed.
No other endpoints must be used.

---

## Pokémon List

Endpoint:
GET /pokemon?limit=20&offset={offset}

Used to display the paginated Pokédex list.

### Required Fields

- name
- url

### ID Extraction Rule

- The Pokémon ID must be extracted from the `url` field.
- Example:
  https://pokeapi.co/api/v2/pokemon/25/ → ID = 25

---

## Pokémon Details

Endpoint:
GET /pokemon/{id or name}

Used when navigating to a Pokémon detail page.

### Required Data

- id
- name
- sprites.front_default
- types[].type.name
- height
- weight
- stats[].base_stat
- abilities[].ability.name

---

## Data Display Rules

- Pokémon are always displayed in ascending ID order.
- If `sprites.front_default` is null or missing:
  - Display a generic **Pokéball placeholder image**
- Types, stats, and abilities are displayed following the order returned by the API.
- Pokémon names must be displayed in **French**.

---

## Error Handling

- API errors must be surfaced to the UI error zone.
- The raw API error message should be preserved when available.
