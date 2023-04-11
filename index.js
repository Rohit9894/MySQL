const express = require("express");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "96308284",
  database: "crud",
});

// app.use((req, res, next) => {
//   req.mysql = connection;
//   next();
// });
app.get("/", (req, res) => {
  res.send("my sql");
});
// app.get("/users", (req, res) => {
//   req.mysql.query("SELECT * FROM users", (error, results, fields) => {
//     if (error) throw error;
//     res.send(results);
//   });
// });
app.use(express.json());

app.post("/api/products", (req, res) => {
  const { name, description, price } = req.body;

  const query = `INSERT INTO product (name, description, price) VALUES (?, ?, ?)`;
  const values = [name, description, price];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting product into MySQL database: ", err);
      res
        .status(500)
        .json({ error: "Error inserting product into MySQL database" });
      return;
    }

    console.log(`Product ${name} inserted into MySQL database`);
    res.status(200).json({ success: true });
  });
});

app.get("/read", (req, res) => {
  var query = "select *from product";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

app.patch("/update/:id", (req, res) => {
  const id = req.params.id;

  const { name, description, price } = req.body;
  const values = [name, description, price, id];
  var query = "update product set name=?,description=?,price=? where id=?";
  connection.query(query, values, (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "product id not found" });
      }
      return res.status(200).json({ message: "Product Update Successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  var query = "delete from product where id?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "product id not found" });
      }
      return res.status(200).json({ message: "Product delete Successfully" });
    } else {
      return res.status(500).json(err);
    }
  });
});
app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
