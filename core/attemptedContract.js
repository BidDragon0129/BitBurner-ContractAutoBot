/**
 * Attempts a coding contract safely
 * - Uses retry/fallback attempts
 * - Logs failed attempts
 * - Works with debug replay mode
 */

import { getSolver, recordFailure, recordSuccess } from "./solverHub.js";
import { logFailure } from "./conUtils.js";

const MAX_RETRIES = 2;

export function attemptContract(ns, contract, debug = false) {
    const { server, file, type, data } = contract;
    const solver = getSolver(type);

    if (!solver) return false;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const answer = solver(data, attempt);
            if (answer === null || answer === undefined) continue;

            const result = ns.codingcontract.attempt(answer, file, server, { returnReward: true });
            if (result) {
                recordSuccess(type);
                return true;
            }
        } catch (e) {
            if (debug) {
                logFailure(ns, { server, file, type, data, attempt, error: String(e) });
            }
        }
    }

    recordFailure(type);
    return false;
}
