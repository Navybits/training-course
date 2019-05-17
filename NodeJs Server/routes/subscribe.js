module.exports = (req, res) => {
  console.log(req.body);
  let email = req.body.subscribe;
  res.render("subscribe", { email });
};
