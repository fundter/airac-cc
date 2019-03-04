const base = new Date(Date.UTC(1901, 0, 10));
const daysPerCycle = 28;
const millisPerDay = 24 * 60 * 60 * 1000;
const millisPerCycle = daysPerCycle * millisPerDay;
const cycleIdentifierPattern = /^([0-9]{2})([0-9]{2})$/;

function matchAiracIdentifier(identifier: string): RegExpMatchArray | null {
    return identifier.match(cycleIdentifierPattern);
}

export {
    base,
    millisPerDay,
    millisPerCycle,
    matchAiracIdentifier
};