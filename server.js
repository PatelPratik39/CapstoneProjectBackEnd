const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5432;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
