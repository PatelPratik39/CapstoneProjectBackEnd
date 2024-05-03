const express = require("express");
const cors = require("cors");
const client = require("./db/client");
const dotenv = require("dotenv");
const server = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;


client.connect();
dotenv.config();

// app.use(cors());
// app.use(express.json());
// app.use("/api", require("./api"));


server.use(cors({
        origin: "http://localhost:5173"
    }
))
server.options('*', cors())

// Add headers before the routes are defined
server.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// logging middleware
server.use(morgan("dev"));
// parsing middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Router: /api
server.use('/api', require('./api'));

// // 404 handler
server.get("*", (req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL"
  });
});

// error handling middleware
server.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});