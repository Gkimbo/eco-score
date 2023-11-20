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
					onDelete: "CASCADE", // cascade deletes
				},
			},
			zipcode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			homeOwnership: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			milesDriven: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			milesDrivenUnit: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			commute: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			transportation: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			daysCommute: {
				type: Sequelize.STRING,
				allowNull: true,
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
