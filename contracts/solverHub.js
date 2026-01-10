import { scanAllServers, tryRoot } from "/contracts/scanner.js";
import { solveContract } from "/contracts/dispatcher.js";
import { createStats, record, printStats } from "/contracts/stats.js";

export async function main(ns) {
    ns.disableLog("ALL");
    ns.tprint("🚀 Auto Contract Solver Started");

    const stats = createStats();
    const servers = scanAllServers(ns);

    for (const server of servers) {
        if (!tryRoot(ns, server)) continue;

        const contracts = ns.ls(server, ".cct");
        for (const file of contracts) {
            const type = ns.codingcontract.getContractType(file, server);
            const data = ns.codingcontract.getData(file, server);

            const answer = solveContract(ns, type, data);
            if (answer === null) continue;

            const reward = ns.codingcontract.attempt(
                answer,
                file,
                server,
                { returnReward: true }
            );

            const success = reward !== "";
            record(stats, server, type, success, file, reward);

            ns.tprint(
                success
                    ? `✅ ${type} solved on ${server} (${file})`
                    : `❌ ${type} FAILED on ${server} (${file})`
            );

            await ns.sleep(10);
        }
    }

    printStats(ns, stats);
    ns.tprint("🏁 Contract Solver Finished");
}
