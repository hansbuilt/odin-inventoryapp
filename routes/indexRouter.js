const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/category/:category", (req, res) => {
  res.render("category");
});

indexRouter.get("/item/:item", (req, res) => {
  res.render("item");
});

module.exports = { indexRouter };
