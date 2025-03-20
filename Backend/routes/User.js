const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
// const passport = require("passport");

router.post("/login", UserController.login);
router.post("/signup", UserController.signUp);
// router.get("/profile", UserController.profile);

module.exports = router;
