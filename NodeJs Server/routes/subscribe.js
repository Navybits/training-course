module.exports = function(req, res) {
  let db = this;
  console.log(req.body);
  res.render("subscribe", { email: req.body.subscribe, x: "Nice!" });
};
