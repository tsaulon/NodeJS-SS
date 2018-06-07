var HTTP_PORT = process.env.PORT || 8080;

var path = require("path");
var express = require("express");
var app = express();    // !IMPORTANT Application Object [Core Object]

//setup static folder static resources can load from.
//seaches for a directory with the name static.
//files can now be access in the browser with the '/static/' prefix.
app.use("/static", express.static(path.join(__dirname, "/static")));


//Any GET requests made to "localhost:8080/"" are routed to this function
app.get("/", (req, res) => {    //!IMPORTANT req (Request Object) & res (Response Object) [Core Object]
    res.send("<h1>Welcome to my simple website</h1><p>Be sure to visit the <a href='/headers'>headers page</a> to see what headers were sent from your browser to the server!</p><img src='static/za-warudo.gif' alt='za-warudo'><a href='/form'>Check out my form!</a>");
});

app.get("/headers", (req, res) => {
    const headers = req.headers;
    res.send(headers);
});

/************************************
 *  HANDLING FORMS WITH EXPRESS.JS  *
 ************************************/

 //allow static resources from public to be used.
app.use(express.static("public/"));

//!IMPORTANT    >Multer is only needed when dealing with file uploads and multipart/form-data.
//              >Simple text form data should use body-parser library.
//              >Refer to WEB322 week5: [http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week5-class1/]
var multer = require("multer");

// multer requires a few options to be setup to store files with file extensions
// by default it won't store extensions for security reasons
const storage = multer.diskStorage({
    destination: "./public/photos/",
    filename: function(req, file, cb) {
        // we write the filename as the current date down to the millisecond
        // in a large web service this would possibly cause a problem if two people
        // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
        // this is a simple example.
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({storage: storage});

app.get("/form", (req, res) => {
    //create absolute path to static html file as argument.
    res.sendFile(path.join(__dirname, "views/my-form.html"));   //templates are kept inside a views folder
});

app.post("/register-user", upload.single("photo"), (req, res) => {

    const formData = req.body;  //data taken from request body
    const formFile = req.file;  //file upload taken from request file

    const dataReceived =    "Your submission was received: <br /><br />" +
                            "Your form data was: <br />" + JSON.stringify(formData) + "<br /><br />" +  //JSON.stringify to convert JSON data to string
                            "Your file data was: <br />" + JSON.stringify(formFile) +
                            "<br /><p>This is the image you sent: <br /> <img src='/photos/" + formFile.filename + "'/>";

    res.send(dataReceived);
});

/*
 * Error Handling is typically done through middleware.
 * Types of middleware: Application > Router > Error Handling > Built-in > Third Party
 * !IMPORTANT    >Writing a middleware function with 4 params will be interpreted by express as an error handler function.
 *               >Calling next() will invoke next error handler in the chain.
 *               >Sending a response will terminate the chain.
 */

 //Example of common error handling procedures:
 function handleClientError(err, req, res, next){
     //log error to the DB with a utility method to log errors.
     logError(err);

     //if the request was an xhr request respond with a 500 status and JSON message
     //otherwise respond with a string message.
     if(req.xhr){
         res.status(500).send({message: "There was an error processing your request"});
     } else{
         res.status(500).send("Something went wrong processing your request");
     }
 }


// This function catches all requests to routes that don't exist
// Used to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found.");
});

app.listen(HTTP_PORT, () => {
    console.log("Server Started! Listening on port " + HTTP_PORT);
});


//FINAL NOTES:
//              >IMPORTANT TO VALIDATE BOTH CLIENT SIDE ANNNNNND SERVER SIDE DATA!!