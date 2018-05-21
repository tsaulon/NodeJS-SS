//  Advanced powerful method for creating complex objects use:
//  - "Function Constructors"
//  - "new" keyword


function myObjInit(initVal){
    this.objectProperty = initVal;
}

//add methods to the myObjInit function prototype
//prototyped properties affect all objects of the same constructor, simultaneously, even if they already exist
//  !More notes on prototype: https://johnresig.com/apps/learn/#64
myObjInit.prototype.objectMethod = function(){return this.objectProperty};

//create a new object and init the objectProperty
var myObject = new myObjInit("Hello");

//execute the objectMethod on the new object.
console.log(myObject.objectMethod()); // "Hello"

function architect(setName, setAge){
    this.name = setName;
    this.age = setAge;
    this.occupation = "architect";
}

architect.prototype.setName = function(newName){this.name = newName;};
architect.prototype.setAge = function(newAge){this.age = newAge;};
architect.prototype.getName = function(){return this.name;};
architect.prototype.getAge = function(){return this.age;};

var architect1 = new architect("Chantelle", 22);
var architect2 = new architect("Brandon", 22);

console.log(architect1.name); //"Chantelle"

console.log(architect1.getName()); //"Chantelle"
console.log(architect2.getName()); //"Brandon"
