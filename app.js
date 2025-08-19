const express = require("express");
const app = express();
const path = require("node:path");
const {
  indexRouter: indexRouter,
  itemData,
  catData,
} = require("./routes/indexRouter");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.render("index", { catData: catData });
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app launched - listening on port ${PORT}!`);
});
