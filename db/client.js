const { Client } = require("pg"); // imports the pg module


const connectionString =
  process.env.DATABASE_URL || "https://localhost:5432";
//process.env.DATABASE_URL || "https://localhost:3000/capstonebackend";
const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});

module.exports = client;
