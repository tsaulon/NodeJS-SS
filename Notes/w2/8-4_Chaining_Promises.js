//Demo of how to chain promises in a specific order of execution:

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

function outputB(msg)   //NOTE: msg holds the 'resolve' message from the previous function in the chain
{
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ 
        setTimeout(function(){
        console.log("B");
        //call resolve because we have completed the function successfully.
        //similar concept to joining sub-threads to main thread after an a sub-thread has finished execution. 
        resolve("Output B is resolved!");
        }, randomTime);
    });
}

function outputC(msg)   //NOTE: msg holds the 'resolve' message from the previous function in the chain
{
    var randomTime = Math.floor(Math.random() * 3000) + 1;

    return new Promise(function(resolve, reject){ 
        setTimeout(function(){
        console.log("C");
        //call resolve because we have completed the function successfully.
        //similar concept to joining sub-threads to main thread after an a sub-thread has finished execution. 
        resolve("Output C is resolved!");
        }, randomTime);
    });
}


//outputA() -> outputB() -> outputC() ~> .catch() if any errors.

outputA().then(outputB)
         .then(outputC)
         .catch(function(rejectMsg){
            //catch any errors here
            console.log(rejectMsg);
        });