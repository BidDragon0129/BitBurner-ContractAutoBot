/**
 * Solve "Generate IP Addresses" contracts
 * Input: string of digits
 * Output: array of valid IP addresses
 */
export default function solveIP(s, attempt = 0) {
    if (attempt === 0) return normalSolve(s);
    if (attempt === 1) return saferSolve(s);
    return bruteForceSolve(s);
}

// Normal recursive backtracking approach
function normalSolve(s) {
    const res = [];
    function backtrack(path, start) {
        if (path.length === 4 && start === s.length) res.push(path.join('.'));
        if (path.length >= 4) return;

        for (let len = 1; len <= 3; len++) {
            if (start + len > s.length) break;
            const part = s.slice(start, start + len);
            if (part.length > 1 && part[0] === '0') continue; // no leading zeros
            if (+part > 255) continue;
            backtrack([...path, part], start + len);
        }
    }
    backtrack([], 0);
    return res;
}

// Slightly safer: checks length and early termination
function saferSolve(s) {
    if (s.length > 12) return []; // max IP length is 12 digits
    return normalSolve(s);
}

// Brute-force fallback (less efficient)
function bruteForceSolve(s) {
    const res = [];
    for (let a = 1; a <= 3; a++)
    for (let b = 1; b <= 3; b++)
    for (let c = 1; c <= 3; c++)
    for (let d = 1; d <= 3; d++) {
        if (a + b + c + d !== s.length) continue;
        const parts = [s.slice(0,a), s.slice(a,a+b), s.slice(a+b,a+b+c), s.slice(a+b+c)];
        if (parts.some(p => p.length > 1 && p[0]==='0' || +p>255)) continue;
        res.push(parts.join('.'));
    }
    return res;
}
