import Airac = require("./airac");
import errors = require("./errors");

if (require.main === module) {
    try {
        const airac = process.argv.length < 3 ?
            Airac.fromDate(new Date()) :
            Airac.fromIdentifier(process.argv[2]);
        console.log(`AIRAC cycle: ${airac.identifier}`);
        console.log(`Effective from (inc.): ${airac.effectiveStart.toLocaleDateString("de")}`);
        console.log(`Effective to (inc.): ${airac.effectiveEnd.toLocaleDateString("de")}`);
    } catch (error) {
        if (error instanceof errors.InvalidCycleIdentifierError) {
            console.error(error.message);
        } else {
            throw error;
        }
    }
}

export {
    Airac
};

export {
    InvalidCycleIdentifierError
} from "./errors";