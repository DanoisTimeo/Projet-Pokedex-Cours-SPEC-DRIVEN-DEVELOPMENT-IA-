# PokeAPI Specification

Base URL: https://pokeapi.co/api/v2

## Pokémon List

Endpoint:
GET /pokemon?limit=151

Used to display the main Pokédex list.

Required fields:
- name
- url (used to extract the Pokémon ID)

## Pokémon Details

Endpoint:
GET /pokemon/{id or name}

Used when a Pokémon is selected.

### Required Data

- id
- name
- sprites.front_default
- types[].type.name
- height
- weight
- stats[].base_stat
- abilities[].ability.name

No other endpoints should be used.
