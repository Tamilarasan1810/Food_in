/*SHOW DATABASES;*/
USE FOODIN;
/*CREATE TABLE SHOPS(shopId VARCHAR(20) PRIMARY KEY UNIQUE,shopName VARCHAR(20), rating float(5));*/
/*SELECT * FROM SHOPS;*/
/*INSERT INTO SHOPS (shopId,shopName,rating)VALUES("S0003","SS Biriyani",4.4);*/


/*CREATE TABLE orders (orderId VARCHAR(20)  PRIMARY KEY,shopId VARCHAR(20), userId VARCHAR(20), productId VARCHAR(20), name VARCHAR(50), qty INTEGER(10),FOREIGN KEY(shopId) REFERENCES shops(shopId),FOREIGN KEY(userId) REFERENCES users(userId), FOREIGN KEY (productId) REFERENCES product(productId));*/

/*CREATE TABLE users(userId VARCHAR(20) PRIMARY KEY UNIQUE, name VARCHAR(30), mobileNo INTEGER(10),password VARCHAR(100));*/
/*INSERT INTO users (userId, name, mobileNo, password) VALUES ("U0003","chicken",723454879,"chickenWay");*/
/*SELECT * FROM users;*/

/*CREATE TABLE product(productId VARCHAR(20) PRIMARY KEY, name VARCHAR(50), shopId VARCHAR(20), category VARCHAR(20), review VARCHAR(1000),rating FLOAT(5),FOREIGN KEY (shopId) REFERENCES shops(shopId));*/

/*DROP TABLE orders;*/

/*SHOW TABLES;*/
/*DESCRIBE allOrders;*/

/*ALTER TABLE product ADD  price INTEGER(5);*/
/*INSERT INTO product(productId,name,price,shopId,category)VALUES("P0008","Chicken Biriyani",200,"S0003","NON-VEG");*/

/*ALTER TABLE orders ADD dateTime DATETIME;*/

/*INSERT INTO orders(orderId,shopId,userId,productId,name,qty,dateTime) VALUES("O0001" );*/


/*CREATE TABLE orders(orderId VARCHAR(20) PRIMARY KEY, shopId VARCHAR(20), userId VARCHAR(20), dateTime DATETIME,FOREIGN KEY(shopId) REFERENCES shops(shopId), FOREIGN KEY(userId)REFERENCES users(userId) );*/

/*CREATE TABLE allOrders (orderId VARCHAR(20) , productId VARCHAR(20), qty INTEGER(5), price INTEGER(5), FOREIGN KEY(productId) REFERENCES product(productId),FOREIGN KEY(orderId) REFERENCES orders(orderId));*/

/*DESCRIBE allOrders;*/

/*INSERT INTO orders (orderId, shopId, userId, dateTime)VALUES("O0001","S0001","U0001",NOW());*/

/*INSERT INTO allOrders(orderId, productId, qty, price) VALUES("O0001","P0002",1,40);*/
/*delete from allOrders where productId="P0002";*/
/*UPDATE product SET rating=4.2 where shopId='S0001';*/
/*SELECT * FROM product WHERE shopId = 'S0001';*/
SELECT * FROM product;
/*DESCRIBE product;*/
/*SELECT * FROM product WHERE shopId ="S0001"*/
SELECT * FROM allorders;
SELECT * FROM orders;

SELECT MAX(orderId) FROM orders;
SELECT CONCAT('O', LPAD(MAX(CAST(SUBSTRING(orderId, 2) AS UNSIGNED)) + 1, 4, '0')) AS new_value FROM orders;
SELECT * FROM orders;
SELECT * FROM allorders;
SELECT * FROM product;

/*ALTER TABLE orders ADD totalAmount INT;*/
/*UPDATE orders SET totalAmount = 0 where orderId>="O0001";*/

/*ALTER TABLE orders ADD orderOTP INT;*/
/*UPDATE orders SET orderOtp=4392  WHERE orderId>="O0001";*/

delete from product where productId>="P0004";
DELETE from orders where orderId>="O0001";
DELETE from allorders where orderId>="O0001";
/*UPDATE product SET productId='P0010' where productId="";*/


/*INSERT INTO orders (orderId, shopId, userId, dateTime)VALUES("O0001","S0001","U0001",NOW());*/
/*ALTER TABLE orders ADD orderStatus integer;*/

SELECT p.*
FROM product p
INNER JOIN allorders a ON p.productId = a.productId
INNER JOIN orders o ON a.orderId = o.orderId
WHERE o.orderId = 'O0004';/*This query is to select the products based on the orderId -- It returns all the products that is selected on a single orderId*/

/*INSERT INTO allorders(orderId,productId,qty,price)VALUES("O0002","P0001",1,160);*/


/*SELECT * FROM orders WHERE userId = "U0001";*/

/*UPDATE orders SET orderStatus=0 where orderId='O0001';*/
/*SELECT * FROM orders;*/


