const { calculateDaysDifference, validateDateStr } = require('./helpers');
// Unit testing

function Test(input, expected, result) {
  this.input = input;
  this.expected = expected;
  this.result = result;
}

// Testing calculateDayDifference helper
console.log("Testing calculateDaysDifference helper \n");
console.table(new Test("01/01/2001 to 03/01/2001", 1, calculateDaysDifference("01/01/2001", "03/01/2001")));
console.table(new Test("2/6/1963 to 22/6/1983", 19, calculateDaysDifference("2/6/1983", "22/6/1983")));
console.table(new Test("4/7/1984 to 25/12/1984", 173, calculateDaysDifference("4/7/1984", "25/12/1984")));
console.table(new Test("3/1/1989 to 3/8/1983", 2036, calculateDaysDifference("3/1/1989", "3/8/1983")));

// Check invalid date throws error
// Check the format of the date string matches DD/MM/YYYY
// Check the date is valid  

// Calulate the difference in days


// test calculateDaysDifference helper
//a) 2/6/1983 to 22/6/1983 19 days
//b) 4/7/1984 to 25/12/1984 173 days
//c) 3/1/1989 to 3/8/1983 2036 days