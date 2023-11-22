module.exports = (sequelize, DataTypes) => {
	// Define the UserHomes model
	const UserHomes = sequelize.define("UserHomes", {
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
		zipcode: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		heatSource: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		airConditioning: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		squareFeet: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		electricitySource: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		electricityUsage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		recycling: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		compost: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ovenType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		yearBuilt: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	});

	// Define the one-to-many relationship with User
	UserHomes.associate = (models) => {
		UserHomes.belongsTo(models.User, {
			foreignKey: "userId",
			as: "user",
		});
	};

	return UserHomes;
};
