const express = require("express");
const app = express();
const port = 9000;
const homeRoute = require("./routes/home");
const aboutRoute = require("./routes/about");
const subscribeRoute = require("./routes/subscribe");

// Adding templating engice
app.set("view engine", "html");
app.set("views", __dirname + "/views");
const nunjucks = require("nunjucks");
var env = nunjucks.configure("views", {
  autoescape: true,
  express: app
});

// Adding body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Adding static folder
app.use("/static", express.static(__dirname + "/static"));

app.get("/home", homeRoute);

app.get("/about", aboutRoute);

app.post("/subscribe", subscribeRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
