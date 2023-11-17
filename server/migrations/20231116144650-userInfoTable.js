"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UserInformation", {
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
					model: "Users", // name of the table
					key: "id", // column in the table
				},
			},
			location: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			homeOwnership: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			milesDriven: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			commute: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			transportation: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			daysCommute: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			hasCar: {
				type: Sequelize.STRING,
				allowNull: false,
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
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("UserInformation");
	},
};
