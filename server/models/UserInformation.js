module.exports = (sequelize, DataTypes) => {
	// Define the UserInformation model
	const UserInformation = sequelize.define(
		"UserInformation",
		{
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
			treesPlanted: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			rewards: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			lastCheckIn: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			checkInStreak: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			tipsRead: {
				type: DataTypes.TEXT,
				allowNull: true,
				defaultValue: "[]",
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
		},
		{
			tableName: "UserInformation",
		}
	);

	// Define the one-to-many relationship with User
	UserInformation.associate = (models) => {
		UserInformation.belongsTo(models.User, {
			foreignKey: "userId",
			as: "user",
		});
	};

	return UserInformation;
};
