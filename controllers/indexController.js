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

async function postNewProduct({
  sku,
  product_name,
  product_description,
  category_id,
  price,
  product_image,
}) {
  try {
    const result = await queries.createSingleProduct({
      sku,
      product_name,
      product_description,
      category_id,
      price,
      product_image,
    });
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function postUpdateProduct(
  id,
  { sku, product_name, product_description, category_id, price, product_image }
) {
  try {
    const result = await queries.updateProduct(id, {
      sku,
      product_name,
      product_description,
      category_id,
      price,
      product_image,
    });
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function postNewCategory({ category_name }) {
  try {
    const result = await queries.createCategory({
      category_name,
    });
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function postUpdateCategory(id, { category_name }) {
  try {
    const result = await queries.updateCategory(id, {
      category_name,
    });
    return result;
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
  postNewProduct,
  postUpdateProduct,
  postNewCategory,
  postUpdateCategory,
};
