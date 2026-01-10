/**
 * Central Solver Registry
 * - Registers solvers by type
 * - Tracks failure counts
 * - Auto-disables solvers exceeding threshold
 * - Provides safe retrieval for dispatcher/workers
 */

import solveCompressionII from "/solvers/compressionII.js";
import solveIP from "/solvers/ipAddresses.js";
import solveMatrix from "/solvers/matrix.js";
import solveStrings from "/solvers/stringManipulation.js";
import solveEncryption from "/solvers/encryption.js";
import solveNumberSequences from "/solvers/numberSequences.js";

// Solver registry
const solvers = {
    "Compression II: LZ Decompression": solveCompressionII,
    "Generate IP Addresses": solveIP,
    "Array Jumping Game": solveMatrix,
    "Spiralize Matrix": solveMatrix,
    "Unique Paths in a Grid I": solveMatrix,
    "Sanitize Parentheses in Expression": solveStrings,
    "String Manipulation": solveStrings,
    "Caesar Cipher": solveEncryption,
    "Vigenère Cipher": solveEncryption,
    "Number Sequences": solveNumberSequences,
    "Fibonacci Sequence": solveNumberSequences
};

// Failure tracking
const failures = {};
const DISABLE_THRESHOLD = 3; // auto-disable after 3 consecutive fails

/** Returns solver if not disabled, otherwise null */
export function getSolver(type) {
    if ((failures[type] ?? 0) >= DISABLE_THRESHOLD) return null;
    return solvers[type] ?? null;
}

/** Record a failed attempt */
export function recordFailure(type) {
    failures[type] = (failures[type] ?? 0) + 1;
}

/** Record a successful attempt */
export function recordSuccess(type) {
    failures[type] = 0;
}

/** Returns an array of currently disabled solver types */
export function getDisabledSolvers() {
    return Object.entries(failures)
        .filter(([_, count]) => count >= DISABLE_THRESHOLD)
        .map(([type]) => type);
}
