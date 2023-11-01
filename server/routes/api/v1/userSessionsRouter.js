/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const User = require("../../../models/models/User");
const bcrypt = require("bcrypt");
const UserSerializer = require("../../../serializers/userSerializer");

const sessionRouter = express.Router();

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json(undefined);
};

sessionRouter.post("/", passport.authenticate("local"), async (req, res) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

sessionRouter.post("/login", async (req, res) => {
	const { username, password } = req.body;
	console.log(req.body);

	try {
		const user = await User.findOne({ where: { username } });
		if (user) {
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (passwordMatch) {
				req.login(user, (err) => {
					if (err) {
						console.error(err);
						res.status(500).json({ message: "Internal server error" });
					} else {
						const serializedUser = UserSerializer.serializeOne(user);
						return res.status(201).json({ user: serializedUser });
					}
				});
			} else {
				res.status(401).json("Invalid password");
			}
		} else {
			res.status(404).json("No Username");
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

sessionRouter.get("/current", async (req, res) => {
	console.log("HELLOOOOOOOOOOO", req);
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

sessionRouter.delete("/", (req, res) => {
	req.logout();
	res.status(200).json({ message: "User signed out" });
});

module.exports = sessionRouter;
