export type Car = {
    make: string;
    model: string;
    year: string;
    tank: string;
    fuelType: "gas" | "diesel" | "hybrid" | "electricity";
    carBatterySize: string;
    zipCode: string;
    carbonPerTank: string;
    carbonPerCharge: string;
    carbonToMakeBattery: string;
} 

export type Home = {
    zipcode: string;
    yearBuilt: string;
    heatSource: string;
    airConditioning: string;
    airConditioningSource: string;
    squareFeet: string;
    electricitySource: string;
    electricityUsage: string;
    recycling: string;
    compost: string;
    ovenType: string;
    electricityUnit: string;
};