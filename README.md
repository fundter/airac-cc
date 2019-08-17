# airac-cc (AIRAC cycle calculator)

This module can be used to calculate Aeronautical Information Regulation And Control (AIRAC) cycle identifiers and effectivity dates as defined by the International Civil Aviation Organization (ICAO).

## Install

Install globally via

    npm install -g airac-cc

This will install the comman `airac-cc` globally on your system.

## Usage

Print out the AIRAC cycle identifier and the corresponding effectivity dates of the currently effective AIRAC cycle to the console:

    airac-cc

Print out the AIRAC cycle identifier and the corresponding effectivity dates for a specific AIRAC cycle (identified by the cycle name):

    airac-cc -i 1909

Print out the AIRAC cycle identifier and the corresponding effectivity dates for the cycle that's effective on a specific date (specify the date in [ISO](https://www.iso.org/iso-8601-date-and-time-format.html) format):

    airac-cc -d 2019-08-15

Print the help for the module:

    airac-cc -h
