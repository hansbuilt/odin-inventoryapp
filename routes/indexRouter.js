const { Router } = require("express");

const itemData = {
  1: {
    id: "1",
    sku: "test",
    product_name: "test_name",
    product_description: "test_desc test_desc test_desc test_desc",
    category_id_fk: "22",
    price: "$9.99",
    product_image: "TBD",
  },
};
const catData = [
  {
    id: "22",
    category_name: "test_cat22",
  },
  { id: "33", category_name: "test_cat33" },
];

const indexRouter = Router();

indexRouter.get("/category/:category", (req, res) => {
  res.render("category");
});

indexRouter.get("/item/:item", (req, res) => {
  const itemID = req.params.item;
  const item = itemData[itemID];
  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("item", { item });
});

module.exports = { indexRouter, itemData, catData };
