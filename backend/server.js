const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJs = require("crypto-js");

const jwt = require("jsonwebtoken");
const { expressJwt } = require("express-jwt");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "foodin",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

//test api endpoint to fetch data from Mysql database
app.get("/api/getShops", (req, res) => {
  const query = "SELECT * FROM shops";

  connection.query(query, (err, result) => {
    if (err) {
      console.log("Error in execting the Query: ", err);
      res.status(500, send("Error fetching data from Database"));
    } else {
      // console.log(result);
      res.json(result);
    }
  });
});

app.get("/api/getShopItem/:selectedShop", (req, res) => {
  var selectedShop = req.params.selectedShop;
  selectedShop = selectedShop.replace(":", "");
  const query = `SELECT * FROM product WHERE shopId = \"${selectedShop}\"`;
  // console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing the Query: ", err);
      res.status(500).send("Error fetching data from Database");
    } else {
      // console.log(result);
      res.json(result);
    }
  });
});

//
//

// Create an API endpoint to insert a new order
app.post("/api/orders", (req, res) => {
  // Step 1: Retrieve the maximum orderId value from the orders table
  const getMaxOrderIdQuery =
    "SELECT MAX(CAST(SUBSTRING(orderId, 2) AS UNSIGNED)) AS maxOrderId FROM orders";
  connection.query(getMaxOrderIdQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving maxOrderId:", err);
      res.status(500).send("Error retrieving maxOrderId");
      return;
    }

    // Step 2: Increment the maximum orderId to get the new orderId
    const maxOrderId = result[0].maxOrderId || 0; // If no rows, initialize to 0
    console.log("Max orderId: ", maxOrderId);
    const newOrderId = `O${String(maxOrderId + 1).padStart(4, "0")}`;

    // Step 3: Insert the new data with the new orderId into the orders table
    const insertOrderQuery = `INSERT INTO orders (orderId, shopId, userId, dateTime) VALUES (\"${newOrderId}\",'S0001', 'U0001', NOW())`;

    connection.query(insertOrderQuery, (err, result) => {
      // if (err) {
      //   console.log("hey");
      //   console.error("Error inserting order:", err);
      //   res.status(500).send("Error inserting order");
      //   return;
      // }
      console.log("hello");

      console.log("New order inserted:", result);
      // res.status(200).send("Order inserted successfully");
    });
  });
});

//
//

