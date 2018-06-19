//Custom Modules
var data_service = require("./data-service.js");

const HTTP_PORT = process.env.PORT || 8080;
const multer = require("multer");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");   //allow for reading of dir contents

//setup storage destination and creation of filenames.
const storage = multer.diskStorage({
    destination: "./public/images/uploaded",
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//tell multer to use diskStorage func for naming files
var upload = multer({storage: storage});

//added before routes 
//allow access to static "public" resources
app.use(express.static("public"));

app.get("/", (req, res) => {
    //send file using an absolute path name from root.
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/home", (req, res) => {
    //call root path
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/departments", (req, res) => {
    data_service.getDepartments().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data)    //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    );
});

app.get("/employees", (req, res) => {
    data_service.getAllEmployees().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data)    //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    );
});

app.get("/managers", (req, res) => {
    data_service.getManagers().then(
        (data) => {
            res.setHeader("Content-Type", "application/json");
            res.json(data);     //resolved
        }
    ).catch(
        (data) => console.log(data) //rejected
    )
});

app.get("/employees/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"));
});

app.get("/images/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addImage.html"));
});

//
app.post("/images/add", upload.single("imageFile"), (req, res) => {
    res.redirect("/images");
});

app.get("/images", (req, res) => {
    fs.readdir("./public/images/uploaded", (err, items) => {
        res.setHeader("Content-Type", "application/json");
        res.json(items);
    });
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
