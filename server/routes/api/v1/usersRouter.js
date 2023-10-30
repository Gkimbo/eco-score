const express = require("express");
const User = require("../../../models/models/User");
const UserSerializer = require("../../../serializers/userSerializer");

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
	try {
		const { username, password, email } = req.body;
		let existingUser = null;
		existingUser = await User.findOne({ where: { email } });
		if (!existingUser) {
			existingUser = await User.findOne({ where: { username } });
			if (!existingUser) {
				const newUser = await User.create({
					username,
					password,
					email,
				});
				const serializedUser = UserSerializer.serializeOne(newUser);
				return res.status(201).json(serializedUser);
			} else {
				return res.status(410).json("Username already exists");
			}
		} else {
			return res.status(409).json("User already exists");
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = usersRouter;
