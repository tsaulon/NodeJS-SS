//Creating Objects (Object Literal Notation)
//'this' keyword points to object's properties and not variables in the global scope
var architect = {   name: "Tyrone",
                    age: 23,
                    occupation: "Architect",
                    setAge: function(x){ this.age = x; },
                    setName: function(x){this.name = x; },
                    introduce: function(){ return "Hello, my name is " + this.name + " and I am " + this.age}
                }

console.log(architect.introduce());
architect.setName("Ainsley");
architect.setAge(22);
console.log(architect.introduce());

//Creating 'more' objects with the same properties and methods (clone)

var architect1 = Object.create(architect);
var architect2 = Object.create(architect);

architect2.setName("Clarence");
architect2.setAge(62);

//Object properties can be publicly accessed (Similar to structs in C/C++).
console.log(architect1.name);
console.log(architect2.name); 