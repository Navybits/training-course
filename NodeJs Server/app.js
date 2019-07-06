const express = require("express");
const app = express();
const port = 9000;
const homeRoute = require("./routes/home");
const docsRoute = require("./routes/docs");
const aboutRoute = require("./routes/about");
const subscribeRoute = require("./routes/subscribe");
var unirest = require("unirest");
// unirest
//   .get("https://restcountries-v1.p.rapidapi.com/name/lebanon")
//   .header("X-RapidAPI-Host", "restcountries-v1.p.rapidapi.com")
//   .header(
//     "X-RapidAPI-Key",
//     "0aba62eb3amsh37ba8989f351dcdp1fd798jsna1151eafc326"
//   )
//   .end(function(result) {
//     console.log(result.status, result.headers, result.body);
//     unirest
//       .get(
//         "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=200&lng=" +
//         result.body[0].latlng[1] +
//           "&lat=" +
//           result.body[0].latlng[0]
//       )
//       .header("X-RapidAPI-Host", "cometari-airportsfinder-v1.p.rapidapi.com")
//       .header(
//         "X-RapidAPI-Key",
//         "0aba62eb3amsh37ba8989f351dcdp1fd798jsna1151eafc326"
//       )
//       .end(function(result) {
//         console.log({ result : result.body });
//       });
//   });
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

app.get("/", docsRoute);

app.get("/home", homeRoute);

app.get("/about", aboutRoute);

app.post("/subscribe", subscribeRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
