module.exports = function(req, res) {
  let db = this;
  console.log({ db });
  return res.render("home");
};
