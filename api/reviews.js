////I replaced this code!! Check it out!!
const express = require('express');
const router = express.Router();
const { getAllReviews,
    getReviewById,
    createReview,
    updateReviewById,
    deleteReviewById, deleteAllReviews, getMovieById } = require('../db/reviews');
    //NOT SURE IF WE NEED THIS NEXT LINE FOR OUR CODE...CHECK ON THIS LINE
// const { requireUser, calculateRentalPrice, checkRentalExists } = require('./utils');

// GET /api/reviews - get all reviews
router.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        throw error;
    }
});

// GET /api/reviews/:reviewId - get review by id
router.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// POST /api/reviews - create new review
router.post('/', requireUser, async (req, res, next) => {
    try {
        // error handling
        //CHECK THIS NEXT LINE...NOT SURE IF WE NEED IT...
        // if (!req.body.review_id || !req.body.rental_date_from || !req.body.rental_date_to) {
        //     return res.status(422).send({ errors: [{ title: 'Data missing', detail: 'Provide bike_id, rental_date_from and rental_date_to' }] });
        // }

        // check if movie exists
        const movieExists = await getMovieById(req.body.movie_id);
        if (!movieExists) {
            return res.status(422).send({ errors: [{ title: 'Movie not found', detail: 'Movie does not exist' }] });
        }

        // check if review exists
        //CHECK THIS FUNCTION--NOT SURE IF WE NEED THIS....COMPARED TO SALS DEMO CODE
        const reviewExists = await checkReviewExists(req.body.movie_id);
        if (reviewExists) {
            return res.status(422).send({ errors: [{ title: 'Review exists', detail: 'Review already exists for this movie' }] });
        }

        //CHECK THIS FUNCTION---I DONT THINK WE NEED THIS...
        // check if rental is in the future
        // const rentalDateFrom = new Date(req.body.rental_date_from);
        // const rentalDateTo = new Date(req.body.rental_date_to);
        // const today = new Date();

        // if (rentalDateFrom < today) {
        //     return res.status(422).send({ errors: [{ title: 'Rental date from is in the past', detail: 'Rental date from is in the past' }] });
        // }

        // if (rentalDateTo < today) {
        //     return res.status(422).send({ errors: [{ title: 'Rental date to is in the past', detail: 'Rental date to is in the past' }] });
        // }

        // get user id from token
        const { id: user_id } = req.user;

        //CHECK THIS FUNCTION--I DONT THINK WE NEED THIS...
        // calculate total price of rental by taking the bike id, rental dates, and price per day
        // const { bike_id, rental_date_from, rental_date_to } = req.body;

        // // calculate total price of rental
        // const total_price = await calculateRentalPrice(bike_id, rental_date_from, rental_date_to);

        // create review
        const review = await createReview({ movie_id, user_id });

        res.send(review);
    } catch (error) {
        throw error;
    }
});


// PATCH /api/reviews/:reviewId - update review by id
router.patch('/:reviewId', requireUser, async (req, res, next) => {
    try {
        const review = await updateReviewById(req.params.reviewId, req.body);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/reviews/:reviewId - delete review by id
router.delete('/:reviewId', requireUser, async (req, res, next) => {
    try {
        const review = await deleteReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/reviews - delete all reviews
router.delete('/', requireUser, async (req, res, next) => {
    try {
        const reviews = await deleteAllReviews();
        res.send(reviews);
    } catch (error) {
        throw error;
    }
});


// export router
module.exports = router;