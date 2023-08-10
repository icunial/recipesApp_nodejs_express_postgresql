const express = require("express");
const app = express();
const pg = require("pg");

// DB Connect String
const pg_connect = "postgres://postgres@localhost/recipes_db";

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Recipes App");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
