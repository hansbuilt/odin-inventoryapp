const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllProductsOfCategory(category_id) {
  const { rows } = await pool.query(
    "SELECT p.id as product_id, p.sku, p.product_name, p.product_description, c.id as category_id, c.category_name FROM products as p inner join categories as c on c.id = p.category_id WHERE c.id = $1;",
    [category_id]
  );
  return rows;
}

async function getCategoryDims(category_id) {
  const { rows } = await pool.query(
    "SELECT id, category_name FROM categories WHERE id = $1;",
    [category_id]
  );
  return rows;
}

async function getSingleProduct(id) {
  const { rows } = await pool.query(
    "SELECT p.*, c.category_name FROM products as p inner join categories as c on c.id = p.category_id  WHERE p.id = $1;",
    [id]
  );
  return rows;
}

module.exports = {
  getAllCategories,
  getAllProductsOfCategory,
  getSingleProduct,
  getCategoryDims,
};
