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

/*
architect.prototype.outputNameDelay = function(){
    setTimeout(function(){
        console.log(this.name);
    }, 1000);
};

architect2.outputNameDelay();
*/

//Output of above code is undefined becuase of "this" keyword.
//"this" holds a reference to the "context" of the function.
/*
 * ...because setTimeout() is a built-in function is not executed as a method of 
 * our architect object, "this" keyword does not point to any "context"
 * within the scope of setTimeout(). Contrary, using "this" within the
 * prototype object method will point to the "context" of the object invoked.
 * 
 * Note: arrow-function syntax is a solution to this issue. (Along with many others).
 */


architect.prototype.outputNameDelay = function(){

    var that = this;    //member function local variable that references the current object.

    setTimeout(function(){
        console.log(that.name); //references "context" of the current object.
    }, 1000);
};

architect2.outputNameDelay();