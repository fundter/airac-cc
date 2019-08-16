import * as yargs from "yargs";
import { Cycle } from "./airac";
import { InvalidCycleIdentifierError } from "./errors";

if (require.main === module) {
    const args = yargs
        .usage("Usage: ")
        .argv;

    try {
        const cycle = args._.length > 0 ?
            Cycle.fromIdentifier(String(args._[0])) :
            Cycle.fromDate(new Date());
        console.log(`AIRAC cycle: ${cycle.identifier}`);
        console.log(`Effective from (inc.): ${cycle.effectiveStart.toLocaleDateString()}`);
        console.log(`Effective to (inc.): ${cycle.effectiveEnd.toLocaleDateString()}`);
    } catch (error) {
        if (error instanceof InvalidCycleIdentifierError) {
            console.error(error.message);
        } else {
            throw error;
        }
    }
}

export {
    Cycle,
    InvalidCycleIdentifierError,
};
