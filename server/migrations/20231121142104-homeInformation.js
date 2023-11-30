"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UserHomes", {
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
			zipcode: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			yearBuilt: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			squareFeet: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			electricitySource: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			electricityUsage: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			recycling: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			compost: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gasUnit: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			gasUsage: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			oilUsage: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			oilUnit: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			oilVolume: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			oil: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			gas: {
				type: Sequelize.STRING,
				allowNull: true,
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
		await queryInterface.dropTable("UserHomes");
	},
};
