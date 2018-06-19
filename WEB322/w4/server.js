const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
const path = require("path");
const handlebars = require("express-handlebars");   /*  <-- Enables use of static template files in application. 
                                                     *  At runtime, the template engine replaces variables in a template with actual values,
                                                     *  and transforms into an HTML file sent to the client. This approach makes it easier to
                                                     *  design an HTML page
                                                     */

//Server needs to know how to handle HTML files that are formatted using handlebars
//Tell server that any file with the .hbs file extension will use the handlebars template engine
//Tell server to use "main" as the default layout
//If we don't want to use default layout refer to route: ""
app.engine(".hbs", handlebars({extname: ".hbs", defaultLayout: "main", helpers: {
        strong: function(options){
            //helper without "context", ie {{#helper}} ... {{/helper}}
            /*  Options parameter helper:
             *  'options' obj has a property 'fn' which is a method that refers to the content within the helper.
             *  By invoking the method with the "this" keyword we ensure that the context is set for any other helpers that are nested inside.
             *  'options.fn()' returns the correct content  */

             return `<strong>${options.fn(this)}</strong>`;
        },
        list: function(context, options){
            //helper with "context, ie {{#helper context}} ... {{/helper}}
            /*  Context and options parameter helper:
             *  This type of helper is used to create iterative helpers that work with collections of data (Similar to #each)
             *  >'context' refers to the object passed into the helper (e.g. {{#helperName context}})   */

             var list = "<ul>";

             for(var i = 0; i < context.length; i++)
                list += `<li>${options.fn(context[i])}</li>`;

            return list + "</ul>";
        }
    }
}));

app.set("view engine", ".hbs");

//Global variable                                                     
var someData = [{
    name: "Ainsley",
    age: 22,
    occupation: "Supply Teacher",
    company: "Ikea",
    visible: true,   //alternate to see results in '/viewData-hbs' route
    contract: false
},
{
    name: "Tyrone",
    age: 23,
    occupation: "baby daddy",
    company: "Atlas & Ainsley",
    visible: true,   //alternate to see results in '/viewData-hbs' route
    contract: false
}];                            

//sending JSON formatted data (Important when AJAX and RESTful APIs are introduced.)
app.get("/getData", (req, res) => {
    res.json(someData);
});

//Returning a valid HTML5 page to the client that actually references some data stored on the server (First Solution)
//Not the best approach...
app.get("/viewData-html", (req, res) => {

    var htmlString =    `<!DOCTYPE html>
                            <html>
                                <head>
                                    <title>View Data</title>
                                </head>
                                <body>
                                    <table border='1'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Occupation</th>
                                            <th>Company</th>
                                        </tr>
                                        <tr>
                                            <th>${someData.name}</th>
                                            <th>${someData.age}</th>
                                            <th>${someData.occupation}</th>
                                            <th>${someData.company}</th>
                                        </tr>
                                    </table>
                                </body>
                            </html>`;

    res.send(htmlString);
});

//Second solution using handlebars-JS   
//renders viewData.hbs inside views and passes 'someData' as data for template to pull data from.
app.get("/viewData-hbs", (req, res) => {
    res.render("viewData", {
        data: someData
        //layout: false     --> Add this to not render layout
        //layout: "otherLayout" --> We can also add this to reference another layout
    });
}); 

app.listen(HTTP_PORT, () => {
    console.log(`Server started! Listening on port ${HTTP_PORT}`);
});