const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User");

const sequelize = new Sequelize(
	"eco-score_development",
	"postgres",
	"password",
	{
		host: "localhost",
		port: 5432,
		dialect: "postgres",
	}
);
// Define the UserInformation model
const UserInformation = sequelize.define("UserInformation", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	location: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	homeOwnership: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	milesDriven: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	commute: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	transportation: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	daysCommute: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	hasCar: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
	},
});

// Define the association
// User.hasMany(UserInformation, { foreignKey: "userId" });
// UserInformation.belongsTo(User, { foreignKey: "userId" });

module.exports = UserInformation;
