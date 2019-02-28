module.exports = function (container){

  // assign numerical values to alpha characters
  const alphaValues = {a: 10,b: 12,c: 13,d: 14,e: 15,f: 16,g: 17,h: 18,i: 19,j: 20,k: 21,l: 23,m: 24,n: 25,o: 26,p: 27,q: 28,r: 29,s: 30,t: 31,u: 32,v: 34,w: 35,x: 36,y: 37,z: 38};
  // declare exponential calculation array
let expoCalc = [];
//declare variable to hold the sum of the values
var sumValues = 0;
// declare variable to hold final result after calculations
var result = 0;
// variable holding the regex
var containerRegex = /[A-Za-z]{4}\d{6,7}/i;
// variable to contain check digit
// let checkDigit = 0;

// check if container passes reg exp
if (containerRegex.test(container) === true) {
  // perform a check digit to validate the container number.
  for (var i = 0; i < container.length; i++) {
    // if the character is not a number
    if (isNaN(container.charAt(i))) {
      // return the value from the array
      expoCalc.push((alphaValues[container.charAt(i).toLowerCase()]));
    } else {
      // if the character is a number, return the number.
      expoCalc.push(parseInt(container.charAt(i), 10));
    }
  }
  // loop through expoCalc array
  for (var i = 0; i < 10; i++) {
    // for each expoCalc index, multiply value by 2 to the power of index and sum the values into sumValues
    sumValues += (expoCalc[i] * Math.pow(2, i));
  }
  result = parseInt(sumValues / 11,10)*11;
  let checkDigit = (sumValues - result == 10) ? 0 : sumValues-result;

  if (checkDigit == container.charAt(container.length - 1)) {
    var response = {
      message : "This container is valid.",
      valid: true
    }
    return response;
  } else {
    var response = {
      message : "Sorry this container is invalid. Please try again.",
      valid: false
    }

    return response;
  }
} else {
    // display warning to user that container isn't valid.
    var response = {
       message : "Sorry this container is invalid. Please try again.",
       valid: false
    }
    return response;

};





}
