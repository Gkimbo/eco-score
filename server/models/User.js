const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	// Define the User model
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	// Hash the password before saving the user
	User.beforeCreate(async (user) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(user.password, salt);
			user.password = hashedPassword;
		} catch (error) {
			throw new Error(error);
		}
	});

	// Method to validate the password
	User.prototype.validPassword = async function (password) {
		try {
			return await bcrypt.compare(password, this.password);
		} catch (error) {
			throw new Error(error);
		}
	};

	// Define the one-to-many relationship with UserInformation
	User.associate = (models) => {
		User.hasMany(models.UserInformation, {
			foreignKey: "userId",
			as: "userInformation",
		});
		User.hasMany(models.UserCars, {
			foreignKey: "userId",
			as: "UserCars",
		});
	};

	return User;
};
