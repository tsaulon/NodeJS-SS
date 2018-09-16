/*
 * Handling failed asynchronous calls.
 * What if we're in the middle of an XHR request and our connection is dropped or a database connection fails?
 * 
 * The solution is to invoke the "reject" method and provide a reason why our asynchronous operation failed.
 * This also forces flow of execution into the .catch() function, where we handle the error.
 * 
 * Demonstration is as follows:
 */

function outputA()
{
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ 
        setTimeout(function(){
        console.log("-");
        //call reject because we have completed the function unsuccessfully.
        //similar concept to joining sub-threads to main thread after an a sub-thread has finished execution and has failed. (Also, similar to "try" statement.)
        reject("Output A is rejected!");
        }, randomTime);
    });
}

// .then() method is where we place our freshly returned data from an asynchronous call to a web service / database etc.
outputA().then(function(data){
    console.log(data);  //"Output A is resolved"
}).catch(function(reason){
    console.log(reason); //"Output A is rejected"
});


//Promise() ->  resolve() -> .then()
//Promise() ->  reject()  -> .catch()