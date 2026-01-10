/**
 * Dispatch contracts to available workers
 * - Each worker gets a single contract
 * - Minimal RAM usage
 */

export function dispatch(ns, contracts, workers) {
    let i = 0;
    for (const contract of contracts) {
        const host = workers[i % workers.length];
        if (!ns.serverExists(host)) continue;

        ns.exec("/workers/contractWorker.js", host, 1, JSON.stringify(contract));
        i++;
    }
}
