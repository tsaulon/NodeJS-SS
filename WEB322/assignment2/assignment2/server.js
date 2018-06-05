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
    data_service.getDepartments().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data)    //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    );
});

app.get("/employees", function(req, res){
    data_service.getAllEmployees().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data)    //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    );
});

app.get("/managers", function(req, res){
    data_service.getManagers().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data);     //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    )
});

//Initialize the server only if data_service.Initialize() is successful.
data_service.Initialize().then(
    function(data){
        console.log(data);

        //resolved
        app.listen(HTTP_PORT, function(){
            console.log("Express HTTP server listening on port: " + HTTP_PORT);
        });
    }
).catch(

    //rejected
    function(data){
        console.log(data);
    }
);
