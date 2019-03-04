import { assert } from "chai";
import { Cycle } from "../src/airac";
import { InvalidCycleIdentifierError } from "../src/errors";

describe("Cycle creation from date", () => {
    it("should create valid dates for mid-cycle input", () => {
        const date = new Date(Date.UTC(2019, 2, 14));
        const cycle = Cycle.fromDate(date);

        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(2019, 1, 28)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(2019, 2, 27)).getTime());
    });
    it("should create valid dates for start-effective input", () => {
        const date = new Date(Date.UTC(2019, 1, 28));
        const cycle = Cycle.fromDate(date);

        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(2019, 1, 28)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(2019, 2, 27)).getTime());
    });
    it("should create valid dates for end-effective input", () => {
        const date = new Date(Date.UTC(2019, 2, 27));
        const cycle = Cycle.fromDate(date);

        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(2019, 1, 28)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(2019, 2, 27)).getTime());
    });
    it("should create valid cycle identifier", () => {
        const date = new Date(Date.UTC(2019, 2, 27));
        const cycle = Cycle.fromDate(date);

        assert.equal(cycle.identifier, "1903");
    });
    it("should create valid cycle identifier for 14th cycle", () => {
        const date = new Date(Date.UTC(2020, 11, 31));
        const cycle = Cycle.fromDate(date);

        assert.equal(cycle.identifier, "2014");
    });
});

describe("Cycle creation from identifier", () => {
    it("should validate cycle identifier pattern", () => {
        assert.throws(() => Cycle.fromIdentifier(""), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("ASDF"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("19003"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("I903"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("19x03"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("x1903"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("1903x"), InvalidCycleIdentifierError);
        assert.doesNotThrow(() => Cycle.fromIdentifier("1903"));
    });
    it("should validate cycle identifier ordinal", () => {
        assert.throws(() => Cycle.fromIdentifier("1914"), InvalidCycleIdentifierError);
        assert.throws(() => Cycle.fromIdentifier("1900"), InvalidCycleIdentifierError);
        assert.doesNotThrow(() => Cycle.fromIdentifier("2014"));
    });
    it("should create valid dates for identifier", () => {
        const cycle = Cycle.fromIdentifier("1903");

        assert.equal(cycle.identifier, "1903");
        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(2019, 1, 28)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(2019, 2, 27)).getTime());
    });
    it("should be valid from cycle 1 in 1980", () => {
        const cycle = Cycle.fromIdentifier("8001");

        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(1980, 0, 24)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(1980, 1, 20)).getTime());
    });
    it("should be valid to cycle 13 in 2079", () => {
        const cycle = Cycle.fromIdentifier("7913");

        assert.equal(cycle.effectiveStart.getTime(), new Date(Date.UTC(2079, 11, 14)).getTime());
        assert.equal(cycle.effectiveEnd.getTime(), new Date(Date.UTC(2080, 0, 10)).getTime());
    });
});