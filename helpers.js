const { BAD_FORMAT_MSG, INVALID_DTE_MSG, OUTSIDE_DTE_RNG_MSG } = require("./constants");

// Helper to convert string to javascript number type - not sure if native parseInt method allowed in this challenge so using this instead
const convToInteger = str => str - 0;

const getDateComponents = dateStr => {
  const [dd, mm, yyyy] = dateStr.split('/');
  // return new Date(yyyy, mm - 1, dd, 0, 0, 0);
  return { dd: convToInteger(dd), mm: convToInteger(mm), yyyy: convToInteger(yyyy) }; 
}

// Helper to round down the result of a division
// Use Bitwise operator to floor number (since this challenge only allows primatives)
const floorNumber = number =>  number | 0;

// TODO add comments and a link to docs for how this helper works
// Conv to Julian days
// Takes an object containing days, months and years (JavaScript number type)
const convertDateComponentsToJulianDays = ({ dd, mm, yyyy }) => 365 * yyyy + floorNumber(yyyy/4) - floorNumber(yyyy/100) + floorNumber(yyyy/400) + dd + floorNumber((153*mm+8)/5);

// Helper to calculate the number of days between two dates
// Expects two date strings in the format DD/MM/YYYY
// Returns an a number representing the calculated whole number of days between the two dates (result is whole days only - we take a day from the result as both the from and to dates are excluded) 
const calculateDaysDifference = (from, to) =>  {
  const fromJulianDays = convertDateComponentsToJulianDays(getDateComponents(from));
  const toJulianDays =  convertDateComponentsToJulianDays(getDateComponents(to));
  if (fromJulianDays === toJulianDays) return 0;
  // Days difference including from date
  const daysDifference = toJulianDays > fromJulianDays ? toJulianDays - fromJulianDays : fromJulianDays - toJulianDays;
  // Days difference excluding from date
  const wholeDaysDifference = daysDifference - 1;
  return wholeDaysDifference;
};

// Helper to check if a dividend is evenly divisible by divisor (no remainder after division)
const checkEvenlyDivisible = (dividend, divisor) => ((dividend/divisor) % 1) === 0;

// Helper to check if year is a leap year or not
// Takes a JavaScript number to check if it is a leap year or not 
// Returns a boolean of wether the year is a leap year or not
// Logic has been taken from this source - https://www.wikihow.com/Calculate-Leap-Years
const checkIsLeapYear = year => {
  // See if the number is evenly divisible by 4. Dividing the year by 4 will result in a whole number with no remainder if the number is evenly divisible. The number must be evenly divisible by 4! Otherwise, it is not a leap year
  if (!checkEvenlyDivisible(year, 4)) return false;
  // Confirm the number isn't evenly divisible by 100. If a year is evenly divisible by 4, but it is not evenly divisible 100, then it is a leap year. If a year is divisible by both 4 and 100, then it might not be a leap year, and you will have to perform 1 more calculation to check
  if (!checkEvenlyDivisible(year, 100)) return true;
  // Check if the number is evenly divisible by 400 to confirm a leap year. If a year is divisible by 100, but not 400, then it is not a leap year. If a year is divisible by both 100 and 400, then it is a leap year
  if (checkEvenlyDivisible(year, 400)) return true;
  // Is divisible by 100 but not by 400 then it can't be a leap year
  return false;
}

// Helper to define the number of days in each month which vary depending upon if the year is a leap year or not
// Takes JavaScript number of the year in question (to check if it's a leap year or not)
// Returns an object representing the number of days in each month
const determineDaysInCalendarMonths = year => {
  const isLeapYear = checkIsLeapYear(year);
  return {
    1: 31,
    2: isLeapYear ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
}


// Helper to check if the provided date is valid
// Returns an empty string if the date is valid otherwise it returns a string of the relevant err message to display to user if date is invalid
const validateDateStr = dateStr => {
  // Validate is a string
  if (typeof dateStr !== 'string') return BAD_FORMAT_MSG;
  // Check in DD/MM/YYYY format
  const [dd,mm,yyyy] = dateStr.split('/');
  if (!dd || !mm || !yyyy || yyyy.length !== 4) return BAD_FORMAT_MSG;
  const day = convToInteger(dd);
  const month = convToInteger(mm);
  const year = convToInteger(yyyy);
  // Determine how many days there are in each month given the year
  const daysInEachMonth = determineDaysInCalendarMonths(year);
  // Determine if the provided date is valid
  const lastDayInMonth = daysInEachMonth[month];
  if (day < 1 || day > lastDayInMonth || month < 1 || month > 12) return INVALID_DTE_MSG;
  // Check if date is between 01/01/1900 and 31/12/2999
  if (convToInteger(yyyy) < 1900 || convToInteger(yyyy) > 2999) return OUTSIDE_DTE_RNG_MSG;
  // Date valid return empty str
  return '';
};


module.exports = { calculateDaysDifference, checkIsLeapYear, validateDateStr };