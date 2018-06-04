/*
 * Assume that the order of output was important during asynchronous operations.
 * What if one of the functions relies on the output from one of the other functions?
 * If so, order of execution must be specified.
 * 
 * Javascript has a Promise object which is used for asychronous computations. (Represents a value available now, in the future, or never.)
 * We place asynchronous code inside a Promise object as a function with specific parameters ("resolve", "reject").
 * When complete, we invoke the "resolve" function and if our code encounters an error, we can invoke the reject function.
 */

 

function outputA()
{
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ 
        setTimeout(function(){
        console.log("A");
        //call resolve because we have completed the function successfully.
        //similar concept to joining sub-threads to main thread after an a sub-thread has finished execution. 
        resolve("Output A is resolved!");
        }, randomTime);
    });
}

// .then() method is where we place our freshly returned data from an asynchronous call to a web service / database etc.
outputA().then(function(data){
    console.log(data);  //"Output A is resolved"
});