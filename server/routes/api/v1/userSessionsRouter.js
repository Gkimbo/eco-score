/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");
const User = require("../../../models/models/User");
const bcrypt = require("bcrypt");

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
		console.log(user);
		if (user) {
			const passwordMatch = await bcrypt.compare(password, user.password);
			if (passwordMatch) {
				req.login(user, (err) => {
					if (err) {
						console.error(err);
						res.status(500).json({ message: "Internal server error" });
					} else {
						res.status(200).json({ message: "User logged in" });
					}
				});
			} else {
				res.status(401).json({ message: "Invalid username or password" });
			}
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
});

sessionRouter.get("/current", isAuthenticated, async (req, res) => {
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
