const readline = require('readline');
const { differenceDays, validateDateStr } = require('./helpers');

// Node command line interface application to read two dates from standard input and calculate the number days between them
// The goal of this application is to guide CLI user to enter two dates, check if these are valid and then calculate and return the difference in days
// Assumptions:
//  -> User provides two dates strings in the format DD/MM/YYYY

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

console.log('This is program to calculate the number of whole days between two dates (excluding the from and to days). \n');
console.log('You will be prompted to enter the from and to dates seperately. Please enter each dates in the format DD/MM/YYYY (e.g. 01/01/2021 for the 1st of January 2021) and confirm your input by hitting the enter key. \n');
getDateFromUser('Please enter the first date: ', dateStrOne => {
  getDateFromUser('Please enter the second date: ', dateStrTwo => {
    const daysDiff = differenceDays(dateStrOne, dateStrTwo);
    console.log(`There ${daysDiff === 0 && 'no whole days' || daysDiff === 1 && 'is 1 whole day' || `are ${daysDiff} whole days`} between ${dateStrOne} and ${dateStrTwo}.`);
    return rl.close();
  })
});



