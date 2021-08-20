const readline = require('readline');
const { calculateDaysDifference, validateDateStr } = require('./helpers');
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

const getDateFromUser = (msg, onValidDateEntered) => 
  rl.question(msg, dateStr => {
    let validationErr = validateDateStr(dateStr);
    if (validationErr) {
      console.log(validationErr);
      return getDateFromUser(msg, onValidDateEntered);
    }
    return onValidDateEntered(dateStr);
  });

getDateFromUser('Please enter the first date: ', dateStrOne => {
  getDateFromUser('Please enter the second date: ', dateStrTwo => {
    console.log(`There are ${calculateDaysDifference(dateStrOne, dateStrTwo)} days between ${dateStrOne} and ${dateStrTwo}.`);
    return rl.close();
  })
});



