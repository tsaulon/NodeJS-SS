var path = require("path");

module.exports.getEmployees = function(){
    //setting variable to contents of .json file
    //Note: "require" is synchronous and only reads the file once, following calls return the results from cache.
    var employees = require(path.join(__dirname, "/data/employees.json"));

    return employees;
};

module.exports.getDepartments = function(){
    var departments = require(path.join(__dirname, "/data/departments.json"));

    return departments;
}

module.exports.getManagers = function(){
    var managers = require(path.join(__dirname, "/data/employees.json"));
    
    return managers[0];
}

//TODO: Resolve correct implementations for the above functions.
//      Read over rest of week 3 for advanced JavaScript.