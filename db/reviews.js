const client = require("./client");
const util = require("./util");

// database functions
// get all reviews
async function getAllReviews() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM reviews;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get review by id
async function getReviewById(reviewId) {
  try {
    const {
      rows: [review]
    } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE id = $1;
        `,
      [reviewId]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

// // create new review
async function createReviewData({
  movie_id,
  user_id,
  rating,
  comment,
  review_date
}) {
  try {
    const {
      rows: [review]
    } = await client.query(
      `
        INSERT INTO reviews(movie_id, user_id, rating, comment, review_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [movie_id, user_id, rating, comment, review_date]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

// // add new review
async function createReview({
  movie_id,
  user_id,
  rating,
  comment,
  review_date
}) {
  try {
    const {
      rows: [review]
    } = await client.query(
      `
        INSERT INTO reviews(movie_id, user_id, rating, comment, review_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [movie_id, user_id, rating, comment, review_date]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

// update review by id
async function updateReviewById(reviewId, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [review]
    } = await client.query(
      `
        UPDATE reviews
        SET ${setString}
        WHERE id=${reviewId}
        RETURNING *;
        `,
      Object.values(fields)
    );
    return review;
  } catch (error) {
    throw error;
  }
}

// delete review by id
async function deleteReviewById(reviewId) {
  try {
    const {
      rows: [review]
    } = await client.query(
      `
        DELETE FROM reviews
        WHERE id=$1
        RETURNING *;
        `,
      [reviewId]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

// // delete all reviews
async function deleteAllReviews() {
  try {
    const { rows } = await client.query(`
        DELETE FROM reviews;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get reviews by movie id
async function getReviewsByMovieId(movieId) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE movie_id = $1;
        `,
      [movieId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

//get reviews by userId
async function getReviewsByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM reviews
        WHERE user_id = $1;
        `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

// export functions
module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  createReviewData,
  updateReviewById,
  deleteReviewById,
  deleteAllReviews,
  getReviewsByMovieId,
  getReviewsByUserId


};
