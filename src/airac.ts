import { base, millisPerCycle, millisPerDay, matchAiracIdentifier } from "./utils";
import { InvalidCycleIdentifierError } from "./errors";

export class Cycle {

    private _serial: number;

    private constructor(serial: number) {
        this._serial = serial;
    }

    static fromDate(date: Date): Cycle {
        const baseMillis = base.getTime();
        const dateMillis = date.getTime();
        const cycles = Math.floor((dateMillis - baseMillis) / millisPerCycle);
        return new Cycle(cycles);
    }

    static fromIdentifier(identifier: string): Cycle {
        const match = matchAiracIdentifier(identifier);
        if (match == null) {
            throw new InvalidCycleIdentifierError(`Not a valid AIRAC cycle identifier: '${identifier}'`);
        }
        const yearPart = parseInt(match[1]);
        const ordinalPart = parseInt(match[2]);
        let year: number;
        if (yearPart > 63) {
            year = 1900 + yearPart;
        } else {
            year = 2000 + yearPart;
        }
        const lastCyclePreviousYear = Cycle.fromDate(new Date(Date.UTC(year - 1, 11, 31)));
        const cycle = new Cycle(lastCyclePreviousYear._serial + ordinalPart);
        if (cycle.effectiveStart.getFullYear() != year) {
            throw new InvalidCycleIdentifierError(`${year} doesn't have ${ordinalPart} cycles!`);
        }
        return cycle;
    }

    get identifier(): string {
        let yearPart = (this.year % 100).toString().padStart(2, "0");
        let ordinalPart = this.ordinal.toString().padStart(2, "0");
        return `${yearPart}${ordinalPart}`;
    }
    
    get effectiveStart(): Date {
        const millis = base.getTime() + (this._serial * millisPerCycle)
        return new Date(millis);
    }
    
    get effectiveEnd(): Date {
        const millis = this.effectiveStart.getTime() + millisPerCycle - millisPerDay;
        return new Date(millis);
    }

    private get year(): number {
        return this.effectiveStart.getFullYear();
    }

    private get ordinal(): number {
        const yearStartMillis = new Date(Date.UTC(this.effectiveStart.getFullYear(), 0, 1));
        const yearMillis = this.effectiveStart.getTime() - yearStartMillis.getTime();
        return Math.floor(yearMillis / millisPerCycle) + 1;
    }
};