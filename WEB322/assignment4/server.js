//Custom Modules
var data_service = require("./data-service.js");

const HTTP_PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const multer = require("multer");
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");   //allow for reading of dir contents

app.use("/public", express.static(path.join(__dirname, "/public")));  //allow access to static "public" resources

app.use(bodyParser.urlencoded({extended: true}));
const uploadDIR = "./public/images/uploaded";
const storage = multer.diskStorage({    //setup storage destination and creation of filenames.
    destination: uploadDIR,
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});    //tell multer to use diskStorage func for naming files


const exphbs = require("express-handlebars");   //install handlebars
app.engine(".hbs", exphbs({extname: ".hbs", defaultLayout: "main"}));  //tell engine to use exphbs when handling ".hbs" extensions
app.set("view engine", ".hbs");


app.get("/", (req, res) => {
    //send file using an absolute path name from root.
    res.render(path.join(__dirname, "/views/home.hbs"));
});

app.get("/home", (req, res) => {
    //call root path
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render(path.join(__dirname, "/views/about.hbs"));
});

app.get("/departments", (req, res) => {
    data_service.getDepartments().then( data => {
        res.setHeader("Content-Type", "application/json");
        res.json(data)    
    }).catch(console.err);
});

app.get("/employees", (req, res) => {
    //  When url contains optional filters like '/employees?status=Full%20Time' 
    //  reference req.query.[name of option] to access the filter requested

    //check if length of keys inside object is 0
    if(Object.keys(req.query).length != 0){        
        
        if(req.query.status){
            //if a status filter has been requested...
            data_service.getEmployeesByStatus(req.query.status).then(data => {
                res.json(data);
            }).catch(console.err);
        } else if(req.query.department){
            //if a department filter has been requested...
            data_service.getEmployeesByDepartment(req.query.department).then(data => {
                res.json(data);
            }).catch(console.err);
        } else if(req.query.manager){
            //if a manager filter has been requested...
            data_service.getEmployeesByManager(req.query.manager).then(data => {
                res.json(data);
            })
        }

    } else{
        data_service.getAllEmployees().then( data => {
            res.setHeader("Content-Type", "application/json");
            res.json(data)    
        }).catch(console.err); 
    }    
});

app.get("/employee/:value", (req, res) => {
    data_service.getEmployeeByNum(req.params.value).then(data => {
        res.json(data);
    }).catch(console.err);
});

app.get("/managers", (req, res) => {
    data_service.getManagers().then( data => {
        res.setHeader("Content-Type", "application/json");
        res.json(data);     //resolved
    }).catch(console.err);
});

app.get("/employees/add", (req, res) => {
    res.render(path.join(__dirname, "/views/addEmployee.hbs"));
});

app.post("/employees/add", (req, res) => {
    data_service.addEmployee(req.body).then(data => {
        console.log(data);
    }).catch(console.err);

    res.redirect("/employees");
});

app.get("/images/add", (req, res) => {
    res.render(path.join(__dirname, "/views/addImage.hbs"));
});

app.post("/images/add", upload.single("imageFile"), (req, res) => {
    res.redirect("/images");
});

app.get("/images", (req, res) => {
    //read contents of directory 'uploadDIR'
    //respond with contents in JSON format.
    fs.readdir(uploadDIR, (err, items) => {
        res.setHeader("Content-Type", "application/json");
        res.json({images: items});
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