app.post("/api/updateAllOrders", async (req, res) => {
  //
  const totalPrice = req.body.finalTotalPrice;
  const cartItems = req.body.items;
  const userId = req.body.userId;
  const orderOTP = Math.floor(1000 + Math.random() * 9000);
  //console.log("Total Price: ", totalPrice);

  // console.log("userIdd : ", user);
  //console.log("Cart Items :: ", cartItems);
  ///
  //for creating new order id
  //console.log("test test test: ", getNewOrderId());
  //console.log("test    test: ", test);
  //console.log("Max orderId: ", orderId, " hey its type: ", typeof(finalOrderId));
  //console.log("New OrderId: Heyyyya ", orderId);
  ///
  ////
  const promises = [];

  /////test
  var newOrderId;

  const getMaxOrderIdQuery =
    "SELECT MAX(CAST(SUBSTRING(orderId, 2) AS UNSIGNED)) AS maxOrderId FROM orders";
  connection.query(getMaxOrderIdQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving maxOrderId:", err);
      res.status(500).send("Error retrieving maxOrderId");
      return;
    }

    // Step 2: Increment the maximum orderId to get the new orderId
    const maxOrderId = result[0].maxOrderId || 0; // If no rows, initialize to 0
    // console.log("Max orderId: ", maxOrderId);
    newOrderId = `O${String(maxOrderId + 1).padStart(4, "0")}`;
    this.finalOrderId = newOrderId;
    // console.log("New order id generated from function:: ", newOrderId);
    // console.log(
    //   "New order id generated:: ",
    //   newOrderId,
    //   " Max orderId: ",
    //   maxOrderId
    // );
    const cartItemShopId = cartItems[0].shopId;
    // console.log("ShopId : ", cartItemShopId);
    // Step 3: Insert the new data with the new orderId into the orders table
    // const insertOrderQuery = `INSERT INTO orders (orderId, shopId, userId, dateTime,orderStatus) VALUES (\"${newOrderId}\",\"${cartItemShopId}\", 'U0001', NOW(),0)`;
    const insertOrderQuery = `INSERT INTO orders (orderId, shopId, userId, dateTime,orderStatus,totalAmount,orderOTP) VALUES (\"${newOrderId}\",\"${cartItemShopId}\", \"${userId}\", NOW(),0,${totalPrice},${orderOTP})`;

    connection.query(insertOrderQuery, (err, result) => {
      // if (err) {
      //   console.log("hey");
      //   console.error("Error inserting order:", err);
      //   res.status(500).send("Error inserting order");
      //   return;
      // }

      // console.log("from inside query New order inserted:", this.finalOrderId);
      //const promises = [];
      cartItems.forEach((item) => {
        //const { productId, qty, shopId, price } = item;
        // console.log("insid query:  ", this.finalOrderId);
        const query = `INSERT INTO allorders (orderId, productId, qty, price) VALUES ("${this.finalOrderId}","${item.productId}",${item.qty},${item.price})`;
        const promise = new Promise((resolve, reject) => {
          connection.query(query, (err, result) => {
            if (err) {
              console.error("Error inserting into allorders:", err);
              reject(err);
            } else {
              // console.log("New order inserted:", result);
              resolve(result);
            }
          });
        });
        promises.push(promise);
      });
      //return promises;
      // res.status(200).send("Order inserted successfully");
    });
  });

  /////test

  // cartItems.forEach((item) => {
  //   //const { productId, qty, shopId, price } = item;
  //   console.log("insid query:  ", this.finalOrderId);
  //   const query = `INSERT INTO allorders (orderId, productId, qty, price) VALUES ("${this.finalOrderId}","${item.productId}",${item.qty},${this.price})`;
  //   const promise = new Promise((resolve, reject) => {
  //     connection.query(query, (err, result) => {
  //       if (err) {
  //         console.error("Error inserting into allorders:", err);
  //         reject(err);
  //       } else {
  //         console.log("New order inserted:", result);
  //         resolve(result);
  //       }
  //     });
  //   });
  //   promises.push(promise);
  // });
  //* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
  // const promises = await doSomething(cartItems);
  Promise.all(promises)
    .then(() => {
      // console.log("All orders inserted successfully");
      res.status(200).json({ message: "Orders inserted successfully" });
    })
    .catch((err) => {
      console.error("Error inserting orders:", err);
      res.status(500).json({ error: "Error inserting orders" });
    });

  ////
  //
  //
  /////////////
  /////////////
  // const testquery = `INSERT INTO allorders (orderId, productId, qty, price) VALUES ("O0002","${productId}",${qty},${price})`;
  // const promise = new Promise((resolve, reject) => {
  //   connection.query(testquery, (err, result) => {
  //     if (err) {
  //       console.error("Error inserting into allorders:", err);
  //       reject(err);
  //     } else {
  //       console.log("New order inserted:", result);
  //       resolve(result);
  //     }
  //   });
  // });
  /////////////
  //////////////
});
/////////*to get orderStatus

app.get("/api/getOrderStatus/:userId", (req, res) => {
  var userId = req.params.userId;
  userId = userId.replace(":", "");
  const query = `SELECT * FROM orders WHERE userId = \"${userId}\"`;
  // console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing the Query: ", err);
      res.status(500).send("Error fetching data from Database");
    } else {
      // console.log(result);
      res.json(result);
    }
  });
});

////////^^^^^^^^^get order status

/////////*to get shopSideOrderStatus

app.get("/api/getShopSideOrderStatus/:shopId", (req, res) => {
  var shopId = req.params.shopId;
  shopId = shopId.replace(":", "");
  const query = `SELECT * FROM orders WHERE shopId = \"${shopId}\"`;
  // console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing the Query: ", err);
      res.status(500).send("Error fetching data from Database");
    } else {
      // console.log(result);
      res.json(result);
    }
  });
});

// to update accepted or rejected status of the order
app.post("/api/updateShopOrderStatus", (req, res) => {
  const orderId = req.body.orderId;
  const status = req.body.status;
  // console.log("orderId: ", orderId, " status: ", status);
  // Perform database update operation to update orderId
  const query = `UPDATE orders SET orderStatus= \"${status}\" WHERE orderId=\"${orderId}\"`;
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Error updating order status" });
    } else {
      // console.log(`Order status updated for orderId ${orderId} to ${status}`);
      res.status(200).json({ message: "Order status updated successfully" });
    }
  });

  // Return a success response
  //res.status(200).json({ message: "Order ID updated successfully" });
});

////////^^^^^^^^^get shopSideOrderStatus
/////////to return ProductsList By OrderId for the shop owner

