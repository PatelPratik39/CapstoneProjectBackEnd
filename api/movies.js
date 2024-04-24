////I replaced this code!! Check it out!!
const express = require('express');
const router = express.Router();
const { getAllMovies, createNewMovie, getMovieById, updateMovieById, deleteMovieById, deleteAllMovies } = require('../db/movies');
// const { requireUser } = require('./utils');

// GET /api/movies
router.get('/', async (req, res, next) => {
    try {
        const movies = await getAllMovies();
        res.send(movies);
    } catch (error) {
        next(error);
    }
});

// POST /api/movies
router.post('/', async (req, res, next) => {
    try {
        const movies = await createNewMovie();
        res.send(movies);
    } catch (error) {
        next(error);
    }
});

// GET /api/movies/movieId
router.get('/:movieId', async (req, res, next) => {
    try {
        const movie = await getMovieById(req.params.movieId);
        res.send(movie);
    } catch (error) {
        next(error);
    }
});

// PATCH /api/movies/:movieId
router.patch('/:movieId', async (req, res, next) => {
    try {
        const movie = await updateMovieById(req.params.movieId, req.body);
        res.send(movie);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/movies/:movieId

router.delete('/:movieId',  async (req, res, next) => {

    try {
        const movie = await deleteMovieById(req.params.movieId);
        res.send(movie);
    } catch (error) {
        next(error);
    }
});

// // DELETE /api/movies
// router.delete('/', requireUser, async (req, res, next) => {
//     try {
//         const movies = await deleteAllMovies();
//         res.send(movies);
//     } catch (error) {
//         next(error);
//     }
// });

// export router
module.exports = router;