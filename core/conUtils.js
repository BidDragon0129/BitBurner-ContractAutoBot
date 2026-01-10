/**
 * Utility functions for contracts
 * - Logs failures for replay/debugging
 * - Replay mode to test solvers on failed contracts
 */

const FAIL_LOG = "/data/failedContracts.txt";

export function logFailure(ns, info) {
    const line = JSON.stringify({ time: Date.now(), ...info }) + "\n";
    ns.write(FAIL_LOG, line, "a");
}

export function replayFailures(ns) {
    if (!ns.fileExists(FAIL_LOG)) return [];
    return ns.read(FAIL_LOG)
        .trim()
        .split("\n")
        .map(l => JSON.parse(l));
}
