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

async function createSingleProduct({
  sku,
  product_name,
  product_description,
  category_id,
  price,
  product_image,
}) {
  const { rows } = await pool.query(
    `INSERT INTO products (sku, product_name, product_description, category_id, price, product_image)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [sku, product_name, product_description, category_id, price, product_image]
  );
  return rows[0];
}

async function createCategory({ category_name }) {
  const { rows } = await pool.query(
    `INSERT INTO categories (category_name) VALUES ($1) RETURNING *;`,
    [category_name]
  );
  return rows[0];
}

async function updateProduct(
  id,
  { sku, product_name, product_description, category_id, price, product_image }
) {
  const { rows } = await pool.query(
    `UPDATE products
     SET sku = $1,
         product_name = $2,
         product_description = $3,
         category_id = $4,
         price = $5,
         product_image = $6
     WHERE id = $7
     RETURNING *;`,
    [
      sku,
      product_name,
      product_description,
      category_id,
      price,
      product_image,
      id,
    ]
  );
  return rows[0];
}

async function updateCategory(id, { category_name }) {
  const { rows } = await pool.query(
    `UPDATE categories
     SET campaign_name = $1,
         
     WHERE id = $2
     RETURNING *;`,
    [category_name, id]
  );
  return rows[0];
}

async function deleteSingleProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1;", [id]);
  return result.rowCount;
}

async function deleteSingleCategory(id) {
  const result = await pool.query("DELETE FROM categories WHERE id = $1;", [
    id,
  ]);
  return result.rowCount;
}

module.exports = {
  getAllCategories,
  getAllProductsOfCategory,
  getSingleProduct,
  getCategoryDims,
};
