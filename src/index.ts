import { Cycle } from "./airac";
import { InvalidCycleIdentifierError } from "./errors";

if (require.main === module) {
    try {
        const cycle = process.argv.length < 3 ?
            Cycle.fromDate(new Date()) :
            Cycle.fromIdentifier(process.argv[2]);
        console.log(`AIRAC cycle: ${cycle.identifier}`);
        console.log(`Effective from (inc.): ${cycle.effectiveStart.toLocaleDateString("de")}`);
        console.log(`Effective to (inc.): ${cycle.effectiveEnd.toLocaleDateString("de")}`);
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
