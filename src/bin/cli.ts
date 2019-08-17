#!/usr/bin/env node

import * as fs from "fs";
import * as yargs from "yargs";
import { Cycle } from "../airac";
import { InvalidCycleIdentifierError } from "../errors";
import { printCycle } from "../utils";

const isoDatePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const moduleInfo = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, "utf-8"));

const args = yargs
    .usage("Usage: $0 [-i <airac-identifier>|-d <iso-date>]")
    .option("i", {
        alias: "identifier",
        describe: "AIRAC identifier to use (e.g. '1909')",
        requiresArg: true,
        type: "string",
    })
    .option("d", {
        alias: "date",
        describe: "Date in ISO format to use (e.g. '2019-08-15')",
        requiresArg: true,
        type: "string",
    })
    .conflicts("i", "d")
    .help("h")
    .alias("h", "help")
    .version("version", "Show version", `${moduleInfo.name} v${moduleInfo.version}`)
    .alias("v", "version")
    .example("$0", "Prints the AIRAC cycle for the current date.")
    .example("$0 -i <airac-identifier>", "Prints the AIRAC cycle identified by the given AIRAC identifier")
    .example("$0 -d <iso-date>", "Prints the AIRAC cycle for the given date")
    .locale("en")
    .strict()
    .argv;

if (args.identifier) {
    try {
        const cycle = Cycle.fromIdentifier(args.identifier as string);
        printCycle(cycle);
    } catch (error) {
        if (error instanceof InvalidCycleIdentifierError) {
            console.error(error.message);
            process.exit(1);
        } else {
            throw error;
        }
    }
} else if (args.date) {
    const date = args.date as string;
    if (!date.match(isoDatePattern)) {
        console.error(`Not a valid ISO date string: '${date}'`);
        process.exit(1);
    }
    const cycle = Cycle.fromDate(new Date(date));
    printCycle(cycle);
} else {
    const cycle = Cycle.fromDate(new Date());
    printCycle(cycle);
}
