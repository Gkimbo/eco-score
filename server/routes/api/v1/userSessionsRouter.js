/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require("express");
const passport = require("passport");

const sessionRouter = new express.Router();

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json(undefined);
};

sessionRouter.post("/", passport.authenticate("local"), (req, res) => {
	res.status(201).json(req.user);
});

sessionRouter.get("/current", isAuthenticated, (req, res) => {
	res.status(200).json(req.user);
});

sessionRouter.delete("/", (req, res) => {
	req.logout();
	res.status(200).json({ message: "User signed out" });
});

module.exports = sessionRouter;
