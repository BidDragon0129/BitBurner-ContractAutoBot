/**
 * Solve encryption-related contracts
 * Handles Caesar, Vigenère ciphers
 */
export default function solveEncryption(data, attempt = 0) {
    if (attempt === 0) return normalSolve(data);
    if (attempt === 1) return saferSolve(data);
    return bruteForceSolve(data);
}

function normalSolve({cipher, key, text}) {
    if (cipher === "Caesar") return caesarDecrypt(text, key);
    if (cipher === "Vigenere") return vigenereDecrypt(text, key);
    return null;
}

// Caesar decryption
function caesarDecrypt(text, shift) {
    const a = 'A'.charCodeAt(0);
    const z = 'Z'.charCodeAt(0);
    return text.split('').map(c => {
        let code = c.charCodeAt(0);
        if (code >= a && code <= z) return String.fromCharCode((code - a - shift + 26) % 26 + a);
        return c;
    }).join('');
}

// Vigenère decryption
function vigenereDecrypt(text, key) {
    let result = '', j = 0;
    const a = 'A'.charCodeAt(0);
    const z = 'Z'.charCodeAt(0);
    for (const c of text) {
        let code = c.charCodeAt(0);
        if (code >= a && code <= z) {
            const shift = key[j % key.length].toUpperCase().charCodeAt(0) - a;
            result += String.fromCharCode((code - a - shift + 26) % 26 + a);
            j++;
        } else result += c;
    }
    return result;
}

function saferSolve(data) { try { return normalSolve(data); } catch { return null; } }
function bruteForceSolve(data) { return saferSolve(data); }
