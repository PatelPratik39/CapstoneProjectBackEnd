// Helper Function for our App

const client = require("./client");
const { rebuildDB } = require("./seedData");
// const seedData = require("./db/seedData");

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
