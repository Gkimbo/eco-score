class CarSerializer {
	static serializeArray(carArray) {
		const allowedAttributes = [
			"model",
			"make",
			"year",
			"fuelType",
			"carBatterySize",
		];
		const serializedCar = carArray.map((car) => {
			const newCar = {};
			for (const attribute of allowedAttributes) {
				newCar[attribute] = car.dataValues[attribute];
			}
			return newCar;
		});

		return serializedCar;
	}
}

module.exports = CarSerializer;
