import chalk from "chalk";
import { Cycle } from "./airac";

const daysPerCycle = 28;
const cycleIdentifierPattern = /^([0-9]{2})([0-9]{2})$/;

export const base = new Date(Date.UTC(1901, 0, 10));
export const millisPerDay = 24 * 60 * 60 * 1000;
export const millisPerCycle = daysPerCycle * millisPerDay;

export function matchAiracIdentifier(identifier: string): RegExpMatchArray | null {
    return identifier.match(cycleIdentifierPattern);
}

export function printCycle(cycle: Cycle): void {
    console.log(`AIRAC cycle: ${chalk.bgBlue.white.bold(` ${cycle.identifier} `)}`);
    console.log(`Effective from: ${chalk.blue.bold(cycle.effectiveStart.toLocaleDateString())}`);
    console.log(`Effective to (incl.): ${chalk.blue.bold(cycle.effectiveEnd.toLocaleDateString())}`);
}
