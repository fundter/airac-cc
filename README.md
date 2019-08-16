# AIRAC cycle calculator

This [Node.js](https://nodejs.org/en/) module calculates Aeronautical Information Regulation And Control (AIRAC) cycle identifiers and effective dates as defined by the International Civil Aviation Organization (ICAO).

## Build

After clone, run

    npm install
    npm run build

to compile.

## Install

To install the AIRAC cycle calculator globally on the system, run

    npm install -g .

This will make the CLI called 'airac' available.

## Usage

Run

    airac

to print information of the currently effective AIRAC cycle. You can also run

    airac -i <airac-identifier>

to print information of a specific cycle identified by the given AIRAC identifier (e.g. `airac -i 1909`), or

    airac -d <iso-date>

to print information of a specific cycle identified by the given date in ISO format (e.g. `airac -d 2019-08-15`). Finally, run

    airac -h

to print the help.
