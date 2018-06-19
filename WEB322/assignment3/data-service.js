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