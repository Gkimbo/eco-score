export interface EcoProduct {
	id: string;
	name: string;
	description: string;
	icon: string;
	url: string;
	priceRange: string;
	co2Impact: string;
}

export interface ProductCategory {
	id: string;
	name: string;
	icon: string;
	color: string;
	products: EcoProduct[];
}

export const ecoProductsData: ProductCategory[] = [
	{
		id: "electric_vehicles",
		name: "Electric Vehicles",
		icon: "🚗",
		color: "#3498db",
		products: [
			{
				id: "ev_1",
				name: "Tesla Model 3",
				description: "Popular long-range EV with up to 333 miles range. Supercharger network access included.",
				icon: "⚡",
				url: "https://www.tesla.com/model3",
				priceRange: "$40,000 - $55,000",
				co2Impact: "Save ~4.6 tons CO2/year vs gas car",
			},
			{
				id: "ev_2",
				name: "Chevrolet Bolt EUV",
				description: "Affordable electric SUV with 247 miles range. Available Super Cruise hands-free driving.",
				icon: "⚡",
				url: "https://www.chevrolet.com/electric/bolt-euv",
				priceRange: "$28,000 - $35,000",
				co2Impact: "Save ~4.2 tons CO2/year vs gas car",
			},
			{
				id: "ev_3",
				name: "Nissan Leaf",
				description: "Proven and affordable EV with up to 226 miles range. Great for daily commuting.",
				icon: "⚡",
				url: "https://www.nissanusa.com/vehicles/electric-cars/leaf.html",
				priceRange: "$28,000 - $38,000",
				co2Impact: "Save ~4.0 tons CO2/year vs gas car",
			},
			{
				id: "ev_4",
				name: "Ford Mustang Mach-E",
				description: "Sporty electric SUV with up to 312 miles range. Ford's flagship EV.",
				icon: "⚡",
				url: "https://www.ford.com/suvs/mach-e/",
				priceRange: "$43,000 - $65,000",
				co2Impact: "Save ~4.5 tons CO2/year vs gas car",
			},
			{
				id: "ev_5",
				name: "Hyundai Ioniq 6",
				description: "Aerodynamic sedan with up to 361 miles range. Ultra-fast 800V charging.",
				icon: "⚡",
				url: "https://www.hyundaiusa.com/us/en/vehicles/ioniq-6",
				priceRange: "$42,000 - $56,000",
				co2Impact: "Save ~4.7 tons CO2/year vs gas car",
			},
		],
	},
	{
		id: "solar_energy",
		name: "Solar & Energy",
		icon: "☀️",
		color: "#f39c12",
		products: [
			{
				id: "solar_1",
				name: "EnergySage Solar Marketplace",
				description: "Compare quotes from pre-screened solar installers. Average savings of $20,000+ over 20 years.",
				icon: "☀️",
				url: "https://www.energysage.com/",
				priceRange: "$15,000 - $25,000 (before credits)",
				co2Impact: "Save 3-4 tons CO2/year",
			},
			{
				id: "solar_2",
				name: "Tesla Powerwall",
				description: "Home battery backup system. Store solar energy for use at night or during outages.",
				icon: "🔋",
				url: "https://www.tesla.com/powerwall",
				priceRange: "$11,500 installed",
				co2Impact: "Maximize solar usage, reduce grid dependence",
			},
			{
				id: "solar_3",
				name: "Google Nest Thermostat",
				description: "Smart thermostat that learns your schedule. Saves average of 10-12% on heating/cooling.",
				icon: "🌡️",
				url: "https://store.google.com/product/nest_thermostat",
				priceRange: "$130 - $250",
				co2Impact: "Save 500-1000 lbs CO2/year",
			},
			{
				id: "solar_4",
				name: "Ecobee Smart Thermostat",
				description: "Smart thermostat with room sensors. Adjusts for occupancy to avoid wasting energy.",
				icon: "🌡️",
				url: "https://www.ecobee.com/",
				priceRange: "$190 - $250",
				co2Impact: "Save 500-1000 lbs CO2/year",
			},
			{
				id: "solar_5",
				name: "Sense Energy Monitor",
				description: "Track home energy usage in real-time. Identify energy hogs and reduce waste.",
				icon: "📊",
				url: "https://sense.com/",
				priceRange: "$300",
				co2Impact: "Typical 5-10% energy reduction",
			},
		],
	},
	{
		id: "home_garden",
		name: "Home & Garden",
		icon: "🏡",
		color: "#27ae60",
		products: [
			{
				id: "home_1",
				name: "Composting Bin",
				description: "Turn food scraps into nutrient-rich compost. Reduces methane from landfills.",
				icon: "🌱",
				url: "https://www.amazon.com/s?k=composting+bin",
				priceRange: "$30 - $150",
				co2Impact: "Divert 200+ lbs waste/year from landfill",
			},
			{
				id: "home_2",
				name: "LED Light Bulb Pack",
				description: "Energy-efficient bulbs that last 25x longer than incandescent. Use 75% less energy.",
				icon: "💡",
				url: "https://www.amazon.com/s?k=led+light+bulbs",
				priceRange: "$15 - $40 for pack",
				co2Impact: "Save 500+ lbs CO2/year",
			},
			{
				id: "home_3",
				name: "Rain Barrel",
				description: "Collect rainwater for garden irrigation. Reduces water bills and storm runoff.",
				icon: "💧",
				url: "https://www.amazon.com/s?k=rain+barrel",
				priceRange: "$80 - $200",
				co2Impact: "Save 1,300 gallons water/year",
			},
			{
				id: "home_4",
				name: "Smart Power Strip",
				description: "Automatically cuts phantom power to devices. Stops energy vampires.",
				icon: "🔌",
				url: "https://www.amazon.com/s?k=smart+power+strip",
				priceRange: "$25 - $50",
				co2Impact: "Save 100-200 lbs CO2/year",
			},
			{
				id: "home_5",
				name: "Low-Flow Showerhead",
				description: "Reduce water usage by 40% without sacrificing pressure. Easy installation.",
				icon: "🚿",
				url: "https://www.amazon.com/s?k=low+flow+showerhead",
				priceRange: "$15 - $50",
				co2Impact: "Save 2,700 gallons water/year",
			},
		],
	},
	{
		id: "transportation_alt",
		name: "Alternative Transport",
		icon: "🚲",
		color: "#9b59b6",
		products: [
			{
				id: "trans_1",
				name: "Rad Power Bikes",
				description: "America's #1 e-bike brand. Models for commuting, cargo, and recreation.",
				icon: "🚲",
				url: "https://www.radpowerbikes.com/",
				priceRange: "$1,100 - $2,000",
				co2Impact: "Zero emissions, replace car trips",
			},
			{
				id: "trans_2",
				name: "Lectric eBikes",
				description: "Affordable folding e-bikes perfect for commuting. Compact storage.",
				icon: "🚲",
				url: "https://lectricebikes.com/",
				priceRange: "$800 - $1,500",
				co2Impact: "Zero emissions, replace car trips",
			},
			{
				id: "trans_3",
				name: "Segway Electric Scooter",
				description: "Portable electric scooter for short trips. Folds for easy carrying.",
				icon: "🛴",
				url: "https://www.amazon.com/s?k=segway+electric+scooter",
				priceRange: "$300 - $800",
				co2Impact: "Zero emissions for short trips",
			},
			{
				id: "trans_4",
				name: "Quality Bike Lock",
				description: "Secure your bike investment. U-locks provide the best theft protection.",
				icon: "🔒",
				url: "https://www.amazon.com/s?k=kryptonite+bike+lock",
				priceRange: "$50 - $120",
				co2Impact: "Protect your eco-friendly transport",
			},
		],
	},
	{
		id: "everyday_items",
		name: "Everyday Items",
		icon: "🌿",
		color: "#1abc9c",
		products: [
			{
				id: "everyday_1",
				name: "Hydro Flask Water Bottle",
				description: "Insulated stainless steel bottle. Keeps drinks cold 24hrs or hot 12hrs.",
				icon: "💧",
				url: "https://www.hydroflask.com/",
				priceRange: "$30 - $50",
				co2Impact: "Replace 167 plastic bottles/year",
			},
			{
				id: "everyday_2",
				name: "Reusable Produce Bags",
				description: "Mesh bags for fruits and vegetables. Replace single-use plastic bags.",
				icon: "🥬",
				url: "https://www.amazon.com/s?k=reusable+produce+bags",
				priceRange: "$10 - $20 for set",
				co2Impact: "Eliminate 100+ plastic bags/year",
			},
			{
				id: "everyday_3",
				name: "Beeswax Food Wraps",
				description: "Reusable alternative to plastic wrap. Natural and compostable.",
				icon: "🐝",
				url: "https://www.amazon.com/s?k=beeswax+food+wraps",
				priceRange: "$15 - $25",
				co2Impact: "Replace rolls of plastic wrap",
			},
			{
				id: "everyday_4",
				name: "Bamboo Utensil Set",
				description: "Portable utensil kit for on-the-go meals. Avoid single-use plastics.",
				icon: "🥢",
				url: "https://www.amazon.com/s?k=bamboo+utensil+set+travel",
				priceRange: "$10 - $20",
				co2Impact: "Eliminate disposable utensil waste",
			},
			{
				id: "everyday_5",
				name: "Eco-Friendly Cleaning Set",
				description: "Plant-based, biodegradable cleaning products. Safe for your home and planet.",
				icon: "🧹",
				url: "https://www.amazon.com/s?k=eco+friendly+cleaning+products",
				priceRange: "$20 - $40",
				co2Impact: "Reduce chemical pollution",
			},
			{
				id: "everyday_6",
				name: "Reusable Shopping Bags",
				description: "Durable bags that fold small. Keep in your car or bag for shopping trips.",
				icon: "🛍️",
				url: "https://www.amazon.com/s?k=reusable+shopping+bags",
				priceRange: "$10 - $25 for set",
				co2Impact: "Replace 500+ plastic bags/year",
			},
		],
	},
];

export const getTotalProducts = (): number => {
	return ecoProductsData.reduce((total, category) => total + category.products.length, 0);
};
