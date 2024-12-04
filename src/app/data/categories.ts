import {CategoriesGroup} from "../models/categories-group";

export const gdpCategories:CategoriesGroup = {
    categories: [
        { threshold: 1e9, color: '#FF0000' },      // Very Low (Red)
        { threshold: 50e9, color: '#FF4500' },      // Low (Orange-Red)
        { threshold: 1e10, color: '#FF8C00' },      // Lower-Middle (Orange)
        { threshold: 5e10, color: '#FFA500' },     // Middle-Low (Dark Orange)
        { threshold: 1e11, color: '#FFD700' },     // Middle (Gold)
        { threshold: 5e11, color: '#FFFF00' },     // Upper-Middle (Yellow)
        { threshold: 20e11, color: '#37ff00' },     // Very High (Lime Green)
        { threshold: Infinity, color: '#006400' }  // Extremely High (Dark Green) // Highest (Darkest Green)
    ],
    unit: "$"
}
export const gdpPerCapitaCategories:CategoriesGroup = {
    categories: [
        {threshold: 1000, color: '#FF0000'},      // Very Low (Red)
        {threshold: 5000, color: '#FF4500'},      // Low (Orange-Red)
        {threshold: 10000, color: '#ff8d00'},      // Lower-Middle (Orange)
        {threshold: 15000, color: '#ffd500'},     // Middle-Low (Dark Orange)
        {threshold: 20000, color: '#eeff00'},     // Middle (Gold)
        {threshold: 30000, color: '#d0ff00'},     // Upper-Middle (Yellow)
        {threshold: 40000, color: '#37ff00'},
        {threshold: 70000, color: '#1a8000'},  // Very High (Lime Green)
        {threshold: Infinity, color: '#003e00'}  // Extremely High (Dark Green) // Highest (Darkest Green)
    ],
    unit: "$"
}

export const gdpPerCapitaPppCategories:CategoriesGroup = {
    categories: [
        {threshold: 1000, color: '#FF0000'},      // Very Low (Red)
        {threshold: 5000, color: '#FF4500'},      // Low (Orange-Red)
        {threshold: 10000, color: '#ff8d00'},      // Lower-Middle (Orange)
        {threshold: 15000, color: '#ffd500'},     // Middle-Low (Dark Orange)
        {threshold: 20000, color: '#eeff00'},     // Middle (Gold)
        {threshold: 30000, color: '#d0ff00'},     // Upper-Middle (Yellow)
        {threshold: 40000, color: '#37ff00'},
        {threshold: 70000, color: '#1a8000'},  // Very High (Lime Green)
        {threshold: Infinity, color: '#003e00'}  // Extremely High (Dark Green) // Highest (Darkest Green)
    ],
    unit: "$"
}

export const populationCategories:CategoriesGroup = {
    categories: [
        { threshold: 0, color: '#FF0000' },          // Very Low (Red)
        { threshold: 1e6, color: '#FF4500' },     // Low (Red-Orange)
        { threshold: 2e6, color: '#FF8C00' },        // Lower-Middle (Orange)
        { threshold: 5e6, color: '#FFD700' },        // Middle-Low (Gold)
        { threshold: 10e6, color: '#FFFF00' },       // Moderate (Yellow)
        { threshold: 50e6, color: '#ADFF2F' },       // Higher-Middle (Yellow-Green)
        { threshold: 100e6, color: '#7FFF00' },       // High (Lime)
        { threshold: 200e6, color: '#32CD32' },      // Very High (Green)
        { threshold: 1e9, color: '#006400' },      // Extremely High (Dark Green)
        { threshold: Infinity, color: '#003200' }    // Maximum (Deep Green)
    ],
    unit: ""
}

export const gdpGrowthCategories:CategoriesGroup = {
    categories: [
        { threshold: 0, color: '#FF0000' },       // Negative Growth (Red)
        { threshold: 1, color: '#FF4500' },       // Low Growth (Orange-Red)
        { threshold: 2, color: '#FF8C00' },       // Moderate Growth (Orange)
        { threshold: 3, color: '#FFD700' },       // Good Growth (Gold)
        { threshold: 4, color: '#FFFF00' },       // High Growth (Yellow)
        { threshold: 5, color: '#ADFF2F' },       // Very High Growth (Yellow-Green)
        { threshold: Infinity, color: '#7FFF00' } // Extremely High Growth (Lime)
    ],
    unit: "%"
}

