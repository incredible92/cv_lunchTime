const express = require("express");
const User = require("./models/user"); // new
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
	const users = await User.find()
	res.send(users)
})

module.exports = router