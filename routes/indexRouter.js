const { Router } = require("express");

const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/category/new", async (req, res) => {
  const catData = {};
  try {
    res.render("categoryForm", { catData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

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

indexRouter.get("/category/:category_id/edit", async (req, res) => {
  const categoryId = req.params.category_id;
  try {
    const catData = await indexController.getCategory(categoryId);

    res.render("categoryForm", { catData });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.get("/product/new", (req, res) => {
  const data = {};
  try {
    res.render("productForm", { data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.get("/product/:product_id", async (req, res) => {
  const productId = req.params.product_id;

  try {
    const data = await indexController.getProduct(productId);
    res.render("product", { data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.get("/product/:product_id/edit", async (req, res) => {
  const productId = req.params.product_id;

  try {
    const data = await indexController.getProduct(productId);
    res.render("productForm", { data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.post("/product/new", async (req, res) => {
  //console.log("BODY:", req.body);
  const {
    sku,
    product_name,
    product_description,
    category_id,
    price,
    product_image,
  } = req.body;

  try {
    const data = await indexController.postNewProduct({
      sku,
      product_name,
      product_description,
      category_id,
      price,
      product_image,
    });
    res.redirect("/");
  } catch (err) {
    console.error("POST /product/new error:", err);
    res.status(500).send("Server error");
  }
});

indexRouter.post("/product/:product_id/edit", async (req, res) => {
  const productId = req.params.product_id;
  const {
    sku,
    product_name,
    product_description,
    category_id,
    price,
    product_image,
  } = req.body;

  try {
    const data = await indexController.postUpdateProduct(productId, {
      sku,
      product_name,
      product_description,
      category_id,
      price,
      product_image,
    });
    res.redirect(`/product/${productId}`);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = { indexRouter };
