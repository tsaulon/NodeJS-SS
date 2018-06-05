/*

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

*/
var path = require("path");

var employees = [];
var departments = [];

//fill global array variables
module.exports.Initialize = () =>
{
    return new Promise((resolve, reject) => {
        try{
            employees = require(path.join(__dirname, "/data/employees.json"));
        }catch(e)
        {
            reject("Error occured: " + e.message);
        }
    
        try{
            departments = require(path.join(__dirname, "/data/departments.json"));
        }catch(e)
        {
            reject("Error occured: " + e.message);
        }
        
        resolve("Initialization successful!");
    });
}

module.exports.getAllEmployees = () =>
{
    return new Promise((resolve, reject) => {
        (employees.length > 0) ? resolve(employees) : reject("Array is empty.");
    });
}

module.exports.getManagers = () =>
{
    return new Promise((resolve, reject) => {
        (employees.length > 0) ? resolve(employees.filter(x => x.isManager == true)) : reject("Array is empty.");
    });
}

module.exports.getDepartments = () =>
{
    return new Promise((resolve, reject) => {
        (departments.length > 0) ? resolve(departments) : reject("Array is empty.");
    });
}