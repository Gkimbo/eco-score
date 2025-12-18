/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

require("dotenv").config();
require("./passport-config");

const rootRouter = require("./routes/rootRouter");

// Allowed origins for CORS (iOS, Android, and Web)
const allowedOrigins = [
	"http://localhost:19006",    // Expo web dev
	"http://localhost:8081",     // Metro bundler
	"http://localhost:19000",    // Expo Go
	"http://localhost:3000",     // Local dev
	"exp://localhost:8081",      // Expo Go on iOS
	process.env.PRODUCTION_URL,  // Production URL if set
].filter(Boolean);

const secretKey = process.env.SESSION_SECRET;

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration for all platforms
app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (mobile apps, Postman, etc.)
			if (!origin) return callback(null, true);

			if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("exp://") || origin.includes("localhost")) {
				callback(null, true);
			} else {
				callback(null, true); // Allow all origins in development
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "Accept"],
	})
);
app.use(
	session({
		secret: secretKey,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
		},
	})
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(rootRouter);

// Start the server
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
