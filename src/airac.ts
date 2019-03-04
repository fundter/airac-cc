import utils = require("./utils");
import errors = require("./errors");

class Airac {

    private _serial: number;

    private constructor(serial: number) {
        this._serial = serial;
    }

    static fromDate(date: Date): Airac {
        const baseMillis = utils.base.getTime();
        const dateMillis = date.getTime();
        const cycles = Math.floor((dateMillis - baseMillis) / utils.millisPerCycle);
        return new Airac(cycles);
    }

    static fromIdentifier(identifier: string): Airac {
        const match = utils.matchAiracIdentifier(identifier);
        if (match == null) {
            throw new errors.InvalidCycleIdentifierError(`Not a valid AIRAC cycle identifier: '${identifier}'`);
        }
        const yearPart = parseInt(match[1]);
        const ordinalPart = parseInt(match[2]);
        let year: number;
        if (yearPart > 63) {
            year = 1900 + yearPart;
        } else {
            year = 2000 + yearPart;
        }
        const lastCyclePreviousYear = Airac.fromDate(new Date(Date.UTC(year - 1, 11, 31)));
        const cycle = new Airac(lastCyclePreviousYear._serial + ordinalPart);
        if (cycle.effectiveStart.getFullYear() != year) {
            throw new errors.InvalidCycleIdentifierError(`${year} doesn't have ${ordinalPart} cycles!`);
        }
        return cycle;
    }

    get identifier(): string {
        let yearPart = (this.year % 100).toString().padStart(2, "0");
        let ordinalPart = this.ordinal.toString().padStart(2, "0");
        return `${yearPart}${ordinalPart}`;
    }
    
    get effectiveStart(): Date {
        const millis = utils.base.getTime() + (this._serial * utils.millisPerCycle)
        return new Date(millis);
    }
    
    get effectiveEnd(): Date {
        const millis = this.effectiveStart.getTime() + utils.millisPerCycle - utils.millisPerDay;
        return new Date(millis);
    }

    private get year(): number {
        return this.effectiveStart.getFullYear();
    }

    private get ordinal(): number {
        const yearStartMillis = new Date(Date.UTC(this.effectiveStart.getFullYear(), 0, 1));
        const yearMillis = this.effectiveStart.getTime() - yearStartMillis.getTime();
        return Math.floor(yearMillis / utils.millisPerCycle) + 1;
    }
}

export = Airac;