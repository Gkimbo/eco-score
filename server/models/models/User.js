const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Step 1: Create a new instance of the Sequelize class and define the database connection
const sequelize = new Sequelize("mydatabase", "username", "password", {
	host: "localhost",
	dialect: "postgres",
});

// Step 2: Define the User model
const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

// Step 3: Hash the password before saving the user
User.beforeCreate(async (user) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user.password, salt);
		user.password = hashedPassword;
	} catch (error) {
		throw new Error(error);
	}
});

// Step 4: Method to validate the password
User.prototype.validPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

// Step 5: Synchronize the models with the database
sequelize
	.sync()
	.then(() => {
		console.log("Database synchronized");
	})
	.catch((error) => {
		console.error("Error synchronizing database:", error);
	});

module.exports = User;
