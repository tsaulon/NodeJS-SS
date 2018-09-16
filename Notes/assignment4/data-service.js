var path = require("path");

var employees = [];
var departments = [];

//fill global array variables
module.exports.Initialize = () => {
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

module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        (employees.length > 0) ? resolve(employees) : reject("Array is empty.");
    });
}

module.exports.getManagers = () => {
    return new Promise((resolve, reject) => {
        (employees.length > 0) ? resolve(employees.filter(x => x.isManager == true)) : reject("Array is empty.");
    });
}

module.exports.getDepartments = () => {
    return new Promise((resolve, reject) => {
        (departments.length > 0) ? resolve(departments) : reject("Array is empty.");
    });
}

module.exports.addEmployee = data => {
    return new Promise((resolve, reject) => {
        try{
            data.isManager = (data.isManager == undefined) ? false : true;
            data.employeeNum  = employees.length + 1;
            employees.push(data);
            resolve("Employee succesfully added!"); 
        } catch(e){
            reject(e);
        }

    });
}

module.exports.getEmployeesByStatus = status => {
    return new Promise((resolve, reject) => {

        if(employees.length === 0){
            reject("No results returned.");
        } else{
            resolve(employees.filter(x => {
                return x.status == status;
            }));      
        }

    });
}

module.exports.getEmployeesByDepartment = dept => {
    return new Promise((resolve, reject) => {

        if(employees.length === 0){
            reject("No results returned.");
        } else{
            resolve(employees.filter(x => {
                return x.department == dept;
            }));
        }
    });
}

module.exports.getEmployeesByManager = manager => {
    return new Promise((resolve, reject) => {

        if(employees.length === 0){
            reject("No results returned.");
        } else{
            resolve(employees.filter(x => {
                return x.employeeManagerNum == manager
            }));
        }
    });
}

module.exports.getEmployeeByNum = num => {
    return new Promise((resolve, reject) => {

        if(employees.length === 0){
            reject("No results returned.");
        } else{
            resolve(employees.filter(x => {
                return x.employeeNum == num;
            }));
        }
    });
}

module.exports.updateEmployee = data => {
    return new Promise((resolve, reject) => {
        try{
            employees[data.employeeNum - 1] = data;
            resolve();
        } catch(e){
            reject(e.message);
        } 
    });
}