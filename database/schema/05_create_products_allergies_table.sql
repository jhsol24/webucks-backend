CREATE TABLE products_allergies
(
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  allergy_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (allergy_id) REFERENCES allergies (id)
);