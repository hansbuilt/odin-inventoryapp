const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/:category", (req, res) => {
  console.log(req.params);
  res.end();
});

indexRouter.get("/:item", (req, res) => {
  console.log(req.params);
  res.end();
});

module.exports = { indexRouter };
