const readline = require('readline');
const { BAD_FORMAT_MSG, INVALID_DTE_MSG, NUM_MILLISECONDS_IN_DAY,OUTSIDE_DTE_RNG_MSG } = require("./constants");
// What about the different ways to enter a date - what assumptions are we making around which format the user will enter the date

// Node command line interface application to read two dates from standard input and calculate the number days between them
// The goal of this application is to guide CLI user to enter two dates, check if these are valid and then calculate and return the difference in days
// Assumptions:
//  -> User provides two dates strings in the format DD/MM/YYYY (no time component) (TODO reword)


// Get input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// TODO can probably DRY this up
// Get the first date from the user
rl.question('Please enter the first date: ', dateStrOne => {
  // Validate first date
  let validationErr = validateDateStr(dateStrOne);
  if (validationErr) {
    console.log(validationErr);
    return rl.close();
  }
  // Get the second date from the user
  rl.question('Please enter the second date', dateStrTwo => {
    // Validate second date
    validationErr = validateDateStr(dateStrTwo);
    if (validationErr) {
      console.log(validationErr);
      return rl.close();
    };
    return `There are ${calculateDaysDifference(dateStrOne, dateStrTwo)} between ${dateStrOne} and ${dateStrTwo}`;
  })
})

// Helper to check if the provided date is valid
// Returns an empty string if the date is valid otherwise it returns a string of the relevant err message to display to user if date is invalid
const validateDateStr = dateStr => {
  // Validate is a string
  if (typeof dateStr !== 'string') return BAD_FORMAT_MSG;
  // Check in DD/MM/YYYY format
  const [dd,mm,yyyy] = dateStr.split('/');
  if (dd.length !== 2 || Number(dd) > 31 || Number(dd) < 1 || mm.length !== 2 || Number(mm) > 12 || Number(mm) < 1 || yyyy.length !== 4) return BAD_FORMAT_MSG;
  // Check if date is between 01/01/1900 and 31/12/2999
  if (Number(yyyy) < 1900 || Number(yyyy) > 2999) return OUTSIDE_DTE_RNG_MSG;
  // Check if valid date
  // If date invalid new Date.getTime() will return NaN which is not equal to itself - if valid it will equal itself
  if (new Date(dateStr).getTime() !== new Date(dateStr).getTime()) return INVALID_DTE_MSG;
  // Date valid return empty str
  return '';
};

// Helper to calculate the number of days between two dates
// Expects two date strings in the format DD/MM/YYYY
// Returns an a number representing the calculated number of days between the two dates 
const calculateDaysDifference = (dateStrOne, dateStrTwo) =>  {
  // Calculate the difference in milliseconds between the two dates
  const millisecondsDifference = new Date(dateStrOne).getTime() - new Date(dateStrTwo).getTime();
  // Divide the difference milliseconds between the two dates by the number of milliseconds in day to calculate the day difference 
  return millisecondsDifference / NUM_MILLISECONDS_IN_DAY;
};


// Unit testing

// Check invalid date throws error
// Check the format of the date string matches DD/MM/YYYY
// Check the date is valid  

// Calulate the difference in days





//a) 2/6/1983 to 22/6/1983 19 days
//b) 4/7/1984 to 25/12/1984 173 days
//c) 3/1/1989 to 3/8/1983 2036 days