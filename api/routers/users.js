const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsersController = require("../controllers/users");

//importuje model usera
const User = require("../models/user");

//założenie konta - post
router.post("/singup", UsersController.user_singUp
);

//zalogowanie
router.post("/login", UsersController.user_login
 )

//skasowanie konta
router.delete("/:userId", UsersController.user_deliteAccount
 ) 

module.exports = router;