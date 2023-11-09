const express = require("express");
const User = require("../../../models/models/User");
const jwt = require("jsonwebtoken");
const UserSerializer = require("../../../serializers/userSerializer");
// const authenticateToken = require("../../../middleware/authenticatedToken");

const userInfoRouter = express.Router();
const secretKey = process.env.SESSION_SECRET;

userInfoRouter.post("/", async (req, res) => {
	const { token } = req.body.user;
	try {
		const decodedToken = jwt.verify(token, secretKey);
		const userId = decodedToken.userId;
		const user = await User.findOne({ where: { id: userId } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		// const serializedUser = UserSerializer.serialize(user);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(401).json({ error: "Invalid or expired token" });
	}
});

module.exports = userInfoRouter;
