const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJs = require("crypto-js");

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
  const cartItems = req.body.items;
  console.log("Cart Items :: ", cartItems);
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
    console.log("New order id generated from function:: ", newOrderId);
    // console.log(
    //   "New order id generated:: ",
    //   newOrderId,
    //   " Max orderId: ",
    //   maxOrderId
    // );
    const cartItemShopId = cartItems[0].shopId;
    // console.log("ShopId : ", cartItemShopId);
    // Step 3: Insert the new data with the new orderId into the orders table
    const insertOrderQuery = `INSERT INTO orders (orderId, shopId, userId, dateTime,orderStatus) VALUES (\"${newOrderId}\",\"${cartItemShopId}\", 'U0001', NOW(),0)`;

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
              console.log("New order inserted:", result);
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
      console.log("All orders inserted successfully");
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
  console.log("orderId: ", orderId);
  // MySQL query to retrieve products based on orderId
  const query = ` SELECT p.* FROM product p INNER JOIN allorders a ON p.productId = a.productId INNER JOIN orders o ON a.orderId = o.orderId WHERE o.orderId = \"${orderId}\"`;

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error retrieving products:", err);
      res.status(500).json({ error: "Error retrieving products" });
    } else {
      const products = result.map((item) => ({
        productId: item.productId,
        name: item.name,
        shopId: item.shopId,
        category: item.category,
        review: item.review,
        rating: item.rating,
        price: item.price,
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
  console.log(data);

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
    console.log("maxUserId: ", maxUserId);
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
        res.status(200).json({ message: "User Signed in Successfully" });
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

//User log In
app.post("/api/logIn", (req, res) => {
  // const userDetails = req.body.userDetails;
  // console.log(userDetails);
  const data = req.body.data;
  // console.log(data);
  const secretKey = "MySecretKey";
  const bytes = CryptoJs.AES.decrypt(data.encUserPassword, secretKey);
  const userPassword = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));

  // Perform database update operation to update orderId
  const userLoginQuery = `select userId from users where name=\"${data.username}\"and password=\"${userPassword}\"`;
  connection.query(userLoginQuery, (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).json({ error: "Error updating order status" });
    } else {
      // console.log("login result: ", result);
      if (result[0]) {
        console.log(result[0].userId);
        res.status(200).json(result[0]);
      } else {
        console.log("no invalid username or password");
        res.status(200).json({ message: "no invalid username or password" });
      }
    }
  });

  // Return a success response
  // res.status(200).json({ message: "Order ID updated successfully" });
});
//^^^^^^^^^ User log In

///^^^^^^^^ for userAuthentication
// function test() {
//   const query = "SELECT * FROM shops";

//   connection.query(query, (err, result) => {
//     if (err) {
//       console.log("Error in execting the Query: ", err);
//       res.status(500, send("Error fetching data from Database"));
//     } else {
//       console.log(result);
//     }
//   });
// }

// test();

app.listen(port, () => {
  console.log(`Server is being server on port http://localhost:${port}`);
});
