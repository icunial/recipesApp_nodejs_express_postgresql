const express = require("express");
const app = express();

require("dotenv").config();

const router = require("./routers/recipes");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/recipes", router);

// Error Middleware
app.use((req, res) => {
  res.status(500).json({
    statusCode: 500,
    msg: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
