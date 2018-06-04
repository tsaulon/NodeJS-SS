/* 
 * Asynchronous: Once a code has been invoked, it doesn't block the main thread of execution while it's working.
 *               Once complete, an event is triggered and we can write code to work with the result of the asynchronous operation.
 * 
 * **Note: This concept is a lot like multi-threading from C++.
 */

 //output "A" after a random time betwen 0 & 3 seconds
 function outputA()
 {
     var randomTime = Math.floor(Math.random() * 3000) + 1;

     setTimeout(function(){
         console.log("A");
     }, randomTime);
 }

 //output "B" after a random time between 0 & 3 seconds
 function outputB()
 {
     var randomTime = Math.floor(Math.random() * 3000) + 1;

     setTimeout(function(){
         console.log("B");
     }, randomTime);
 }

 //output "C" after a random time between 0 & 3 seconds
 function outputC()
 {
     var randomTime = Math.floor(Math.random() * 3000) + 1;

     setTimeout(function(){
         console.log("C");
     }, randomTime);
 }

 //invoke the functions in order

 outputA();
 outputB();
 outputC();

 // Node.js being asychronous; there is no way to determine at what point each function will finish execution
 // despite being executed at the same time.