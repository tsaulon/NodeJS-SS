//Design Tip:
//It is important to never let your program suddenly crash or enter an unknown state due to an unanticipated error. 

//Example:
//Global isNaN(); is a way to respond to a situation which a number was expected


/************************************
 *      Handling Logic Errors       *
 ************************************/
let x = "twenty";
let y = parseInt(x);

if(isNaN(y))
{
    console.log("x cannot be converted to a number.");
}
else
{
    console.log("Success!, the numeric value of x is: " + y);
}

let a = 30, b = 0;
let c = a / b;

if(isFinite(c))
{
    console.log("Success!" + a + "/" + b + "=" + c);
}
else
{
    console.log(a + " is not divisible by " + b);
}

console.log();



/**************************************************
 *  Handling Errors That May Crash Program Pt. 1  *
 **************************************************/
 const PI = 3.14159;

 try
 {
    console.log("(try) Attemptings to change PI");
    PI = 99;
    console.log("Haha! PI is now: " + PI);
 }
 catch(e)
 {
     console.log("(catch) Uh oh, an error occured: [" + e.message + "]");
     console.log("(catch) Alas, it cannot be done, PI remains: " + PI);
 }
 finally
 {
     /************************************************
     *  Handling Errors That May Crash Program Pt. 2 *
     *************************************************/

     //Note: code in this block will always be executed even if an exception was or wasn't caught.
     console.log("(finally) Always execute code in this block.");
 }

 console.log();

 /************************************
 *       Throwing Logic Errors       *
 ************************************/

 function divide(x, y)
 {
     if(y == 0)
     {
         //stops code execution and returns (throws) new Error object to be caught outside function scope.
         throw new Error("Division by Zero!");
     }

     return x / y;
 }

 let n = 3, o = 0, p;

 try
 {
     p = divide(n, o);
 }
 catch(e)   //catches exception thrown from inside divide function.
 {
     console.log("uh oh, an error occured: " + e.message);
     //output: uh oh, an error occured: Division by Zero!
     c = NaN;
 }

 console.log(n + " / " + o + " = " + p);
