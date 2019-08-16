#!/usr/bin/env node

const airac = require("../dist/index");
const airacInfo = require("../package.json")
const yargs = require("yargs");

const args = yargs
    .alias("i", "identifier")
    .describe("i", "AIRAC identifier to use (e.g. 1910)")
    .string("i")
    .alias("d", "date")
    .describe("d", "Date in ISO format to use (e.g. 2019-08-15)")
    .string("d")
    .help("h")
    .alias("h", "help")
    .example("$0", "Prints the AIRAC cycle for the current date.")
    .example("$0 -i <cycle-identifier>", "Prints the AIRAC cycle identified by the given identifier")
    .example("$0 -d <iso-date>", "Prints the AIRAC cycle for the given date")
    .version(`airac v${airacInfo.version}`)
    .locale("en")
    .argv;

if (args.identifier) {
    try {
        const cycle = airac.Cycle.fromIdentifier(args.identifier);
        cycle.printInfo();
    }
    catch (error) {
        if (error instanceof airac.InvalidCycleIdentifierError) {
            console.error(error.message);
        } else {
            throw error;
        }
    }
}

//const cycle = airac.Cycle.fromDate(new Date());
//cycle.printInfo();
