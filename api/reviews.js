// I replaced this code!! Check it out!!
const express = require('express');
const router = express.Router();
const { getAllReviews, getReviewById, updateReviewById, deleteReviewById, deleteAllReviews, createReview } = require('../db/reviews');
const { getMovieById } = require('../db/movies');
//getMovieById
    
        
    // NOT SURE IF WE NEED THIS NEXT LINE FOR OUR CODE...CHECK ON THIS LINE
const { requireUser } = require('./utils');

// GET /api/reviews - get all reviews THIS ENDPOINT WORKS! 4/23
router.get('/', async (req, res, next) => {
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        throw error;
    }
});

// GET /api/reviews/:reviewId - get review by id THIS ENDPOINT WORKS! 4/23
router.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await getReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// POST /api/reviews - create new review/removed requireUser  THIS ENDPOINT WORKS! 4/27
router.post('/', async (req, res, next) => {
    try {
        // error handling
        // CHECK THIS NEXT LINE...NOT SURE IF WE NEED IT...
        // if (!req.body.review_id || !req.body.rental_date_from || !req.body.rental_date_to) {
        //     return res.status(422).send({ errors: [{ title: 'Data missing', detail: 'Provide bike_id, rental_date_from and rental_date_to' }] });
        // }

        // check if movie exists
        // const movieExists = await getMovieById(req.body.movie_id);
        // if (!movieExists) {
        //     return res.status(422).send({ errors: [{ title: 'Movie not found', detail: 'Movie does not exist' }] });
        // }

        // check if review exists
        // CHECK THIS FUNCTION--NOT SURE IF WE NEED THIS....COMPARED TO SALS DEMO CODE
        // const reviewExists = await checkReviewExists(req.body.movie_id);
        // if (reviewExists) {
        //     return res.status(422).send({ errors: [{ title: 'Review exists', detail: 'Review already exists for this movie' }] });
        // }

        // get user id from token
        // const { id: user_id } = req.user;
        const { movie_id , user_id, rating, comment, review_date } = req.body


    //    create review
        const review = await createReview({ movie_id, user_id, rating, comment, review_date });

        res.send(review);
    } catch (error) {
        throw error;
    }
});


// PATCH /api/reviews/:reviewId - update review by id THIS ENDPOINT WORKS! 4/24 had to take out the require user
router.patch('/:reviewId', async (req, res, next) => {
    try {
        const review = await updateReviewById(req.params.reviewId, req.body);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/reviews/:reviewId - delete review by id
router.delete('/:reviewId',  async (req, res, next) => {
    try {
        const review = await deleteReviewById(req.params.reviewId);
        res.send(review);
    } catch (error) {
        throw error;
    }
});

// DELETE /api/reviews - delete all reviews
router.delete('/',  async (req, res, next) => {
    try {
        const reviews = await deleteAllReviews();
        res.send(reviews);
    } catch (error) {
        throw error;
    }
});



module.exports = router;