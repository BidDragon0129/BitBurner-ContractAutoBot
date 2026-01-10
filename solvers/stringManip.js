/**
 * Solve string manipulation contracts
 * Handles:
 * - Sanitize parentheses
 * - Simple text parsing / rearrangement tasks
 */
export default function solveStrings(data, attempt = 0) {
    if (attempt === 0) return normalSolve(data);
    if (attempt === 1) return saferSolve(data);
    return bruteForceSolve(data);
}

// Normal: sanitize parentheses
function normalSolve(s) {
    if (typeof s !== 'string') return null;
    const res = new Set();
    const minRemove = countInvalid(s);

    function backtrack(str, index, removeCount, leftCount, rightCount) {
        if (index === str.length) {
            if (removeCount === minRemove && leftCount === rightCount) res.add(str);
            return;
        }
        const char = str[index];
        if (char === '(' || char === ')') {
            // Option 1: remove
            backtrack(str.slice(0,index)+str.slice(index+1), index, removeCount+1, leftCount, rightCount);
        }
        // Option 2: keep
        backtrack(str, index+1, removeCount, leftCount + (char==='('?1:0), rightCount + (char===')'?1:0));
    }

    backtrack(s,0,0,0,0);
    return Array.from(res);
}

function countInvalid(s) {
    let balance = 0, remove = 0;
    for (const c of s) {
        if (c==='(') balance++;
        else if (c===')') {
            if (balance===0) remove++;
            else balance--;
        }
    }
    return remove + balance;
}

function saferSolve(s) { try { return normalSolve(s); } catch { return null; } }
function bruteForceSolve(s) { return saferSolve(s); }
