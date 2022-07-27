const QUERIES = {
  USER:{
  createUserQuery: "INSERT INTO users (email, password) VALUES (?,?)",
  findUserForComparePassword: `SELECT * FROM users WHERE email = ?`,},
  PRODUCT:{
  insertingProduct: `INSERT INTO products (name, price, productImage) VALUES (?, ?, ? );`,
  findProductById : `SELECT * FROM PRODUCTS WHERE productId = ?`,
  modifyingProduct : ` UPDATE products SET name = ?,price = ? WHERE productId = ?`
}
};

module.exports = QUERIES;
