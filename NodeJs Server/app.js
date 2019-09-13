const express = require("express");
const app = express();
const port = 9000;
const homeRoute = require("./routes/home");
const docsRoute = require("./routes/docs");
const aboutRoute = require("./routes/about");
const subscribeRoute = require("./routes/subscribe");
const MongoClient = require("mongodb").MongoClient;

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

MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  let db = client.db("video");
  let movies = db.collection("movieDetails");
  app.get("/", docsRoute.bind(db));

  app.get("/home", homeRoute.bind(db));

  app.get("/about", aboutRoute.bind(db));

  app.post("/subscribe", subscribeRoute.bind(db));
  app.get("/app/movies", (req, res) => {
    console.log(req.query);
    let limit = Number(req.query.limit || 10);
    let skip = Number(req.query.skip || 0);
    let search = req.query.search || "";
    movies
      .find(
        { title: { $regex: search, $options: "i" } },
        { limit: limit, skip: skip }
      )
      .toArray()
      .then(data => {
        res.send(data);
      });
  });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
