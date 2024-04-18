////THIS IS DEMO CODE! NEED TO REPLACE WITH OUR CODE!!
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const client = require('../db/client');
const { JWT_SECRET = 'neverTell' } = process.env;

// GET /api/health
router.get('/health', async (req, res, next) => {
	try {
		const uptime = process.uptime();
		const {
			rows: [dbConnection]
		} = await client.query('SELECT NOW();');
		const currentTime = new Date();
		const lastRestart = new Intl.DateTimeFormat('en', {
			timeStyle: 'long',
			dateStyle: 'long',
			timeZone: 'America/Chicago'
		}).format(currentTime - uptime * 1000);
		res.send({
			message: 'healthy',
			uptime,
			dbConnection,
			currentTime,
			lastRestart
		});
	} catch (err) {
		next(err);
	}
});

// set `req.user` if possible
router.use(async (req, res, next) => {
	const prefix = 'Bearer ';
	const auth = req.header('Authorization');

	if (!auth) {
		// nothing to see here
		next();
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);

		try {
			const parsedToken = jwt.verify(token, JWT_SECRET);

			const id = parsedToken && parsedToken.id;
			if (id) {
				req.user = await getUserById(id);
				next();
			}
		} catch (error) {
			next(error);
		}
	} else {
		next({
			name: 'AuthorizationHeaderError',
			message: `Authorization token must start with ${prefix}`
		});
	}
});

router.use((req, res, next) => {
	if (req.user) {
		console.log('User is set:', req.user);
	}
	next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/bikes
const bikesRouter = require('./bikes');
router.use('/bikes', bikesRouter);

// ROUTER: /api/rentals
const rentalsRouter = require('./rentals');
router.use('/rentals', rentalsRouter);

module.exports = router;