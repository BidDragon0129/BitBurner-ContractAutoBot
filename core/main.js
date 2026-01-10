/**
/**
 * main.js
 * Orchestrator for coding contract bot with live dashboard
 */

import { scanContracts } from "/core/scanner.js";
import { dispatch } from "/core/dispatcher.js";
import { createStats, record, printDashboard } from "/core/stats.js";

export async function main(ns) {
    const stats = createStats();

    // Scan all servers & collect contracts
    const contracts = await scanContracts(ns);

    // Select worker hosts (rooted servers)
    const allServers = ns.getPurchasedServers().concat(["home"]);
    const workers = allServers.filter(s => ns.hasRootAccess(s));

    if (contracts.length === 0) {
        ns.tprint("No contracts found on the network.");
        return;
    }

    // Dispatch all contracts to workers
    dispatch(ns, contracts, workers);

    // Monitor loop for live stats
    while (true) {
        // Read stats periodically (workers update stats in RAM or via messages)
        printDashboard(ns, stats);

        await ns.sleep(2000); // Update every 2 seconds
    }
}
