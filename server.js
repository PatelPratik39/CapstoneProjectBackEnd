const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5432;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});


//CHECK SALS DEMO CODE FOR THIS CODE--- DO WE NEED THIS CODE FOR OUR STUFF TO WORK?

// require('dotenv').config();
// const express = require('express');
// const server = express();
// // const morgan = require('morgan');
// // 
// const cors = require('cors');
// const { PORT = 5432 } = process.env;

// const client = require('./db/client');
// client.connect();

// server.use(cors());

// // logging middleware
// // server.use(morgan('dev'));
// // parsing middleware
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

// // Router: /api
// server.use('/api', require('./api'));

// // 404 handler
// server.get('*', (req, res) => {
// 	res.status(404).send({
// 		error: '404 - Not Found',
// 		message: 'No route found for the requested URL'
// 	});
// });

// // error handling middleware
// server.use((error, req, res, next) => {
// 	console.error('SERVER ERROR: ', error);
// 	if (res.statusCode < 400) res.status(500);
// 	res.send({
// 		error: error.message,
// 		name: error.name,
// 		message: error.message,
// 		table: error.table
// 	});
// });

// server.listen(PORT, () => {
// 	console.log(
// 		chalk.blue('Server is listening on PORT:'),
// 		chalk.yellow(PORT),
// 		chalk.red('Let the bikes roll!')
// 	);
// });