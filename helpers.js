const { BAD_FORMAT_MSG, OUTSIDE_DTE_RNG_MSG } = require("./constants");

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

const checkIsLeapYear = year => {
  // See if the number is evenly divisible by 4. Dividing the year by 4 will result in a whole number with no remainder if the number is evenly divisible. The number must be evenly divisible by 4! Otherwise, it is not a leap year
  if (checkEvenlyDivisible(year, 4)) return false;
  // Confirm the number isn't evenly divisible by 100. If a year is evenly divisible by 4, but it is not evenly divisible 100, then it is a leap year. If a year is divisible by both 4 and 100, then it might not be a leap year, and you will have to perform 1 more calculation to check
  if (!checkEvenlyDivisible(year, 100)) return true;
  // Check if the number is evenly divisible by 400 to confirm a leap year. If a year is divisible by 100, but not 400, then it is not a leap year. If a year is divisible by both 100 and 400, then it is a leap year
  if (checkEvenlyDivisible(year, 400)) return true;
}


// Helper to check if the provided date is valid
// Returns an empty string if the date is valid otherwise it returns a string of the relevant err message to display to user if date is invalid
const validateDateStr = dateStr => {
  // Validate is a string
  if (typeof dateStr !== 'string') return BAD_FORMAT_MSG;
  // Check in DD/MM/YYYY format
  const [dd,mm,yyyy] = dateStr.split('/');
  if (!dd || convToInteger(dd) > 31 || convToInteger(dd) < 1 || !mm || convToInteger(mm) > 12 || convToInteger(mm) < 1 || !yyyy || yyyy.length !== 4) return BAD_FORMAT_MSG;
  // Check if date is between 01/01/1900 and 31/12/2999
  if (convToInteger(yyyy) < 1900 || convToInteger(yyyy) > 2999) return OUTSIDE_DTE_RNG_MSG;
  // Date valid return empty str
  return '';
};


module.exports = { calculateDaysDifference, checkIsLeapYear, validateDateStr };