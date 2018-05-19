var express = require("express");
var HTTP_PORT = process.env.PORT || 8080;
var app = express();

//setup a "route" to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//setup http server to listen to HTTP_PORT
app.listen(HTTP_PORT, function(){
    console.log("Server Started...");
});