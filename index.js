const express = require("express");
const app = express();

const Pool = require("pg").Pool;

require("dotenv").config();

console.log(process.env);

// Init Pool
const pool = new Pool({
  user: process.env.USERNAME_DB,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
});

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get all recipes
app.get("/", (req, res) => {
  pool.query("SELECT * FROM recipes", (err, results) => {
    if (err) {
      throw err;
    }
    return res.status(200).json(results.rows);
  });
});

// Get Recipe by ID
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [req.params.id],
    (err, results) => {
      if (err) {
        throw err;
      }
      return res.status(200).json(results.rows);
    }
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
