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
    res.send("<h1>Welcome to my simple website</h1><p>Be sure to visit the <a href='/headers'>headers page</a> to see what headers were sent from your browser to the server!</p><img src='static/za-warudo.gif' alt='za-warudo'>");
});

app.get("/headers", (req, res) => {
    const headers = req.headers;
    res.send(headers);
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