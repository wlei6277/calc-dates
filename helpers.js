const { BAD_FORMAT_MSG, NUM_MILLISECONDS_IN_DAY,OUTSIDE_DTE_RNG_MSG } = require("./constants");

// Converts a date string in the format DD/MM/YYYY to javascript UTC time Date object   
const convDateStrToUtcObj = dateStr => {
  const [dd, mm, yyyy] = dateStr.split('/');
  // return new Date(yyyy, mm - 1, dd, 0, 0, 0);
  return Date.UTC(yyyy, mm - 1, dd, 0, 0, 0);
}

// Helper to calculate the number of days between two dates
// Expects two UTC date objects, the first argument being the former date and second being the later 
// Returns an a number representing the calculated whole number of days between the two dates (i.e. excluding the from and to dates)
const calculateDaysDifference = (from, to) =>  {
  if (from === to) return 0;
  // Calculate the difference in milliseconds between the two dates
  const millisecondsDifference =  to - from;
  // Divide the difference milliseconds between the two dates by the number of milliseconds in day to calculate the day difference 
  const daysDifference = Math.floor(millisecondsDifference / NUM_MILLISECONDS_IN_DAY);
  // To get the whole number of days differe take one day off the days difference to exclude the from date 
  const wholeDaysDifference = daysDifference - 1;
  return wholeDaysDifference;
};

// Helper which takes two date strings in the format DD/MM/YYYY and calculates the whole number of days between them
const differenceDays = (dateStrOne, dateStrTwo) => {
  const utcOne = convDateStrToUtcObj(dateStrOne);
  const utcTwo = convDateStrToUtcObj(dateStrTwo);
  return utcOne > utcTwo ? calculateDaysDifference(utcTwo, utcOne) : calculateDaysDifference(utcOne, utcTwo);
}

// Helper to check if the provided date is valid
// Returns an empty string if the date is valid otherwise it returns a string of the relevant err message to display to user if date is invalid
const validateDateStr = dateStr => {
  // Validate is a string
  if (typeof dateStr !== 'string') return BAD_FORMAT_MSG;
  // Check in DD/MM/YYYY format
  const [dd,mm,yyyy] = dateStr.split('/');
  if (Number(dd) > 31 || Number(dd) < 1 || Number(mm) > 12 || Number(mm) < 1 || yyyy.length !== 4) return BAD_FORMAT_MSG;
  // Check if date is between 01/01/1900 and 31/12/2999
  if (Number(yyyy) < 1900 || Number(yyyy) > 2999) return OUTSIDE_DTE_RNG_MSG;
  // Date valid return empty str
  return '';
};


module.exports = { calculateDaysDifference, convDateStrToUtcObj, differenceDays, validateDateStr };