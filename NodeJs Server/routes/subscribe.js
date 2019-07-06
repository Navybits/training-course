module.exports = (req, res) => {
  console.log(req.body);
  res.render("subscribe", 
  { email: req.body.subscribe,
     x: "Nice!" });
};
