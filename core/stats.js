/**
 * stats.js
 * Global statistics tracking for contracts
 */

export function createStats() {
    return {
        solved: 0,
        failed: 0,
        byType: {},
        byServer: {}
    };
}

export function record(stats, server, type, success) {
    stats[success ? "solved" : "failed"]++;

    stats.byType[type] ??= { solved: 0, failed: 0 };
    stats.byServer[server] ??= { solved: 0, failed: 0 };

    stats.byType[type][success ? "solved" : "failed"]++;
    stats.byServer[server][success ? "solved" : "failed"]++;
}

/**
 * Print live dashboard to terminal
 */
export function printDashboard(ns, stats) {
    ns.clear(); // Clear terminal for fresh dashboard

    ns.tprint("=== Coding Contract Stats ===");
    ns.tprint(`Total Solved: ${stats.solved} | Total Failed: ${stats.failed}\n`);

    ns.tprint("By Server:");
    ns.tprint("Server".padEnd(12) + "Solved".padEnd(8) + "Failed".padEnd(8));
    for (const [server, val] of Object.entries(stats.byServer)) {
        ns.tprint(server.padEnd(12) + String(val.solved).padEnd(8) + String(val.failed).padEnd(8));
    }

    ns.tprint("\nBy Type:");
    ns.tprint("Type".padEnd(30) + "Solved".padEnd(8) + "Failed".padEnd(8));
    for (const [type, val] of Object.entries(stats.byType)) {
        ns.tprint(type.padEnd(30) + String(val.solved).padEnd(8) + String(val.failed).padEnd(8));
    }
}
