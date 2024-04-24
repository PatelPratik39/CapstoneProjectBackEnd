const client = require("./client");
const util = require("util");

// database functions
// get all movies
async function getAllMovies() {
  try {
    const { rows } = await client.query(`
        SELECT *
        FROM movies;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// get movie by id
async function getMovieById(movieId) {
  try {
    const {
      rows: [movie]
    } = await client.query(
      `
        SELECT *
        FROM movies
        WHERE id = $1;
        `,
      [movieId]
    );
    return movie;
  } catch (error) {
    throw error;
  }
}

// create new movie requires title, title,
  // category,
  // release_date,
  // poster_url,
  // plot
async function createMovie({
  title,
  category,
  release_date,
  poster_url,
  plot
}) {
  try {
    const {
      rows: [movie]
    } = await client.query(
      `
        INSERT INTO movies(title,
            category,
            release_date,
            poster_url,
            plot)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [title, category, release_date, poster_url, plot]
    );
    return movie;
  } catch (error) {
    throw error;
  }
}

// update movie by id
async function updateMovieById(movieId, fields = {}) {
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
      rows: [movie]
    } = await client.query(
      `
        UPDATE movies
        SET ${setString}
        WHERE id=${movieId}
        RETURNING *;
        `,
      Object.values(fields)
    );
    
    return movie;
  } catch (error) {
    throw error;
  }
}
// delete movie by id
async function deleteMovieById(movieId) {
  try {
    // Check for related reviews and delete them
    await client.query(
      `
      DELETE FROM reviews
      WHERE movie_id = $1;
      `,
      [movieId]
    );

    // Delete the movie after handling related reviews
    const {
      rows: [movie]
    } = await client.query(
      `
      DELETE FROM movies
      WHERE id = $1
      RETURNING *;
      `,

      [movieId]
    );
    return movie;
  } catch (error) {
    throw error;
  }
}

// // delete movie by id
// async function deleteMovieById(movieId) {
//   try {
//     const {
//       rows: [movie]
//     } = await client.query(
//       `
//         DELETE FROM movies
//         WHERE id=$1
//         RETURNING *;
//         `,
//       [movieId]
//     );
//     return movie;
//   } catch (error) {
//     throw error;
//   }
// }

// // delete all movies
// async function deleteAllMovies() {
//   try {
//     const { rows } = await client.query(`
//         DELETE FROM movies;
//         `);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// export functions
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
  // deleteAllMovies
};
