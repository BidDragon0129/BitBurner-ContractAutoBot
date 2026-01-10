/**
 * matrix.js
 * Solves matrix/2D array type contracts
 * Examples: Unique Paths, Spiralize, Rotate
 */

function uniquePaths([rows, cols]) {
    // combinatorial solution: C(r+c-2, r-1)
    let n = rows + cols - 2;
    let k = rows - 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res *= (n - k + i) / i;
    }
    return Math.round(res);
}

function spiralize(matrix) {
    // Example: return flattened spiral
    if (!Array.isArray(matrix)) return null;
    const res = [];
    let r1 = 0, r2 = matrix.length - 1;
    let c1 = 0, c2 = matrix[0].length - 1;
    while (r1 <= r2 && c1 <= c2) {
        for (let c = c1; c <= c2; c++) res.push(matrix[r1][c]);
        for (let r = r1 + 1; r <= r2; r++) res.push(matrix[r][c2]);
        if (r1 < r2) for (let c = c2 - 1; c >= c1; c--) res.push(matrix[r2][c]);
        if (c1 < c2) for (let r = r2 - 1; r > r1; r--) res.push(matrix[r][c1]);
        r1++; r2--; c1++; c2--;
    }
    return res;
}

function bruteForceSolve(data) {
    if (Array.isArray(data) && data.length === 2 && Number.isInteger(data[0]) && Number.isInteger(data[1])) {
        return uniquePaths(data);
    }
    return data;
}

export default function solveMatrix(data, attempt = 0) {
    if (attempt === 0) return bruteForceSolve(data);
    // For more advanced patterns, saferSolve can be added later
    return bruteForceSolve(data);
}
