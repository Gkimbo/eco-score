const express = require("express");
const User = require("../../../models/User");

const usersRouter = new express.Router();

usersRouter.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Create a new user
		const newUser = new User({
			username,
			password,
		});

		// Save the new user to the database
		const savedUser = await newUser.save();

		res.status(201).json(savedUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = usersRouter;
