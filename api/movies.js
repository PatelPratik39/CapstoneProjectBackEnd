////THIS IS DEMO CODE! NEED TO REPLACE WITH OUR CODE!!
const express = require('express');
const router = express.Router();
const { getAllBikes, getBikeById, updateBikeById, deleteBikeById, deleteAllBikes } = require('../db');
const { requireUser } = require('./utils');

// GET /api/bikes
router.get('/', async (req, res, next) => {
    try {
        const bikes = await getAllBikes();
        res.send(bikes);
    } catch (error) {
        next(error);
    }
});

// GET /api/bikes/:bikeId
router.get('/:bikeId', async (req, res, next) => {
    try {
        const bike = await getBikeById(req.params.bikeId);
        res.send(bike);
    } catch (error) {
        next(error);
    }
});

// PATCH /api/bikes/:bikeId
router.patch('/:bikeId', requireUser, async (req, res, next) => {
    try {
        const bike = await updateBikeById(req.params.bikeId, req.body);
        res.send(bike);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/bikes/:bikeId
router.delete('/:bikeId', requireUser, async (req, res, next) => {
    try {
        const bike = await deleteBikeById(req.params.bikeId);
        res.send(bike);
    } catch (error) {
        next(error);
    }
});

// DELETE /api/bikes
router.delete('/', requireUser, async (req, res, next) => {
    try {
        const bikes = await deleteAllBikes();
        res.send(bikes);
    } catch (error) {
        next(error);
    }
});

// export router
module.exports = router;