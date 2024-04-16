const { Client } = require("pg"); // imports the pg module


const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/",
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined
});


module.exports = client;