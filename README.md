# AIRAC cycle calculator

This [Node.js](https://nodejs.org/en/) module calculates Aeronautical Information Regulation And Control (AIRAC) cycle identifiers and effective dates as defined by the International Civil Aviation Organization (ICAO).

## Build

After clone, run

    npm install
    node_modules/.bin/tsc

to compile.

## Usage

Run

    node .

to print information of the currently effective cycle. You can also run

    node . <Cycle-Identifier>

to print information of a specific cycle, e.g.

    node . 1903