app.post("/api/getProductsListByOrderId", (req, res) => {
  const orderId = req.body.orderId;
  // console.log("orderId: ", orderId);
  // MySQL query to retrieve products based on orderId
  // const query = ` SELECT p.* FROM product p INNER JOIN allorders a ON p.productId = a.productId INNER JOIN orders o ON a.orderId = o.orderId WHERE o.orderId = \"${orderId}\"`;
  //test//
  const query = ` SELECT p.*,(SELECT qty  FROM allOrders WHERE orderId=\"${orderId}\" AND productId= p.productId  )  AS quantity FROM product p INNER JOIN allorders a ON p.productId = a.productId INNER JOIN orders o ON a.orderId = o.orderId WHERE o.orderId = \"${orderId}\" `;
  //test^^//
  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving products:", err);
      res.status(500).json({ error: "Error retrieving products" });
    } else {
      // console.log("result: ", result);
      const products = result.map((item) => ({
        productId: item.productId,
        name: item.name,
        shopId: item.shopId,
        category: item.category,
        review: item.review,
        rating: item.rating,
        price: item.price,
        quantity: item.quantity,
      }));
      // console.log(products);
      res.status(200).json(products);
    }
  });
});

////////^^^^^^^^to return productsList by OrderId for the shop owner

////For User Authentication

//User sign in
app.post("/api/signIn", (req, res) => {
  // const userDetails = req.body.userDetails;
  // console.log(userDetails);
  const data = req.body.data;
  //console.log(data);

  // const encryptedData = req.body.data;
  const secretKey = "MySecretKey";
  const bytes = CryptoJs.AES.decrypt(data.encUserPassword, secretKey);
  const userPassword = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
  //

  const finalUserId = "";
  const getMaxUserIdQuery =
    "SELECT MAX(CAST(SUBSTRING(userId, 2) AS UNSIGNED)) AS maxUserId FROM users";
  connection.query(getMaxUserIdQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving maxUserId:", err);
      res.status(500).send("Error retrieving maxUserId");
      return;
    }
    const maxUserId = result[0].maxUserId || 0; // If no rows, initialize to 0
    //console.log("maxUserId: ", maxUserId);
    // console.log("Max orderId: ", maxUserId);
    newUserId = `U${String(maxUserId + 1).padStart(4, "0")}`;
    this.finalUserId = newUserId;
    // console.log(
    //   "New order id generated from function:: ",
    //   newUserId,
    //   data.username,
    //   data.mobileNumber,
    //   userPassword
    // );

    //
    const signInQuery = `INSERT INTO users (userId, name, mobileNo, password) VALUES (\"${newUserId}\",\"${data.username}\",${data.mobileNumber},\"${userPassword}\")`;
    connection.query(signInQuery, (err, result) => {
      if (err) {
        console.error("Error in signIn user to db: ", err);
        res.status(500).json({ error: "Error signing in user" });
      } else {
        console.log(newUserId);
        res.status(200).json({ userId: newUserId, status: "yes" });
      }
    });
  });

  //^^ for getting new userId
  // const query = `INSERT INTO users (userId, name, mobileNo, password) VALUES ("U0003",\"${data.username}\",${data.mobileNumber},\"${userPassword}\");`;

  // console.log("orderId: ", orderId, " status: ", status);
  // Perform database update operation to update orderId
  //const query = `UPDATE orders SET orderStatus= \"${status}\" WHERE orderId=\"${orderId}\"`;
  // connection.query(query, (err, result) => {
  //   if (err) {
  //     console.error("Error updating order status:", err);
  //     res.status(500).json({ error: "Error updating order status" });
  //   } else {
  //     res.status(200).json({ message: "Order status updated successfully" });
  //   }
  // });

  // Return a success response
  // res.status(200).json({ message: "Order ID updated successfully" });
});
//^^^^^^^^^ User sign in

//User log In --->it is for session
// app.post("/api/logIn", (req, res) => {

//   const data = req.body.data;
//   const secretKey = "MySecretKey";
//   const bytes = CryptoJs.AES.decrypt(data.encUserPassword, secretKey);
//   const userPassword = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));

//   const userLoginQuery = `select userId from users where name=\"${data.username}\"and password=\"${userPassword}\"`;
//   connection.query(userLoginQuery, (err, result) => {
//     if (err) {
//       console.error("Error updating order status:", err);
//       res.status(500).json({ error: "Error updating order status" });
//     } else {
//       if (result[0]) {
//         console.log(result[0].userId);

//         res.status(200).json({ userId: result[0].userId, status: "yes" });
//       } else {
//         console.log("no invalid username or password");
//         res.status(200).json({ message: "no invalid username or password" });
//       }
//     }
//   });
// });
//^^^^^^^^^ User log In

///^^^^^^^^ for userAuthentication

//////// the below code is for server side token management

const SECRET_KEY = "MYSERVERSECRETKEY";

