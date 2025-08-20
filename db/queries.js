const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllProductsOfCategory(category_id) {
  const { rows } = await pool.query(
    "SELECT * FROM products as p inner join categories as c on c.id = p.category_id WHERE c.id = $1;",
    [category_id]
  );
  return rows;
}

async function getSingleProduct(id) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1;", [
    id,
  ]);
  return rows;
}

module.exports = {
  getAllCategories,
  getAllProductsOfCategory,
  getSingleProduct,
};
