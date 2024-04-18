////THIS IS DEMO CODE! NEED TO REPLACE WITH OUR CODE!!
const express = require('express');
const router = express.Router();
const { getAllRentals,
    getRentalById,
    createRental,
    updateRentalById,
    deleteRentalById, deleteAllRentals, getBikeById } = require('../db');
const { requireUser, calculateRentalPrice, checkRentalExists } = require('./utils');

// GET /api/rentals - get all rentals
router.get('/', async (req, res, next) => {
    try {
        const rentals = await getAllRentals();
        res.send(rentals);
    } catch (error) {
        throw error;
    }
});

// GET /api/rentals/:rentalId - get rental by id
router.get('/:rentalId', async (req, res, next) => {
    try {
        const rental = await getRentalById(req.params.rentalId);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// POST /api/rentals - create new rental
router.post('/', requireUser, async (req, res, next) => {
    try {
        // error handling
        if (!req.body.bike_id || !req.body.rental_date_from || !req.body.rental_date_to) {
            return res.status(422).send({ errors: [{ title: 'Data missing', detail: 'Provide bike_id, rental_date_from and rental_date_to' }] });
        }

        // check if bike exists
        const bikeExists = await getBikeById(req.body.bike_id);
        if (!bikeExists) {
            return res.status(422).send({ errors: [{ title: 'Bike not found', detail: 'Bike does not exist' }] });
        }

        // check if rental exists
        const rentalExists = await checkRentalExists(req.body.bike_id, req.body.rental_date_from);
        if (rentalExists) {
            return res.status(422).send({ errors: [{ title: 'Rental exists', detail: 'Rental already exists for this bike and dates' }] });
        }

        // check if rental is in the future
        const rentalDateFrom = new Date(req.body.rental_date_from);
        const rentalDateTo = new Date(req.body.rental_date_to);
        const today = new Date();

        if (rentalDateFrom < today) {
            return res.status(422).send({ errors: [{ title: 'Rental date from is in the past', detail: 'Rental date from is in the past' }] });
        }

        if (rentalDateTo < today) {
            return res.status(422).send({ errors: [{ title: 'Rental date to is in the past', detail: 'Rental date to is in the past' }] });
        }

        // get user id from token
        const { id: user_id } = req.user;

        // calculate total price of rental by taking the bike id, rental dates, and price per day
        const { bike_id, rental_date_from, rental_date_to } = req.body;

        // calculate total price of rental
        const total_price = await calculateRentalPrice(bike_id, rental_date_from, rental_date_to);

        // create rental
        const rental = await createRental({ bike_id, user_id, rental_date_from, rental_date_to, total_price });

        res.send(rental);
    } catch (error) {
        throw error;
    }
});


// PATCH /api/rentals/:rentalId - update rental by id
router.patch('/:rentalId', requireUser, async (req, res, next) => {
    try {
        const rental = await updateRentalById(req.params.rentalId, req.body);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/rentals/:rentalId - delete rental by id
router.delete('/:rentalId', requireUser, async (req, res, next) => {
    try {
        const rental = await deleteRentalById(req.params.rentalId);
        res.send(rental);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/rentals - delete all rentals
router.delete('/', requireUser, async (req, res, next) => {
    try {
        const rentals = await deleteAllRentals();
        res.send(rentals);
    } catch (error) {
        throw error;
    }
});


// export router
module.exports = router;