const client = require("./client");

const { createUser, createMovie, createReview } = require("./");
/*
rentals - > reviews
bikes -> movie
*/
// drop all tables if any exist
async function dropTables() {
  try {
    console.log("Starting to drop tables...");
    await client.query(`
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS movies;
            `);
    console.log("Finished dropping tables!");
  } catch (error) {
    throw error;
  }
}
/*
1. // async function to create reviews

*/
// async function to create artists, songs, and artists_songs tables
async function createTables() {
  try {
    console.log("Starting to build OUR tables...");
    // we are on wait for database queries
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT,
            username TEXT UNIQUE NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            active BOOLEAN DEFAULT true
          );
        `);

    await client.query(`
        CREATE TABLE movies (
            id SERIAL PRIMARY KEY,
            title TEXT
            release_date DATE,
            category TEXT
            description TEXT,
            poster_url TEXT,
          );
      `);

    /*
need to get clear idea, what do we need instead of release dates
rental_date_from DATE,  
rental_date_to DATE,


review_id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    reviewer_name VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL,
    review_text TEXT,
    review_date DATE,
    CONSTRAINT fk_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies (movie_id)
        ON DELETE CASCADE
*/
    // need to insert a query for rating stars out of 5 range
    await client.query(`
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            movie_id INTEGER REFERENCES movie(id),
            user_id INTEGER REFERENCES users(id),
            rating INTEGER,
            comment TEXT,
            review_date DATE
          );
        `);

    console.log("Finished building tables!");
  } catch (error) {
    throw error;
  }
}

// async function to create initial users
/*
---> need to add email as username
*/
async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        name: "al",
        username: "albert",
        email: "john@example.com",
        password: "burts99"
      },
      {
        name: "sally",
        username: "sandra",
        email: "jane@example.com",
        password: "sassy123"
      },
      {
        name: "felicia",
        username: "glamgal",
        email: "alice@example.com",
        password: "glamgal123"
      }
    ];
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}
/*
Movie Review Database,
We are creating database for our review

*/
// async function to create initial users
async function createInitialMovies() {
  try {
    console.log("Starting to create Movies...");

    const moviesToCreate = [
      {
        title: "Dune: Part Two",
        category: "Science Fiction",
        release_date: "2024-03-01",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
        plot: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between love and duty, destiny and loyalty, and justice and vengeance, the fight for freedom comes at a high cost."
      },
      {
        title: "Dune",
        category: "Science Fiction",
        release_date: "2021-10-22",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        plot: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence—a commodity capable of unlocking humanity's greatest potential—only those who can conquer their fear will survive."
      },
      {
        title: "Guardians of the Galaxy",
        category: "Action, Science Fiction",
        release_date: "2014-08-01",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
        plot: "Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser."
      },
      {
        title: "Guardians of the Galaxy Vol. 2",
        category: "Action, Science Fiction",
        release_date: "2017-05-05",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
        plot: "The Guardians must fight to keep their newfound family together as they unravel the mysteries of Peter Quill's true parentage."
      },
      {
        title: "Guardians of the Galaxy Vol. 3",
        category: "Action, Science Fiction",
        release_date: "2023-05-05",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
        plot: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them."
      },
      {
        title: "The Hunger Games",
        category: "Action, Fantasy",
        release_date: "2012-03-23",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/yXCbOiVDCxO71zI7cuwBRXdftq8.jpg",
        plot: "Every year in the ruins of what was once North America, the nation of Panem forces each of its twelve districts to send a teenage boy and girl to compete in the Hunger Games. Part twisted entertainment, part government intimidation tactic, the Hunger Games are a nationally televised event in which “Tributes” must fight with one another until one survivor remains. Pitted against highly-trained Tributes who have prepared for these Games their entire lives, Katniss is forced to rely upon her sharp instincts as well as the mentorship of drunken former victor Haymitch Abernathy."
      },
      {
        title: "The Hunger Games: Catching Fire",
        category: "Action, Fantasy",
        release_date: "2013-11-22",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/9wGBnQDU4LqYJuGxSF4cmpvpFC5.jpg",
        plot: 'Katniss Everdeen has returned home safe after winning the 74th Annual Hunger Games along with fellow tribute Peeta Mellark. Winning means that they must turn around and leave their family and close friends, embarking on a "Victor\'s Tour" of the districts. Along the way Katniss senses that a rebellion is simmering, but the Capitol is still very much in control as President Snow prepares the 75th Annual Hunger Games (The Quarter Quell) - a competition that could change Panem forever.'
      },
      {
        title: "The Hunger Games: Mockingjay - Part 1",
        category: "Action, Fantasy",
        release_date: "2014-11-21",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/4FAA18ZIja70d1Tu5hr5cj2q1sB.jpg",
        plot: "Katniss Everdeen reluctantly becomes the symbol of a mass rebellion against the autocratic Capitol."
      },
      {
        title: "The Hunger Games: Mockingjay - Part 2",
        category: "Action, Fantasy",
        release_date: "2015-11-18",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/lImKHDfExAulp16grYm8zD5eONE.jpg",
        plot: "With the nation of Panem in a full-scale war, Katniss confronts President Snow in the final showdown."
      },
      {
        title: "Alien",
        category: "Horror, Science Fiction",
        release_date: "1979-05-25",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
        plot: "During its return to Earth, the commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed."
      },
      {
        title: "GoodFellas",
        category: "Drama, Crime",
        release_date: "1990-09-19",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        plot: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighborhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway."
      },
      {
        title: "The Truman Show",
        category: "Comedy, Drama",
        release_date: "1998-06-05",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/vuza0WqY239yBXOadKlGwJsZJFE.jpg",
        plot: "Truman Burbank is the star of The Truman Show, a 24-hour-a-day reality TV show that broadcasts every aspect of his life without his knowledge. His entire life has been an unending soap opera for consumption by the rest of the world. And everyone he knows, including his wife and his best friend, is really an actor, paid to be part of his life."
      },
      {
        title: "Good Will Hunting",
        category: "Drama",
        release_date: "1997-12-05",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg",
        plot: "When professors discover that an aimless janitor is also a math genius, a therapist helps the young man confront the demons that are holding him back."
      },
      {
        title: "Knives Out",
        category: "Comedy, Mystery",
        release_date: "2019-11-27",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
        plot: "When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan's dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self-serving lies to uncover the truth behind Harlan's untimely death."
      },
      {
        title: "Jaws",
        category: "Thriller",
        release_date: "1975-06-20",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
        plot: "When the seaside community of Amity finds itself under attack by a dangerous great white shark, the town's chief of police, a young marine biologist, and a grizzled hunter embark on a desperate quest to destroy the beast before it strikes again."
      },
      {
        title: "Groundhog Day",
        category: "Comedy",
        release_date: "1993-02-11",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/gCgt1WARPZaXnq523ySQEUKinCs.jpg",
        plot: "A narcissistic TV weatherman, along with his attractive-but-distant producer, and his mawkish cameraman, is sent to report on Groundhog Day in the small town of Punxsutawney, where he finds himself repeating the same day over and over."
      },
      {
        title: "Drive",
        category: "Thriller, Drama",
        release_date: "2011-09-16",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/602vevIURmpDfzbnv5Ubi6wIkQm.jpg",
        plot: "Driver is a skilled Hollywood stuntman who moonlights as a getaway driver for criminals. Though he projects an icy exterior, lately he's been warming up to a pretty neighbor named Irene and her young son, Benicio. When Irene's husband gets out of jail, he enlists Driver's help in a million-dollar heist. The job goes horribly wrong, and Driver must risk his life to protect Irene and Benicio from the vengeful masterminds behind the robbery."
      },
      {
        title: "The Dark Knight",
        category: "Action, Drama",
        release_date: "2008-07-18",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        plot: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
      },
      {
        title: "Parasite",
        category: "Thriller, Drama",
        release_date: "2019-10-11",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        plot: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident."
      },
      {
        title: "The Godfather",
        category: "Drama",
        release_date: "1972-03-24",
        poster_url:
          "https://www.themoviedb.org/t/p/w1280/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        plot: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
      }
    ];


    const movies = await Promise.all(
      moviesToCreate.map((movie) => {
        return createMovie({
          title: movie.title,
          category: movie.category,
          release_date: movie.release_date,
          poster_url: movie.poster_url,
          plot: movie.plot
        });
      })
    );

    console.log("Movies created:");
  } catch (error) {
    throw error;
  }
}

// async function to create initial artists
async function createInitialReviews() {
  try {
    console.log("Starting to create reviews...");

    // bike_id INTEGER REFERENCES bikes(id), user_id INTEGER REFERENCES users(id), rental_date_from DATE, rental_date_to DATE, total_price DECIMAL(10,2)
    const reviewsToCreate = [
      {
        movie_id: 1,
        user_id: 2,
        rating: 4,
        review_text: "Great movie, loved the storyline!",
        review_date: "2021-01-01"
      },
      {
        movie_id: 2,
        user_id: 3,
        rating: 5,
        review_text: "One of the best movies I've ever seen!",
        review_date: "2021-01-02"
      },
      {
        movie_id: 3,
        user_id: 1,
        rating: 3,
        review_text: "Decent movie, could have been better.",
        review_date: "2021-01-03"
      }
    ];
    const reviews = await Promise.all(
      reviewsToCreate.map((review) => {
        return createReview({
          movie_id: review.movie_id,
          user_id: review.user_id,
          rating: review.rating,
          review_text: review.review_text,
          review_date: review.review_date
        });
      })
    );

    console.log("Reviews created:");
  } catch (error) {
    throw error;
  }
}

// rebuild function to drop tables, create tables, and create initial users
async function rebuildDB() {
  try {
    client.connect();

    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialMovies();
    await createInitialReviews();
  } catch (error) {
    throw error;
  }
}

// export rebuildDB function
module.exports = {
  rebuildDB
};
