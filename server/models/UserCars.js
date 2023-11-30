module.exports = (sequelize, DataTypes) => {
	// Define the UserCars model
	const UserCars = sequelize.define("UserCars", {
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
		make: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		model: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		year: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		tank: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fuelType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		carBatterySize: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mileageUnit: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mileage: {
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
	UserCars.associate = (models) => {
		UserCars.belongsTo(models.User, {
			foreignKey: "userId",
			as: "user",
		});
	};

	return UserCars;
};
