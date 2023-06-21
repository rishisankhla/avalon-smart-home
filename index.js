// The index.js file of your application
//importing all the necessary modules
const express = require ("express");
const bodyParser = require ("body-parser");
const app = express();
const mysql = require("mysql");
const port = 8089;

//adding body parser for post queries
app.use(bodyParser.urlencoded({ extended: true }));

//building connection between mysql and our system local-host
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rks000999",
    database: "Avalon_Smart_Home"
});

// connect to database
db.connect((err) => {
 if (err) {
 throw err;
 }
 console.log("Connected to database");
});
global.db = db;

//importing our main.js file to our application
require("./routes/main")(app);

//configuring the CSS file in our application 
app.use(express.static('public'));
app.use('/cc',express.static(__dirname+'public/css'));

//setting the path for views folder, to render our HTML files
app.set("views",__dirname + "/views");

//setting up the EJS template in our app
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

//finally starting the server on port 8089
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
