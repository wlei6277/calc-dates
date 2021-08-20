// Error messages to display to the user
const BAD_FORMAT_MSG = 'Please ensure the date entered is in the format DD/MM/YYYY (e.g. 01/01/1900)';
const INVALID_DTE_MSG = 'Please ensure the date you have provided is valid';
const OUTSIDE_DTE_RNG_MSG = 'The date provided is outside the allowed range. Please provide a date between 01/01/1900 and 31/12/2999.';

// Time params
// There is 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour and 24 hours in a day 
const NUM_MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

module.exports = { BAD_FORMAT_MSG, INVALID_DTE_MSG,NUM_MILLISECONDS_IN_DAY, OUTSIDE_DTE_RNG_MSG };