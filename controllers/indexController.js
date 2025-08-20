const queries = require("../db/queries");

const getCategories = async (req, res) => {
  try {
    const result = await queries.getAllCategories();
    if (!result) return res.status(404).send("No categories returned");
    return result;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

async function getProductsByCategory(categoryId) {
  try {
    const result = await queries.getAllProductsOfCategory(categoryId);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getProduct(productId) {
  try {
    const result = await queries.getSingleProduct(productId);
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getProductsByCategory, getProduct, getCategories };
