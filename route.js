const express = require("express");
const user = require("./models/user"); // new
const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
	const users = await user.find()
	res.send(users)
})

module.exports = router