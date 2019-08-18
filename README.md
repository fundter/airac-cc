# airac-cc (AIRAC cycle calculator)

This module can be used to calculate Aeronautical Information Regulation And Control (AIRAC) cycle identifiers and effectivity dates as defined by the International Civil Aviation Organization (ICAO). A list of current AIRAC effectivity dates can be found [here](https://www.nm.eurocontrol.int/RAD/common/airac_dates.html).

The code of this module is based on a similar [Java library](https://github.com/jwkohnen/airac-java/) written by Johannes Kohnen.

## Usage

    const airac = require("airac-cc");

    let cycle;

    try {
        cycle = airac.Cycle.fromIdentifier("1909");
        console.log(cycle.effectiveStart);
        console.log(cycle.effectiveEnd);
    } catch (error) {
        if (error instanceof airac.InvalidCycleIdentifierError) {
            // ...
        }
    }

    cycle = airac.Cycle.fromDate(new Date());
    console.log(cycle.identifier);
    console.log(cycle.effectiveStart);
    console.log(cycle.effectiveEnd);

*__Note__: when using the `fromIdentifier` method, this module will only consider AIRAC identifiers between January 1st 1980 and December 31st 2079. Therefore, cycle 7501 will be considred to be the first cycle of 2075, not 1975! If you want to calculate effectifity dates outside of this range, use the `fromDate` method.*

This modules comes with TypeScript definitions. TypeScript version of the above:

    import { Cycle, InvalidCycleIdentifierError } from "airac-cc";

    let cycle;

    try {
        cycle = Cycle.fromIdentifier("1909");
        console.log(cycle.effectiveStart);
        console.log(cycle.effectiveEnd);
    } catch (error) {
        if (error instanceof InvalidCycleIdentifierError) {
            // ...
        }
    }

    cycle = Cycle.fromDate(new Date());
    console.log(cycle.identifier);
    console.log(cycle.effectiveStart);
    console.log(cycle.effectiveEnd);

## CLI

This AIRAC cycle calculator also comes with a CLI. Install globally via

    npm install -g airac-cc

This will install the command `airac-cc` globally on your system.

Print out the AIRAC cycle identifier and the corresponding effectivity dates of the currently effective AIRAC cycle to the console:

    airac-cc

Print out the AIRAC cycle identifier and the corresponding effectivity dates for a specific AIRAC cycle (identified by the cycle name):

    airac-cc -i 1909

*__Note__: when using the `-i` option, this module will only consider AIRAC identifiers between January 1st 1980 and December 31st 2079. Therefore, cycle 7501 will be considred to be the first cycle of 2075, not 1975! If you want to calculate effectifity dates outside of this range, use the `-d` option (see below).* 

Print out the AIRAC cycle identifier and the corresponding effectivity dates for the cycle that's effective on a specific date (specify the date in [ISO](https://www.iso.org/iso-8601-date-and-time-format.html) format):

    airac-cc -d 2019-08-15

Print the help for the module:

    airac-cc -h
