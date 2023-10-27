const express = require("express");
const User = require("../../../models/models/User");

const usersRouter = express.Router();

usersRouter.post("/login", async (req, res) => {
	try {
		const { username, password, email } = req.body;

		const newUser = await User.create({
			username,
			password,
			email,
		});

		res.status(201).json(newUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = usersRouter;
