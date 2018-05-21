//Custom Modules
var data_service = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var app = express();

//added before routes 
app.use(express.static("public"));

app.get("/", function(req, res){
    //send file using an absolute path name from root.
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/home", function(req, res){
    //call root path
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/departments", function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.json(data_service.getDepartments());
});

app.get("/employees", function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.json(data_service.getEmployees());
});

app.get("/managers", function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.json(data_service.getManagers());
});

app.listen(HTTP_PORT, function(){
    console.log("Express HTTP server listening on port: " + HTTP_PORT);
});
