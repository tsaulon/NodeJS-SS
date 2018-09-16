//Function Closures
function counter(){
    var localCounter = 0;

    return function(){
        //change the value of local counter semi-perminently
        //localCounter increments and stays incremented even after we leave the scope of the counter() function.
        localCounter++;
        return localCounter;
    }
}

var count = counter();

console.log(count()); //1
console.log(count()); //2
console.log(count()); //3

//Creating Objects using function closures.
//Implementing OOP practices for encapsulation.
//Object properties are privatized by function keyword
function architect(setName, setAge){
    var name = setName;
    var age = setAge;
    var occupation = "architect";

    //returns a constructed object from function closure.
    return {
        setName: function(newName){name = newName},
        setAge: function(newAge){age = newAge},
        getName: function(){return name},
        getAge: function(){return age}
    }
}

var architect1 = architect("Joe", 34);
var architect2 = architect("Bill", 20);

//Member properties are private
console.log(architect1.name); //undefined

//Uses object functions to retrieve data.
console.log(architect1.getName());
console.log(architect2.getName());

//This design allows for privatization of data but does not actually hold data