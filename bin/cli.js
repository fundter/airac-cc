#!/usr/bin/env node

const airac = require("../dist/index");
const airacInfo = require("../package.json")
const yargs = require("yargs");

const isoDatePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

const args = yargs
    .usage("Usage: $0 [-i <airac-identifier>|-d <iso-date>]")
    .option("i", {
        alias: "identifier",
        describe: "AIRAC identifier to use (e.g. '1909')",
        type: "string",
        requiresArg: true
    })
    .option("d", {
        alias: "date",
        describe: "Date in ISO format to use (e.g. '2019-08-15')",
        type: "string",
        requiresArg: true
    })
    .conflicts("i", "d")
    .help("h")
    .alias("h", "help")
    .version("version", "Show version", `airac v${airacInfo.version}`)
    .alias("v", "version")
    .example("$0", "Prints the AIRAC cycle for the current date.")
    .example("$0 -i <airac-identifier>", "Prints the AIRAC cycle identified by the given AIRAC identifier")
    .example("$0 -d <iso-date>", "Prints the AIRAC cycle for the given date")
    .locale("en")
    .strict()
    .argv;

if (args.identifier) {
    try {
        const cycle = airac.Cycle.fromIdentifier(args.identifier);
        cycle.printInfo();
    } catch (error) {
        if (error instanceof airac.InvalidCycleIdentifierError) {
            console.error(error.message);
            process.exit(1);
        } else {
            throw error;
        }
    }
} else if (args.date) {
    if (!args.date.match(isoDatePattern)) {
        console.error(`Not a valid ISO date string: '${args.date}'`);
        process.exit(1);       
    }
    const cycle = airac.Cycle.fromDate(new Date(args.date));
    cycle.printInfo();
} else {
    const cycle = airac.Cycle.fromDate(new Date());
    cycle.printInfo();    
}
