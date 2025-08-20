const { Router } = require("express");

const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/category/:category_id", async (req, res) => {
  const categoryId = req.params.category_id;
  try {
    const prodData = await indexController.getProductsByCategory(categoryId);
    const catData = await indexController.getCategory(categoryId);

    res.render("category", { prodData, catData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.get("/product/:product_id", async (req, res) => {
  const productId = req.params.product_id;

  try {
    const data = await indexController.getProduct(productId);
    console.log(data);
    res.render("product", { data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = { indexRouter };
