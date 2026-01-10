export default function solveCompressionII(encoded, attempt = 0) {
    if (attempt === 0) return normalSolve(encoded);
    if (attempt === 1) return saferSolve(encoded);
    return bruteForceSolve(encoded);
}

function normalSolve(encoded) {
    let output = "", i = 0, isLiteral = true;
    while (i < encoded.length) {
        const L = parseInt(encoded[i++], 10);
        if (L === 0) { isLiteral = !isLiteral; continue; }
        if (isLiteral) { output += encoded.slice(i, i + L); i += L; }
        else {
            const X = parseInt(encoded[i++], 10);
            for (let j = 0; j < L; j++) output += output[output.length - X];
        }
        isLiteral = !isLiteral;
    }
    return output;
}

function saferSolve(encoded) {
    let output = "", i = 0, isLiteral = true;
    while (i < encoded.length) {
        if (!isDigit(encoded[i])) break;
        const L = encoded.charCodeAt(i++) - 48;
        if (L === 0) { isLiteral = !isLiteral; continue; }
        if (isLiteral) { for (let j = 0; j < L && i < encoded.length; j++) output += encoded[i++]; }
        else {
            if (!isDigit(encoded[i])) return null;
            const X = encoded.charCodeAt(i++) - 48;
            for (let j = 0; j < L; j++) { const idx = output.length - X; if (idx < 0) return null; output += output[idx]; }
        }
        isLiteral = !isLiteral;
    }
    return output;
}

function bruteForceSolve(encoded) {
    try { return saferSolve(encoded); } catch { return null; }
}

function isDigit(c) { return c >= "0" && c <= "9"; }
