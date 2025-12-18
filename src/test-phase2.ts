// Test file for Phase 2: API Integration
// This file demonstrates how to test the API service and utility functions

import { fetchPokemonList, fetchPokemonDetails, fetchPokemonSpecies } from "./services/pokeapi";
import {
    convertHeight,
    convertWeight,
    cleanDescription,
    getEnglishDescription,
} from "./utils/pokemon";

// Test 1: Fetch Pokemon List
async function testFetchPokemonList() {
    console.log("=== Test 1: Fetch Pokemon List ===");
    try {
        const result = await fetchPokemonList(0, 20);
        console.log("✓ Success! Fetched", result.results.length, "Pokemon");
        console.log("First Pokemon:", result.results[0]);
        console.log("Next URL:", result.next);
        return true;
    } catch (error) {
        console.error("✗ Failed:", error);
        return false;
    }
}

// Test 2: Fetch Pokemon Details by ID
async function testFetchPokemonDetailsById() {
    console.log("\n=== Test 2: Fetch Pokemon Details by ID ===");
    try {
        const pokemon = await fetchPokemonDetails(1); // Bulbasaur
        console.log("✓ Success!");
        console.log("Name:", pokemon.name);
        console.log("ID:", pokemon.id);
        console.log("Height (raw):", pokemon.height, "decimeters");
        console.log("Weight (raw):", pokemon.weight, "hectograms");
        console.log("Types:", pokemon.types.map((t) => t.type.name).join(", "));
        return true;
    } catch (error) {
        console.error("✗ Failed:", error);
        return false;
    }
}

// Test 3: Fetch Pokemon Details by Name
async function testFetchPokemonDetailsByName() {
    console.log("\n=== Test 3: Fetch Pokemon Details by Name ===");
    try {
        const pokemon = await fetchPokemonDetails("pikachu");
        console.log("✓ Success!");
        console.log("Name:", pokemon.name);
        console.log("ID:", pokemon.id);
        return true;
    } catch (error) {
        console.error("✗ Failed:", error);
        return false;
    }
}

// Test 4: Fetch Pokemon Species
async function testFetchPokemonSpecies() {
    console.log("\n=== Test 4: Fetch Pokemon Species ===");
    try {
        const species = await fetchPokemonSpecies(1); // Bulbasaur
        console.log("✓ Success!");
        console.log("Name:", species.name);
        console.log("Flavor text entries:", species.flavor_text_entries.length);
        return true;
    } catch (error) {
        console.error("✗ Failed:", error);
        return false;
    }
}

// Test 5: Handle 404 Error
async function testNotFoundError() {
    console.log("\n=== Test 5: Handle 404 Error ===");
    try {
        await fetchPokemonDetails("nonexistentpokemon");
        console.error("✗ Should have thrown an error");
        return false;
    } catch (error) {
        if (error instanceof Error && error.message === "No Pokémon found") {
            console.log("✓ Success! Correctly handled 404:", error.message);
            return true;
        }
        console.error("✗ Wrong error:", error);
        return false;
    }
}

// Test 6: Height Conversion
function testHeightConversion() {
    console.log("\n=== Test 6: Height Conversion ===");
    const heightInDecimeters = 7; // Bulbasaur's height
    const heightInMeters = convertHeight(heightInDecimeters);
    console.log(`${heightInDecimeters} decimeters = ${heightInMeters} meters`);
    if (heightInMeters === 0.7) {
        console.log("✓ Success!");
        return true;
    } else {
        console.error("✗ Failed: Expected 0.7, got", heightInMeters);
        return false;
    }
}

// Test 7: Weight Conversion
function testWeightConversion() {
    console.log("\n=== Test 7: Weight Conversion ===");
    const weightInHectograms = 69; // Bulbasaur's weight
    const weightInKg = convertWeight(weightInHectograms);
    console.log(`${weightInHectograms} hectograms = ${weightInKg} kg`);
    if (weightInKg === 6.9) {
        console.log("✓ Success!");
        return true;
    } else {
        console.error("✗ Failed: Expected 6.9, got", weightInKg);
        return false;
    }
}

// Test 8: Clean Description
function testCleanDescription() {
    console.log("\n=== Test 8: Clean Description ===");
    const dirtyText = "Line 1\fLine 2\fLine 3";
    const cleanText = cleanDescription(dirtyText);
    console.log("Original:", JSON.stringify(dirtyText));
    console.log("Cleaned:", JSON.stringify(cleanText));
    if (cleanText === "Line 1 Line 2 Line 3") {
        console.log("✓ Success!");
        return true;
    } else {
        console.error("✗ Failed: Expected spaces, got", cleanText);
        return false;
    }
}

// Test 9: Get English Description
async function testGetEnglishDescription() {
    console.log("\n=== Test 9: Get English Description ===");
    try {
        const species = await fetchPokemonSpecies(1);
        const description = getEnglishDescription(species.flavor_text_entries);
        console.log("English Description:", description);
        if (description && description.length > 0 && !description.includes("\f")) {
            console.log("✓ Success! Description is cleaned and in English");
            return true;
        } else {
            console.error("✗ Failed: No valid English description found");
            return false;
        }
    } catch (error) {
        console.error("✗ Failed:", error);
        return false;
    }
}

// Run all tests
export async function runAllTests() {
    console.log("🧪 Running Phase 2 Tests...\n");

    const results = [];

    // API Tests
    results.push(await testFetchPokemonList());
    results.push(await testFetchPokemonDetailsById());
    results.push(await testFetchPokemonDetailsByName());
    results.push(await testFetchPokemonSpecies());
    results.push(await testNotFoundError());

    // Utility Tests
    results.push(testHeightConversion());
    results.push(testWeightConversion());
    results.push(testCleanDescription());
    results.push(await testGetEnglishDescription());

    const passed = results.filter((r) => r).length;
    const total = results.length;

    console.log(`\n${"=".repeat(50)}`);
    console.log(`Test Results: ${passed}/${total} passed`);
    console.log("=".repeat(50));

    return passed === total;
}

// Auto-run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runAllTests();
}
