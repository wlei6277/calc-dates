// What about the different ways to enter a date - what assumptions are we making around which format the user will enter the date

// Node command line interface application to read two dates from standard input and calculate the number days between them
// The goal of this application is to guide CLI user to enter two dates, check if these are valid and then calculate and return the difference in days
// Assumptions:
//  -> User provides two dates strings in the format DD/MM/YYYY (no time component) (TODO reword)


// Validate input

// Helper to check if the provided date is valid 

// Unit testing

// Check invalid date throws error
// Check the format of the date string matches DD/MM/YYYY
// Check the date is valid  

// Calulate the difference in days
// Convert the dates to milliseconds
// Calculate the difference in milliseconds between the two dates
// Convert the milliseconds to days: there is 1000 milliseconds in a second, 60 seconds in a minute, 60 minutes in an hour and 24 hours in a day 
const numMillisecondsInDay = 1000 * 60 * 60 * 24;
// Divide the difference milliseconds between the two dates by the number of milliseconds in day to calculate the day difference 

//a) 2/6/1983 to 22/6/1983 19 days
//b) 4/7/1984 to 25/12/1984 173 days
//c) 3/1/1989 to 3/8/1983 2036 days