function generateToken(userId, username) {
  const payload = { userId: userId, username: username };
  const options = { expiresIn: "24h" };
  const token = jwt.sign(payload, SECRET_KEY, options);
  return token;
}

app.post("/api/logIn", (req, res) => {
  const data = req.body.data;
  const secretKey = "MySecretKey";
  const bytes = CryptoJs.AES.decrypt(data.encUserPassword, secretKey);
  const userPassword = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));

  const userLoginQuery = `select userId from users where name=\"${data.username}\"and password=\"${userPassword}\"`;
  connection.query(userLoginQuery, (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Error updating order status" });
    } else {
      if (result[0]) {
        //  console.log(result[0].userId);
        // for token
        const userId = result[0].userId;
        // const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "24h" });
        // console.log("username: ", data.username);
        const token = generateToken({
          userId: userId,
          username: data.username,
        });
        res
          .status(200)
          .json({ token: token, userId: result[0].userId, status: "yes" });
        // ^^^^ for token
        // res.status(200).json({ userId: result[0].userId, status: "yes" });
      } else {
        console.log("no invalid username or password");
        res.status(200).json({ message: "no invalid username or password" });
      }
    }
  });
});

// Sample protected route
// app.use(
//   expressJwt({ secret: SECRET_KEY, algorithms: ["HS256"] }).unless({
//     path: ["/api/login", "/api/"],
//   })
// );
// app.get(
//   "/api/protected-route",

//   (req, res) => {
//     // Route will be accessible only if the JWT token is valid
//     console.log(req.userId);
//     res.json({ message: "You are authenticated and authorized" });
//   }
// );

////^^^^^^^^^^ the above code is for server side token management

//add shop Item

app.post("/api/addShopItem", (req, res) => {
  const shopId = req.body.shopId;
  const itemName = req.body.itemName;
  const itemPrice = req.body.itemPrice;
  const category = req.body.category;
  const finalProductId = "";
  const getmaxProductIdQuery =
    "SELECT MAX(CAST(SUBSTRING(productId, 2) AS UNSIGNED)) AS maxProductId FROM product";
  connection.query(getmaxProductIdQuery, (err, result) => {
    if (err) {
      console.error("Error retrieving maxProductId:", err);
      res.status(500).send("Error retrieving maxProductId");
      return;
    }
    const maxProductId = result[0].maxProductId || 0; // If no rows, initialize to 0
    //console.log("maxProductId: ", maxProductId);
    // console.log("Max orderId: ", maxProductId);
    newProductId = `P${String(maxProductId + 1).padStart(4, "0")}`;
    this.finalProductId = newProductId;
    // console.log(this.finalProductId);
    // console.log(itemName, itemPrice, category);

    const addItemQuery = `INSERT INTO product(productId,name,price,shopId,category,review,rating)VALUES(\"${newProductId}\",\"${itemName}\",${itemPrice},\"${shopId}\",\"${category}\","No review",4.2)`;
    connection.query(addItemQuery, (err, result) => {
      if (err) {
        console.error("Error Adding Item:", err);
        res.status(500).json({ error: "Error Adding Item" });
      } else {
        res.status(200).json({ message: "Item Added Successfully" });
      }
    });
  });
});

//^^^ add shop Item

// edit shop Item

app.post("/api/editShopItem", (req, res) => {
  const productId = req.body.productId;
  const itemName = req.body.itemName;
  const itemPrice = req.body.itemPrice;
  const category = req.body.category;
  console.log(productId, itemName, itemPrice, category);

  const editItemQuery = `UPDATE product SET name="${itemName}", price=${itemPrice}, category="${category}" WHERE productId="${productId}"`;

  connection.query(editItemQuery, (err, result) => {
    if (err) {
      console.error("Error in Editing product to db: ", err);
      res.status(500).json({ error: "Error Editing product" });
    } else {
      res.status(200).json({ message: "Editing product successful" });
    }
  });

  // res.status(200).json({ message: "Item Edited Successfully" });
});

//^^^ edit shop Item

// delete shop Item

app.post("/api/deleteShopItem", (req, res) => {
  const productId = req.body.productId;
  const deleteItemQuery = `DELETE FROM product WHERE productId=\"${productId}\"`;
  connection.query(deleteItemQuery, (err, result) => {
    if (err) {
      console.error("Error in Deleting product to db: ", err);
      res.status(500).json({ error: "Error Deleting product" });
    } else {
      res.status(200).json({ message: "Deleting product successful" });
    }
  });
});

//^^^ delete shop Item

app.listen(port, () => {
  console.log(`Server is being server on port http://localhost:${port}`);
});
