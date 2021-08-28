const { BAD_FORMAT_MSG, OUTSIDE_DTE_RNG_MSG } = require("./constants");
const { calculateDaysDifference, checkIsLeapYear, validateDateStr } = require('./helpers');

// Test class to structure unit testing output 
function Test(input, expected, result) {
  this.input = input;
  this.expected = expected;
  this.result = result;
}

// Testing checkIsLeapYear helper
console.log('Testing checkIsLeapYear helper \n');
console.table(new Test("1997", false, checkIsLeapYear(1997)));
console.table(new Test("2012", true, checkIsLeapYear(2012)));
console.table(new Test("1900", false, checkIsLeapYear(1900)));
console.table(new Test("2000", true, checkIsLeapYear(2000)));

// Testing validation helper
console.log('Testing validateDateStr helper \n');
console.table(new Test("Invalid date format: 1991/01/23", BAD_FORMAT_MSG, validateDateStr('1991/01/23')));
console.table(new Test("Valid date: 21/08/2021", '', validateDateStr('21/08/2021')));
console.table(new Test("Valid date: 01/01/2001", '', validateDateStr('01/01/2001')));
console.table(new Test("Valid date: 03/01/2001", '', validateDateStr('03/01/2001')));
console.table(new Test("Valid date: 2/6/1963", '', validateDateStr('2/6/1963')));
console.table(new Test("Valid date: 22/6/1983", '', validateDateStr('22/6/1983')));
console.table(new Test("Valid date: 4/7/1984", '', validateDateStr('4/7/1984')));
console.table(new Test("Valid date: 25/12/1984", '', validateDateStr('25/12/1984')));
console.table(new Test("Valid date: 3/1/1989", '', validateDateStr('3/1/1989')));
console.table(new Test("Valid date: 3/8/1983", '', validateDateStr('3/8/1983')));
console.table(new Test("Outside date range: 01/01/1899", OUTSIDE_DTE_RNG_MSG, validateDateStr('01/01/1899')));
console.table(new Test("Outside date range: 01/01/3000", OUTSIDE_DTE_RNG_MSG, validateDateStr('01/01/3000')));

// Testing differenceDays helper
console.log("Testing calcDaysDifference helper \n");
console.table(new Test("01/01/2001 to 03/01/2001", 1, calculateDaysDifference("01/01/2001", "03/01/2001")));
console.table(new Test("2/6/1983 to 22/6/1983", 19, calculateDaysDifference("2/6/1983", "22/6/1983")));
console.table(new Test("4/7/1984 to 25/12/1984", 173, calculateDaysDifference("4/7/1984", "25/12/1984")));
console.table(new Test("3/1/1989 to 3/8/1983", 2036, calculateDaysDifference("3/1/1989", "3/8/1983")));
console.table(new Test("1/3/1989 to 3/8/1983", 2036, calculateDaysDifference("1/3/1989", "3/8/1983")));
