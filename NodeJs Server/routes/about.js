module.exports = function(req, res) {
  let db = this;
  let movies = db.collection("movieDetails");
  movies
    .find({genres: "Comedy"}, { limit: 10 })
    .toArray()
    .then(result => {
      res.render(`about`, { data: JSON.stringify(result) });
    });
};
