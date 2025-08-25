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

indexRouter.get("/product/new", async (req, res) => {
  try {
    const data = {};
    const categories = await indexController.getCategories();
    res.render("productForm", { data, categories });
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
  const categories = await indexController.getCategories();

  try {
    const data = await indexController.getProduct(productId);
    res.render("productForm", { data, categories });
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

indexRouter.post("/category/new", async (req, res) => {
  const { category_name } = req.body;
  try {
    const data = await indexController.postNewCategory({
      category_name,
    });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

indexRouter.post("/category/:category_id/edit", async (req, res) => {
  const categoryId = req.params.category_id;
  const { category_name } = req.body;
  // console.log("BODY:", req.body);

  try {
    const data = await indexController.postUpdateCategory(categoryId, {
      category_name,
    });
    res.redirect(`/category/${categoryId}`);
  } catch (err) {
    console.log(err);
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

indexRouter.post("/product/:product_id/delete", async (req, res) => {
  const productId = req.params.product_id;

  try {
    const deleted = await indexController.postDeleteProduct(productId);
    if (deleted === 0) {
      return res.status(404).send("Product not found");
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

indexRouter.post("/category/:category_id/delete", async (req, res) => {
  const categoryId = req.params.category_id;

  try {
    const deleted = await indexController.postDeleteCategory(categoryId);
    if (deleted === 0) {
      return res.status(404).send("Category not found");
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = { indexRouter };
