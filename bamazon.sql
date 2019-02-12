DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(75),
    department_name VARCHAR(75),
    price DECIMAL(10, 2),
    stock_quantity INT,
    product_sales DECIMAL(10, 2),
    PRIMARY KEY(item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES
("Iwatch", "Smartwatches", 399.99, 8, 250),
("Toothbrush", "Personal Care", 1.99, 125, 750),
("Shampoo", "Personal Care", 8.55, 80, 150),
("apple", "food", 1.00, 100, 300),
("Hat", "Clothing   ", 12.99, 4, 80),
("shoes", "Clothing", 123.99, 25, 120),
("Headphone", "Electronics", 189.99, 1, 200),
("TV", "Electronics", 599.99, 3, 50),
("Table", "Furniture", 170.99, 2, 600),
("toliet paper", "Household", 24.50, 60, 600);