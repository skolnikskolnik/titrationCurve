const express = require("express");
const path = require('path');
const orm = require("../config/orm.js");
const books = require("../models/titration.js");


const router = express.Router();


// Import the model (titration.js) to use its database functions.
const titration = require("../models/titration.js");

// Export routes for server.js to use.
module.exports = router;

