export type Car = {
    make: string;
    model: string;
    year: string;
    tank: string;
    fuelType: "gas" | "diesel" | "hybrid" | "electricity";
    carBatterySize: string;
    zipCode: string;
    mileage: string;
	mileageUnit: string;
} 

export type Home = {
    zipcode: string;
    yearBuilt: string;
    squareFeet: string;
    electricitySource: string;
    electricityUsage: string;
    recycling: string;
    compost: string;
    electricityUnit: string;
    gasUnit: string;
	gasUsage: string;
	oilUsage: string;
	oilUnit: string;
    oilVolume: string;
    oil:string;
    gas: string;
    batteryBackup: string;
    batteryBankSize: string;
};