/*******************
 *  ONE PARAMETER  *
 *******************/

// '=>' is a new operator in ES6 which allows us to declare anonymous functions.
console.log("One parameter: ");
console.log("---------------");
var outputMessage = function(msg){
    console.log(msg);
}

// is the same as:

var outputMessageArrow = msg => console.log(msg);

outputMessage("Function Expression");   //Syntax: function(parameter){ logic }
outputMessageArrow("Arrow Function");   //Syntax: parameter => logic
console.log();


/************************
 *  MULTIPLE PARAMETER  *
 ************************/
//If we have more than one parameter, or more than one line of logic, we can still 
//use the arrow functions to simplify the creation of anonymous functions by
//eliminating the "function" keyword.
console.log("Multiple Parameters & Lines of logic:");
console.log("------------------------------------");

outputMessage = function(msg1, msg2)
{
    console.log(msg1 + " " + msg2);
}

outputMessageArrow = (msg1, msg2) => {
    console.log(msg1);
    console.log(msg2);
}

outputMessage("Function", "Expression");
outputMessageArrow("Arrow", "Function");
console.log();

/******************
 *  NO PARAMETER  *
 ******************/
console.log("No parameters:");
console.log("--------------");

outputMessage = function(){
    console.log("Function Expression");
}

outputMessageArrow = () => console.log("Arrow Function");

outputMessage();
outputMessageArrow();