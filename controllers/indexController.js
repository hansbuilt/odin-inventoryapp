const queries = require("../db/queries");

async function getCategories() {
  try {
    const result = await queries.getAllCategories();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getProductsByCategory(categoryId) {
  try {
    const result = await queries.getAllProductsOfCategory(categoryId);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getCategory(categoryId) {
  try {
    const result = await queries.getCategoryDims(categoryId);
    return result[0];
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

module.exports = {
  getProductsByCategory,
  getProduct,
  getCategories,
  getCategory,
};
