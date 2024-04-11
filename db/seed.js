// Helper Function for our App

const client = require("./client");
const { rebuildDB, testDB } = require("/seedData");

rebuildDB()
  .catch(console.log("An Error Occured ! "))
  .finaly(() => client.end());
