const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CalendarController = require("../controllers/calendar");

//importuje model usera
//const User = require("../models/user");

//założenie konta - post
router.get("/", CalendarController.get_events
);

module.exports = router;