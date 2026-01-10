/** 
 * Scanner Module
 * - Scans all servers reachable from home
 * - Attempts to gain root access
 * - Finds all coding contracts (.cct files)
 * - Returns a list of contract objects
 */

export async function scanContracts(ns) {
    const visited = new Set();
    const contracts = [];

    function dfs(server) {
        if (visited.has(server)) return;
        visited.add(server);

        // Gain root if possible
        if (!ns.hasRootAccess(server)) {
            tryGainRoot(ns, server);
        }

        // Check for contracts
        const files = ns.ls(server, ".cct");
        for (const file of files) {
            const type = ns.codingcontract.getContractType(file, server);
            const data = ns.codingcontract.getData(file, server);
            contracts.push({ server, file, type, data });
        }

        // Recurse into connected servers
        for (const neighbor of ns.scan(server)) {
            dfs(neighbor);
        }
    }

    dfs("home");
    return contracts;
}

// Attempt to gain root using available programs
function tryGainRoot(ns, server) {
    const programs = [
        ["BruteSSH.exe", ns.brutessh],
        ["FTPCrack.exe", ns.ftpcrack],
        ["relaySMTP.exe", ns.relaysmtp],
        ["HTTPWorm.exe", ns.httpworm],
        ["SQLInject.exe", ns.sqlinject]
    ];

    let openedPorts = 0;
    for (const [progName, func] of programs) {
        if (ns.fileExists(progName, "home")) {
            try { func(server); openedPorts++; } catch {}
        }
    }

    try {
        if (openedPorts >= ns.getServerNumPortsRequired(server)) ns.nuke(server);
    } catch {}
}
