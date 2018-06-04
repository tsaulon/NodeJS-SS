/*
 * Javascript, being a dynamically typed language, declares variables using var.
 * However, when we use var; we create our variables on the **function scope** 
 * 
 */

 /**************************************
  *                 VAR                *
  **************************************/
for(var i = 0; i < 5; i++)
{
    // ...
}

//i remains in the function scope after iterations are complete
console.log("var: " + i);


 /**************************************
  *                 LET                *
  **************************************/
for(let j = 0; j < 5; j++)
{
    // 'let' allows for a mutable (changeable) block scoped variable.
}

try
{
    //j exists within the block scope of the statement which it was used
    console.log(j); //ReferenceError: j is not defined
}
catch(e)
{
    console.log("let: (" + e + ")");
}


 /**************************************
  *                CONST               *
  **************************************/

try{
    for(const k = 0; k < 5; k++)    //type error: assignment to constant variable
    {
        // ...
    }  
}
catch(e)
{
    console.log("const: (" + e + ")");
}

try{
    console.log(k); //k only existed within the statement it was used
}
catch(e)
{
    console.log("const: (" + e + ")");
}


/**Notes**/


//var: exists on the function scope.
//let: exists on the block scope (exists on own statement) and is mutable.
//const: exists on the block scope (exists on own statement and is immutable.