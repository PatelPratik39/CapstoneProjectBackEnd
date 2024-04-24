////THIS IS DEMO CODE! NEED TO REPLACE WITH OUR CODE!!
const client = require('../db/client');

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action"
    });
  }

  next();
}

// takes required parameters as an array, returns a middleware function that sends back a message if they're not present
const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    // for operations that need at least one param. Not all required.
    if (atLeastOne) {
      let numParamsFound = 0;
      for (let param of requiredParams) {
        if (req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if (!numParamsFound) {
        next({
          name: 'MissingParams',
          message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
        })
      } else {
        next();
      }
    } else {
      // figure out which ones are not defined, and return them
      const notSent = [];
      for (let param of requiredParams) {
        if (req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if (notSent.length) next({
        name: 'MissingParams',
        message: `Required Parameters not sent in body: ${notSent.join(', ')}`
      })
      next();
    }
  }
}
// //CHECK THIS FUNCTION--I DONT THINK WE NEED THIS....
// // calculate total price of rental by taking the bike id, rental dates, and price per day
// // async function calculateRentalPrice(bike_id, rental_date_from, rental_date_to) {
// //   try {

//     // get bike price per day
// //     const { rows: [bike] } = await client.query(`
// //       SELECT price
// //       FROM bikes
// //       WHERE id=$1
// //     `, [bike_id]);

// //     const price_per_day = bike.price;
// //     const from = new Date(rental_date_from);
// //     const to = new Date(rental_date_to);
// //     const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24));

// //     return price_per_day * days;
// //   } catch (error) {
// //     throw error;
// //   }
// // }

// //CHECK THIS CODE I DONT THINK WE NEED THIS...
// // check if a bike is already rented on a given date
// // async function checkRentalExists(bike_id, rental_date_from) {
// //   try {
// //     const { rows: [rented] } = await client.query(`
// //       SELECT *
// //       FROM rentals
// //       WHERE bike_id=$1
// //       AND rental_date_from=$2
// //     `, [bike_id, rental_date_from]);

// //     return rented;
// //   } catch (error) {
// //     throw error;
// //   }
// // }

module.exports = {
  requireUser,
  requiredNotSent,
  // calculateRentalPrice,
  // checkRentalExists
}