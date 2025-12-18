"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("UserHomes", "propane", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("UserHomes", "propaneUsage", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("UserHomes", "wood", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("UserHomes", "woodUsage", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("UserHomes", "woodType", {
			type: Sequelize.STRING,
			allowNull: true,
		});
		await queryInterface.addColumn("UserHomes", "electricHeat", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("UserHomes", "propane");
		await queryInterface.removeColumn("UserHomes", "propaneUsage");
		await queryInterface.removeColumn("UserHomes", "wood");
		await queryInterface.removeColumn("UserHomes", "woodUsage");
		await queryInterface.removeColumn("UserHomes", "woodType");
		await queryInterface.removeColumn("UserHomes", "electricHeat");
	},
};
