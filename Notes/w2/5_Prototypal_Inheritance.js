function architect(setName, setAge){
    this.name = setName;
    this.age = setAge;
    this.occupation = "architect";
}

architect.prototype.setName = function(newName){this.name = newName;};
architect.prototype.setAge = function(newAge){this.age = newAge;};
architect.prototype.getName = function(){return this.name;};
architect.prototype.getAge = function(){return this.age;};

/* Note: all instances of architect refer to the same prototype.
 * It is in a way a sort of base which every instance of architect
 * refers to. Any future properties or method changes will be updated
 * for all instances related to that prototype. Similar to static keyword
 * in C++; having all instances of a class share the same memory space for
 * properties using the static keyword.
 * 
 * Also, this is how we verify prototype changes using the built-in Object.getPrototypeof() function.
 */

var architect2 = new architect("Brandon", 22);

 console.log(architect2);
 console.log(Object.getPrototypeOf(architect2));

// Note: This is how we add methods to architect prototype for architect2 variable to use...

//add new method to architect prototype
 architect.prototype.newMethod = function(){
     return "This is a new method for " + this.name;
 }

 console.log(architect2.newMethod());

 //verify changes...
 console.log(Object.getPrototypeOf(architect2));