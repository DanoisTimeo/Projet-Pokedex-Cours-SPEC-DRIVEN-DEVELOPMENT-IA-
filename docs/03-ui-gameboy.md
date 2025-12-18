# Game Boy UI Specification

## Overall Concept

The application is visually framed inside a **red Game Boy shell**,
as if the website content were displayed inside the Game Boy screen.

Only the frame is stylized as a Game Boy.
Inside the screen, the UI remains simple and readable.

---

## Screen Area

- Screen background color: white
- Content areas:
  - Search bar
  - Pokémon list
  - Pokémon detail
  - Error and loading messages

---

## Visual Style

- Pixel-style font:
  - Primary font: **"Press Start 2P"**
- Simple UI elements
- No modern UI patterns (no cards with shadows, no glassmorphism)
- Light animations only

---

## Pokémon Cards

- Cards display:
  - Sprite
  - Name
  - ID number
- Hover effect:
  - Slight scale-up animation
  - Cursor changes to pointer

---

## Navigation

- Mouse navigation supported (click, scroll)
- Keyboard navigation supported:
  - Arrow keys for scrolling
  - Enter key for validation (search, selection)
- Navigation behaves like a standard scrollable interface

---

## Loading Indicators

- Loading messages appear **only in the zone currently loading**
- Simple text-based indicator:
  - “Loading…”

---

## Error Display

- Errors are displayed inside a dedicated screen area
- Error messages remain readable and non-blocking

---

## Responsiveness

- The application is responsive
- The Game Boy frame scales while preserving its aspect ratio
- No dark mode
