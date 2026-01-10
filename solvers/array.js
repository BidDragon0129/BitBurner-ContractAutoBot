/**
 * Solve array-related coding contracts
 * Handles:
 * - Unique Paths in a Grid
 * - Jumping Game variants
 * - Other array sum / sequence contracts
 */
export default function solveArrays(data, attempt = 0) {
    if (attempt === 0) return normalSolve(data);
    if (attempt === 1) return saferSolve(data);
    return bruteForceSolve(data);
}

// Normal solve: combinatorial / DP solutions
function normalSolve(input) {
    if (Array.isArray(input) && input.length === 2 && input.every(Number.isInteger)) {
        // Unique Paths in a Grid
        const [m,n] = input;
        return factorial(m+n-2)/(factorial(m-1)*factorial(n-1));
    }
    // Jump Game Minimum Jumps: array of max jumps
    if (Array.isArray(input)) return minJumps(input);
    return null;
}

function saferSolve(input) {
    try { return normalSolve(input); } catch { return null; }
}

function bruteForceSolve(input) {
    return saferSolve(input);
}

// Helper functions
function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }

function minJumps(arr) {
    if (!arr || arr.length === 0) return 0;
    let jumps = 0, curEnd = 0, farthest = 0;
    for (let i=0; i<arr.length-1; i++) {
        farthest = Math.max(farthest, i+arr[i]);
        if (i === curEnd) { jumps++; curEnd = farthest; }
        if (curEnd >= arr.length-1) break;
    }
    return curEnd >= arr.length-1 ? jumps : 0;
}
