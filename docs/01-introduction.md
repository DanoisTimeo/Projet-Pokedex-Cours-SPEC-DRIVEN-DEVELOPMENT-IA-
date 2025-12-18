# Introduction

This application is a **Pokédex**, inspired by the original Game Boy Pokédex experience.

The goal is to allow users to browse, search, and consult detailed information
about Pokémon using only public data provided by **PokeAPI**.

The application is fully **client-side**, with no authentication, backend, or database.
It focuses on clarity, simplicity, and faithful data representation.

---

## Core Features

-   Display a paginated list of Pokémon (20 per page)
-   Browse Pokémon using scrolling or pagination
-   Search Pokémon by **name (English)** or **ID**
-   View a dedicated Pokémon detail page
-   Retro Game Boy–inspired visual frame
-   Keyboard and mouse navigation
-   Client-side only application

---

## Initial Application State

-   On initial load, the Pokémon list area displays a simple **“Loading…”** message.
-   Loading indicators are displayed **only inside the zones that are actively loading**
    (list area, detail area, or search results).
-   Once the list is loaded, **no Pokémon is selected by default**.

---

## Pokémon List Behavior

-   Pokémon are displayed as **cards**.
-   Each card contains:
    -   Pokémon sprite
    -   Pokémon name (English)
    -   Pokémon ID number
-   Cards are displayed in **ascending ID order** (#1 → #N).
-   Hovering a card:
    -   Slightly enlarges the card
    -   Displays a pointer cursor
-   Clicking a card navigates the user to a **Pokémon detail page**.

---

## Pagination Rules

-   The Pokédex loads Pokémon **20 per page**.
-   Pages continue to load until no more Pokémon are returned by the API.
-   The application is **not limited to the first 151 Pokémon**.

---

## Search Behavior

-   Search requires **explicit validation**:
    -   Button click
    -   Or Enter key
-   Accepted inputs:
    -   Pokémon name (example: `pikachu`)
    -   Pokémon ID (example: `25`)
-   Pokémon names are displayed **in English**.
-   If no Pokémon matches the search:
    -   Display message: **“No Pokémon found”**

---

## Error Handling

-   Network or API errors are displayed in a **dedicated message zone**.
-   The error message includes:
    -   The original API error message (if available)
    -   A simplified explanation when possible, to remain user-friendly while supporting debugging

---

## Target Experience

The application should feel like using a classic Pokédex:
simple, readable, and information-focused, with **light animations only**.
