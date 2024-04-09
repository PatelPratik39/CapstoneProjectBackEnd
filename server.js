const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
