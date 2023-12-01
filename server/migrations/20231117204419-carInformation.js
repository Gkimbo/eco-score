"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("UserCars", {
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
			make: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			model: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			year: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			tank: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			fuelType: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			carBatterySize: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			zipcode: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mileage: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mileageUnit: {
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
		await queryInterface.dropTable("UserCars");
	},
};
