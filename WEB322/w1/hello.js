
//setTimeout() obejct demo.
setTimeout(function(){
    console.log("setTimeout();   -   Hello after 1 second");
}, 1000);

//setInterval() object demo.
var count = 1;
var maxCount = 5;

var myCountInterval = setInterval(function(){
    console.log("setInterval();     -   Hello after " + (count++) + " seconds");
    checkMax();
}, 1000);

var checkMax = function(){
    if(count > maxCount){
        clearInterval(myCountInterval)
    }
}


//__dirname (name of directory that the current executing script is inside.)
console.log(__dirname);

//__filename (name of file being executed.)
console.log(__filename);