/**
 * /workers/contractWorker.js
 * Executes a single contract and updates stats in RAM
 */

import { attemptContract } from "/core/attemptContract.js";
import { record } from "/core/stats.js";

export async function main(ns) {
    const contract = JSON.parse(ns.args[0]);
    const stats = ns.args[1]; // Pass the stats object reference

    const success = attemptContract(ns, contract);
    if(stats) record(stats, contract.server, contract.type, success);
}
