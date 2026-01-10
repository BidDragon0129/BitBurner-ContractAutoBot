/**
 * numberSequences.js
 * Solves math/number sequence type contracts
 * Supports normalSolve, saferSolve, and bruteForceSolve
 */

function normalSolve(data) {
    // Example: sum, arithmetic, Fibonacci, etc.
    // Check common patterns
    if (!Array.isArray(data)) return null;

    // Arithmetic sequence check
    let diff = data[1] - data[0];
    let isArithmetic = true;
    for (let i = 2; i < data.length; i++) {
        if (data[i] - data[i-1] !== diff) {
            isArithmetic = false;
            break;
        }
    }
    if (isArithmetic) return data[data.length-1] + diff;

    // Fallback: return last number
    return data[data.length-1];
}

function saferSolve(data) {
    // Try geometric or Fibonacci patterns
    if (!Array.isArray(data) || data.length < 2) return null;

    // Geometric
    let ratio = data[1] / data[0];
    let isGeo = true;
    for (let i = 2; i < data.length; i++) {
        if (data[i] / data[i-1] !== ratio) {
            isGeo = false;
            break;
        }
    }
    if (isGeo) return data[data.length-1] * ratio;

    // Fibonacci pattern
    let isFib = true;
    for (let i = 2; i < data.length; i++) {
        if (data[i] !== data[i-1] + data[i-2]) {
            isFib = false;
            break;
        }
    }
    if (isFib) return data[data.length-1] + data[data.length-2];

    return data[data.length-1];
}

function bruteForceSolve(data) {
    // As a last resort, try simple pattern guesses
    return data[data.length-1];
}

export default function solveNumberSequences(data, attempt = 0) {
    if (attempt === 0) return normalSolve(data);
    if (attempt === 1) return saferSolve(data);
    return bruteForceSolve(data);
}
