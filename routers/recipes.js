const express = require("express");
const router = express.Router();

const Pool = require("pg").Pool;

// Init Pool
const pool = new Pool({
  user: process.env.USERNAME_DB,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
});

// Get all recipes
router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM recipes", (err, results) => {
    if (err) {
      return next();
    }
    return res.status(200).json({ statusCode: 200, data: results.rows });
  });
});

// Get Recipe by ID
router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [req.params.id],
    (err, results) => {
      if (err) {
        return next();
      }
      if (results.rows.length === 0) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Recipe with id ${id} not found!`,
        });
      }
      return res.status(200).json(results.rows);
    }
  );
});

// Create new Recipe
router.post("/", (req, res) => {
  const { name, ingredients, directions } = req.body;

  pool.query(
    "INSERT INTO recipes (name, ingredients, directions) VALUES ($1, $2, $3)",
    [name, ingredients, directions],
    (err, results) => {
      if (err) throw err;
      return res.status(201).json(results.rows);
    }
  );
});

// Delete recipe by id
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  pool.query("DELETE FROM recipes WHERE id = $1", [id], (err, results) => {
    if (err) throw err;
    return res.status(200).json(results);
  });
});

// Update recipe by id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const recipeInfo = req.body;

  pool.query(
    "UPDATE recipes SET name = $1, ingredients = $2, directions = $3 WHERE id = $4",
    [recipeInfo.name, recipeInfo.ingredients, recipeInfo.directions, id],
    (err, results) => {
      if (err) throw err;
      return res.status(200).json(results);
    }
  );
});

module.exports = router;
