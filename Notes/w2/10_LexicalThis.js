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

architect.prototype.outputNameDelay = function(){
    var that = this;
    setTimeout(function(){
      console.log(that.name);
    },1000);
  };

  //allows for the same output as .outputNameDelay() above without declaring a new variable in the function scope
architect.prototype.outputNameDelayArrow = function(){
    setTimeout(() => {console.log(this.name); }, 1000);
};

architect1.outputNameDelay();
architect1.outputNameDelayArrow();

/*  WARNING:  > Not every situation calls for a "lexical this"
              > Arrow functions DO NOT have any notion of the arguments object
              > Arrow functions cannot be used as a function constructor and will throw an error
                when using the new operator.

    From my understanding:
    >   arrow notation to be used when passing functions as a parameter and variable declarations
    >   NOT TO BE USED to initialize object member functions.
*/
var testobj1 = {
    a: "a",
    b: () => console.log(this.a)
}

testobj1.b(); //undefined

var testobj2 = {
    a: "a",
    b: function() { console.log(this.a); }
}

testobj2.b(); //"a"