export const gdpPppGrowthCategories:CategoriesGroup = {
    categories: [
        { threshold: 0, color: '#FF0000' },       // Negative Growth (Red)
        { threshold: 1, color: '#FF4500' },       // Low Growth (Orange-Red)
        { threshold: 2, color: '#FF8C00' },       // Moderate Growth (Orange)
        { threshold: 3, color: '#FFD700' },       // Good Growth (Gold)
        { threshold: 4, color: '#FFFF00' },       // High Growth (Yellow)
        { threshold: 5, color: '#ADFF2F' },       // Very High Growth (Yellow-Green)
        { threshold: Infinity, color: '#7FFF00' } // Extremely High Growth (Lime)
    ],
    unit: "%"
}

export const inflationCategories:CategoriesGroup = {
    categories: [
        { threshold: 0, color: '#7FFF00' },       // Low Inflation (Lime)
        { threshold: 2, color: '#ADFF2F' },       // Moderate Inflation (Yellow-Green)
        { threshold: 4, color: '#FFFF00' },       // High Inflation (Yellow)
        { threshold: 6, color: '#FFD700' },       // Very High Inflation (Gold)
        { threshold: 8, color: '#FF8C00' },       // Extremely High Inflation (Orange)
        { threshold: 10, color: '#FF4500' },      // Hyperinflation (Orange-Red)
        { threshold: Infinity, color: '#FF0000' } // Severe Hyperinflation (Red)
    ],
    unit: "%"
}

export const employmentCategories:CategoriesGroup = {
    categories: [
        { threshold: 0, color: '#7FFF00' },       // Low Inflation (Lime)
        { threshold: 2, color: '#ADFF2F' },       // Moderate Inflation (Yellow-Green)
        { threshold: 4, color: '#FFFF00' },       // High Inflation (Yellow)
        { threshold: 6, color: '#FFD700' },       // Very High Inflation (Gold)
        { threshold: 8, color: '#FF8C00' },       // Extremely High Inflation (Orange)
        { threshold: 10, color: '#FF4500' },      // Hyperinflation (Orange-Red)
        { threshold: Infinity, color: '#FF0000' } // Severe Hyperinflation (Red)
    ],
    unit: "%"
}

export const migrationCategories:CategoriesGroup = {
    categories: [
        { threshold: -1000000, color: '#FF0000' }, // Very High Emigration (Red)
        { threshold: -500000, color: '#FF4500' },  // High Emigration (Orange-Red)
        { threshold: -100000, color: '#FF8C00' },  // Moderate Emigration (Orange)
        { threshold: 0, color: '#FFD700' },        // Low Emigration (Gold)
        { threshold: 100000, color: '#FFFF00' },   // Low Immigration (Yellow)
        { threshold: 500000, color: '#ADFF2F' },   // Moderate Immigration (Yellow-Green)
        { threshold: 1000000, color: '#7FFF00' },  // High Immigration (Lime)
        { threshold: Infinity, color: '#32CD32' }  // Very High Immigration (Green)
    ],
    unit: ""
}

export const fertilityCategories:CategoriesGroup = {
    categories: [
        { threshold: 1, color: '#FF0000' }, // Very High Emigration (Red)
        { threshold: 2, color: '#FF4500' },  // High Emigration (Orange-Red)
        { threshold: 3, color: '#FF8C00' },  // Moderate Emigration (Orange)
        { threshold: 4, color: '#FFD700' },        // Low Emigration (Gold)
        { threshold: 5, color: '#FFFF00' },   // Low Immigration (Yellow)
        { threshold: 6, color: '#ADFF2F' },   // Moderate Immigration (Yellow-Green)
        { threshold: 7, color: '#7FFF00' },  // High Immigration (Lime)
        { threshold: Infinity, color: '#32CD32' }  // Very High Immigration (Green)
    ],
    unit: ""
}

export const populationDensityCategories:CategoriesGroup = {
    categories: [
        { threshold: 5, color: '#FF0000' },      // Very Low (Red)
        { threshold: 20, color: '#FF8C00' },     // Low (Orange-Red)
        { threshold: 100, color: '#FFD700' },    // Moderate (Gold)
        { threshold: 250, color: '#a8ea22' },    // High (Yellow-Green)
        { threshold: 500, color: '#57EC01' },    // Very High (Bright Green)
        { threshold: 1000, color: '#32CD32' },   // Extremely High (Lime Green)
        { threshold: Infinity, color: '#006400' } // Maximum (Dark Green)
    ],
    unit: ""
}
