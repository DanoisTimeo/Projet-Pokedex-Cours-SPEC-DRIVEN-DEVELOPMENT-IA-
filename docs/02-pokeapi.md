# PokeAPI Specification

Base URL:  
https://pokeapi.co/api/v2

**Official API Documentation:**  
https://pokeapi.co/docs/v2

**The API is public and requires no authentication.**

Only the endpoints described below are allowed.  
**No other endpoints must be used.**

---

## Pokémon Details

Endpoint:  
GET /pokemon/{id or name}

**Example URLs:**

-   By ID: `https://pokeapi.co/api/v2/pokemon/1/`
-   By name: `https://pokeapi.co/api/v2/pokemon/bulbasaur/`

### Retrievable Data

#### 1. Basic Information

-   **Name**: `name` (string)
-   **Image**: `sprites.front_default` (string, URL)
-   **High Quality Image**: `sprites.other['official-artwork'].front_default` (string, URL)
-   **Height**: `height` (number, in decimeters - divide by 10 to get meters)
-   **Weight**: `weight` (number, in hectograms - divide by 10 to get kg)

#### 2. Types

-   **Types**: `types[]` (array)
    -   Path: `types[].type.name` (string)
    -   Types are sorted by `slot` (1 = primary type, 2 = secondary type)

#### 3. Base Statistics

-   **HP**: `stats[0].base_stat` (number)
-   **Attack**: `stats[1].base_stat` (number)
-   **Defense**: `stats[2].base_stat` (number)
-   **Special Attack**: `stats[3].base_stat` (number)
-   **Special Defense**: `stats[4].base_stat` (number)
-   **Speed**: `stats[5].base_stat` (number)

#### 4. Description

⚠️ **The description is NOT in this endpoint.**  
It must be retrieved via the **pokemon-species** endpoint (see next section).

### Response Schema (simplifié)

```json
{
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "sprites": {
        "front_default": "https://raw.githubusercontent.com/.../1.png",
        "other": {
            "official-artwork": {
                "front_default": "https://raw.githubusercontent.com/.../1.png"
            }
        }
    },
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            }
        }
    ],
    "stats": [
        {
            "base_stat": 45,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            "base_stat": 49,
            "effort": 0,
            "stat": {
                "name": "attack",
                "url": "https://pokeapi.co/api/v2/stat/2/"
            }
        },
        {
            "base_stat": 49,
            "effort": 0,
            "stat": {
                "name": "defense",
                "url": "https://pokeapi.co/api/v2/stat/3/"
            }
        },
        {
            "base_stat": 65,
            "effort": 1,
            "stat": {
                "name": "special-attack",
                "url": "https://pokeapi.co/api/v2/stat/4/"
            }
        },
        {
            "base_stat": 65,
            "effort": 0,
            "stat": {
                "name": "special-defense",
                "url": "https://pokeapi.co/api/v2/stat/5/"
            }
        },
        {
            "base_stat": 45,
            "effort": 0,
            "stat": {
                "name": "speed",
                "url": "https://pokeapi.co/api/v2/stat/6/"
            }
        }
    ],
    "species": {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    }
}
```

---

## Pokémon Species (Description)

Endpoint:  
GET /pokemon-species/{id or name}

Used to retrieve the description and additional information about a Pokémon.

**Example URLs:**

-   By ID: `https://pokeapi.co/api/v2/pokemon-species/1/`
-   By name: `https://pokeapi.co/api/v2/pokemon-species/bulbasaur/`

### Retrievable Data

-   **Description**: `flavor_text_entries[]` (array)
    -   Filter by language: `flavor_text_entries[].language.name === "en"`
    -   Text: `flavor_text_entries[].flavor_text` (string)
    -   ⚠️ Replace `\f` characters with spaces

### Response Schema (simplified)

```json
{
    "id": 1,
    "name": "bulbasaur",
    "flavor_text_entries": [
        {
            "flavor_text": "A strange seed was\nplanted on its\nback at birth.\u000cThe plant sprouts\nand grows with\nthis POKéMON.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "version": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/version/1/"
            }
        },
        {
            "flavor_text": "It can go for days\nwithout eating a\nsingle morsel.\u000cIn the bulb on\nits back, it\nstores energy.",
            "language": {
                "name": "en",
                "url": "https://pokeapi.co/api/v2/language/9/"
            },
            "version": {
                "name": "yellow",
                "url": "https://pokeapi.co/api/v2/version/3/"
            }
        },
        {
            "flavor_text": "Au matin de sa vie, la graine sur\nson dos lui fournit les éléments\ndont il a besoin pour grandir.",
            "language": {
                "name": "fr",
                "url": "https://pokeapi.co/api/v2/language/5/"
            },
            "version": {
                "name": "black",
                "url": "https://pokeapi.co/api/v2/version/17/"
            }
        }
    ],
    "color": {
        "name": "green"
    },
    "habitat": {
        "name": "grassland"
    }
}
```

---

## Data Retrieval Guide

### Complete Example for Displaying a Pokémon

```javascript
// 1. Retrieve main Pokémon data
const pokemonResponse = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
const pokemon = await pokemonResponse.json();

// 2. Retrieve description from pokemon-species
const speciesResponse = await fetch(pokemon.species.url);
// OR directly: await fetch('https://pokeapi.co/api/v2/pokemon-species/1/');
const species = await speciesResponse.json();

// 3. Extract necessary data
const pokemonData = {
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    height: pokemon.height / 10, // in meters
    weight: pokemon.weight / 10, // in kg
    description: species.flavor_text_entries
        .find((entry) => entry.language.name === "en")
        ?.flavor_text.replace(/\f/g, " "),
    types: pokemon.types.map((t) => t.type.name),
    stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        specialAttack: pokemon.stats[3].base_stat,
        specialDefense: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
    },
};
```

### JSON Path Summary

| Data        | Endpoint        | JSON Path                                         | Processing                         |
| ----------- | --------------- | ------------------------------------------------- | ---------------------------------- |
| Name        | pokemon         | `name`                                            | -                                  |
| Image       | pokemon         | `sprites.other['official-artwork'].front_default` | -                                  |
| Height      | pokemon         | `height`                                          | ÷ 10 to get meters                 |
| Weight      | pokemon         | `weight`                                          | ÷ 10 to get kg                     |
| Types       | pokemon         | `types[].type.name`                               | -                                  |
| HP          | pokemon         | `stats[0].base_stat`                              | -                                  |
| Attack      | pokemon         | `stats[1].base_stat`                              | -                                  |
| Defense     | pokemon         | `stats[2].base_stat`                              | -                                  |
| Sp. Atk     | pokemon         | `stats[3].base_stat`                              | -                                  |
| Sp. Def     | pokemon         | `stats[4].base_stat`                              | -                                  |
| Speed       | pokemon         | `stats[5].base_stat`                              | -                                  |
| Description | pokemon-species | `flavor_text_entries[].flavor_text`               | Filter by `language.name === "en"` |
