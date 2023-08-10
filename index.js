const express = require("express");
const app = express();

// Body Parser
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
