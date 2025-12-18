module.exports = (sequelize, DataTypes) => {
	const UserAchievements = sequelize.define("UserAchievements", {
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
		achievementId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		completedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
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

	UserAchievements.associate = (models) => {
		UserAchievements.belongsTo(models.User, {
			foreignKey: "userId",
			as: "user",
		});
	};

	return UserAchievements;
};
