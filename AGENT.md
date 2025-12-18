# Agent Onboarding

This project must be developed using a **Spec Driven Development** approach.

The AI must never introduce features, data, or UI elements that are not explicitly
described in the documentation files located in the `docs/` directory.

## How to self-orient

- Start with `docs/01-introduction.md` to understand the Pokédex concept.
- Read `docs/02-pokeapi.md` to fully understand the API usage and data scope.
- Read `docs/03-ui-gameboy.md` to respect the UI and UX constraints.
- Check `project-manager/general-objectives.md` before making technical decisions.
- Maintain `project-manager/tasks.md` as the single source of truth for progress tracking.

## Working guidelines
- Treat the Markdown docs as the source of truth—ask the user only when documentation is unclear or incomplete.
- Surface undocumented gaps or inconsistencies you discover while implementing features.
- Align component naming, user-facing labels, and validation messages with terminology used in the docs.
- Add follow-up documentation updates whenever UI changes require API documentation adjustments.
- **Maintain `project-manager/tasks.md` as the central project log: record pending, upcoming, and completed tasks; update the status on every change; and note the next steps in your development workflow. This file must be updated with every change, marking tasks as `[x]` (done) or `[ ]` (pending) within dedicated 'Done', 'In Progress', and 'Planned' sections.**
- Read `project-manager/general-objectives.md` before planning work to keep feature decisions aligned with the product goals.