const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

const indexController = require("./controllers/indexController");

app.get("/", async (req, res) => {
  try {
    const catData = await indexController.getCategories();
    res.render("index", { catData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app launched - listening on port ${PORT}!`);
});
