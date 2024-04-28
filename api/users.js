////THIS IS DEMO CODE! NEED TO REPLACE WITH OUR CODE!!
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const {
// 	createUser,
// 	getUserByUsername,
// 	getUser,
// 	getUserById,
// 	getPlaylistById
// } = require('../db');
// const { requireUser } = require('./utils');
// const { JWT_SECRET } = process.env;

// // POST /api/users/register
// // IMPLEMENT THE REGISTER ROUTE
// router.post('/register', async function (request, response, next) {
// 	try {
// 		const { username, password, name } = request.body;

// 		const newUser = await createUser(name, username, password);
// 		console.log({ newUser, JWT_SECRET });

// 		delete newUser.password;

// 		const token = jwt.sign(
// 			{
// 				id: newUser.id,
// 				username: newUser.username
// 			},
// 			JWT_SECRET,
// 			{ expiresIn: '1w' }
// 		);

// 		response.json({
// 			newUser,
// 			message: "you're signed up!",
// 			token
// 		});
// 	} catch (error) {
// 		console.log('error in register endpoint', error);
// 		next(error);
// 	}
// });

// // POST /api/users/login
// // IMPLEMENT THE LOGIN ROUTE
// router.post('/login', async function (request, response, next) {
// 	try {
// 		const { username, password } = request.body;

// 		const user = await getUser(username, password);

// 		delete user.password;

// 		const token = jwt.sign(
// 			{
// 				id: user.id,
// 				username: user.username
// 			},
// 			JWT_SECRET,
// 			{ expiresIn: '1w' }
// 		);

// 		response.json({
// 			message: 'Login success~',
// 			user,
// 			token
// 		});
// 	} catch (error) {
// 		console.log('error in login endpoint', error);
// 		next(error);
// 	}
// });

// // GET /api/users/me
// router.get('/me', requireUser, async (req, res, next) => {
// 	try {
// 		res.send(req.user);
// 	} catch (error) {
// 		next(error);
// 	}
// });

// module.exports = router;