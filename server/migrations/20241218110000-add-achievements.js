"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Create UserAchievements table
		await queryInterface.createTable("UserAchievements", {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
			},
			achievementId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			completedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});

		// Add streak fields to UserInformation
		await queryInterface.addColumn("UserInformation", "lastCheckIn", {
			type: Sequelize.DATE,
			allowNull: true,
		});

		await queryInterface.addColumn("UserInformation", "checkInStreak", {
			type: Sequelize.INTEGER,
			allowNull: true,
			defaultValue: 0,
		});

		await queryInterface.addColumn("UserInformation", "tipsRead", {
			type: Sequelize.TEXT,
			allowNull: true,
			defaultValue: "[]",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("UserAchievements");
		await queryInterface.removeColumn("UserInformation", "lastCheckIn");
		await queryInterface.removeColumn("UserInformation", "checkInStreak");
		await queryInterface.removeColumn("UserInformation", "tipsRead");
	},
};
