// Utility functions for Pokemon data transformations
// Based on specifications in docs/02-pokeapi.md

import type { FlavorTextEntry } from "../types/pokemon";

/**
 * Convert height from decimeters to meters
 * According to API spec: height is in decimeters, divide by 10 to get meters
 * @param decimeters - Height in decimeters
 * @returns Height in meters
 */
export function convertHeight(decimeters: number): number {
    return decimeters / 10;
}

/**
 * Convert weight from hectograms to kilograms
 * According to API spec: weight is in hectograms, divide by 10 to get kg
 * @param hectograms - Weight in hectograms
 * @returns Weight in kilograms
 */
export function convertWeight(hectograms: number): number {
    return hectograms / 10;
}

/**
 * Clean description text by replacing form feed characters with spaces
 * According to API spec: Replace \f characters with spaces
 * @param text - Raw description text
 * @returns Cleaned description text
 */
export function cleanDescription(text: string): string {
    return text.replace(/\f/g, " ");
}

/**
 * Extract English description from flavor text entries
 * According to API spec: Filter by language.name === "en"
 * @param flavorTextEntries - Array of flavor text entries
 * @returns English description (cleaned) or undefined if not found
 */
export function getEnglishDescription(flavorTextEntries: FlavorTextEntry[]): string | undefined {
    const englishEntry = flavorTextEntries.find((entry) => entry.language.name === "en");

    if (!englishEntry) {
        return undefined;
    }

    return cleanDescription(englishEntry.flavor_text);
}
