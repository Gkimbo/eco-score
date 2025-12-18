export interface EcoTip {
	id: string;
	title: string;
	description: string;
	impact: "high" | "medium" | "low";
	stars: number;
}

export interface TipCategory {
	id: string;
	name: string;
	icon: string;
	color: string;
	tips: EcoTip[];
}

export const ecoTipsData: TipCategory[] = [
	{
		id: "transportation",
		name: "Transportation",
		icon: "🚗",
		color: "#3498db",
		tips: [
			{
				id: "transport_1",
				title: "Drive Less, Walk or Bike More",
				description: "For short trips under 2 miles, consider walking or biking. This eliminates emissions entirely and improves your health. The average car emits about 0.9 pounds of CO2 per mile.",
				impact: "high",
				stars: 2,
			},
			{
				id: "transport_2",
				title: "Carpool or Use Public Transit",
				description: "Sharing rides cuts your carbon footprint in half or more. Public transit produces 45% less CO2 per mile than driving alone. Apps like Waze Carpool make it easy to find rides.",
				impact: "high",
				stars: 2,
			},
			{
				id: "transport_3",
				title: "Consider an Electric Vehicle",
				description: "EVs produce zero direct emissions. Even accounting for electricity generation, EVs typically produce 50-70% less CO2 than gas cars over their lifetime.",
				impact: "high",
				stars: 2,
			},
			{
				id: "transport_4",
				title: "Keep Tires Properly Inflated",
				description: "Under-inflated tires can lower gas mileage by 0.2% for every 1 PSI drop. Check your tire pressure monthly - it can improve fuel economy by up to 3%.",
				impact: "low",
				stars: 2,
			},
			{
				id: "transport_5",
				title: "Combine Errands Into Single Trips",
				description: "Several short trips from a cold start can use twice as much fuel as one longer multi-purpose trip. Plan your route efficiently to reduce total miles driven.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "transport_6",
				title: "Maintain Your Vehicle",
				description: "Regular tune-ups, clean air filters, and proper maintenance can improve fuel economy by up to 4%. A well-maintained car also lasts longer, reducing manufacturing emissions.",
				impact: "medium",
				stars: 2,
			},
		],
	},
	{
		id: "home_energy",
		name: "Home Energy",
		icon: "🏠",
		color: "#27ae60",
		tips: [
			{
				id: "home_1",
				title: "Switch to LED Light Bulbs",
				description: "LED bulbs use 75% less energy than incandescent bulbs and last 25 times longer. Replacing 5 bulbs can save $75 per year on electricity.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "home_2",
				title: "Use a Programmable Thermostat",
				description: "Smart thermostats can reduce heating/cooling costs by 10-15%. Set it to adjust when you're asleep or away - even a 1°F adjustment saves 1% on your energy bill.",
				impact: "high",
				stars: 2,
			},
			{
				id: "home_3",
				title: "Seal Air Leaks",
				description: "Air leaks around windows and doors can waste 25-30% of your heating/cooling energy. Use weatherstripping and caulk to seal gaps - it pays for itself within a year.",
				impact: "high",
				stars: 2,
			},
			{
				id: "home_4",
				title: "Unplug Devices When Not in Use",
				description: "Phantom power from plugged-in devices can account for 10% of your electricity bill. Use power strips to easily disconnect electronics, or unplug chargers when not in use.",
				impact: "low",
				stars: 2,
			},
			{
				id: "home_5",
				title: "Consider Solar Panels",
				description: "Solar panels can reduce your carbon footprint by 3-4 tons of CO2 per year. With federal tax credits and falling prices, the average payback period is now 6-8 years.",
				impact: "high",
				stars: 2,
			},
			{
				id: "home_6",
				title: "Wash Clothes in Cold Water",
				description: "About 90% of the energy used by washing machines goes to heating water. Cold water cleans most clothes just as well and can save $60+ per year.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "home_7",
				title: "Air Dry Your Laundry",
				description: "Dryers are one of the most energy-intensive appliances. Air drying clothes just once a week can save 100+ pounds of CO2 per year.",
				impact: "medium",
				stars: 2,
			},
		],
	},
	{
		id: "reduce_recycle",
		name: "Reduce & Recycle",
		icon: "♻️",
		color: "#9b59b6",
		tips: [
			{
				id: "recycle_1",
				title: "Start Composting",
				description: "Food waste in landfills produces methane, a greenhouse gas 25x more potent than CO2. Composting diverts waste and creates nutrient-rich soil for gardens.",
				impact: "high",
				stars: 2,
			},
			{
				id: "recycle_2",
				title: "Use Reusable Bags & Containers",
				description: "A single reusable bag can replace 700 disposable bags over its lifetime. Reusable containers reduce plastic waste and keep food fresher longer.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "recycle_3",
				title: "Buy Products With Less Packaging",
				description: "Packaging accounts for about 30% of municipal waste. Choose products with minimal or recyclable packaging, and buy in bulk when possible.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "recycle_4",
				title: "Recycle Properly",
				description: "Contaminated recycling often ends up in landfills. Rinse containers, remove caps, and check local guidelines - when in doubt, throw it out.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "recycle_5",
				title: "Donate Instead of Throwing Away",
				description: "Extending a product's life by just 9 months reduces its carbon footprint by 20-30%. Donate clothes, furniture, and electronics to keep them out of landfills.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "recycle_6",
				title: "Go Paperless",
				description: "Switch to digital bills, receipts, and documents. The average office worker uses 10,000 sheets of paper per year - going paperless saves trees and energy.",
				impact: "low",
				stars: 2,
			},
		],
	},
	{
		id: "diet_lifestyle",
		name: "Diet & Lifestyle",
		icon: "🥗",
		color: "#e67e22",
		tips: [
			{
				id: "diet_1",
				title: "Eat Less Meat (Especially Beef)",
				description: "Beef production generates 20x more greenhouse gases than beans per gram of protein. Replacing beef with chicken just once a week saves 340 lbs of CO2 per year.",
				impact: "high",
				stars: 2,
			},
			{
				id: "diet_2",
				title: "Buy Local and Seasonal Produce",
				description: "Imported food travels an average of 1,500 miles. Local, seasonal produce has a fraction of the transportation emissions and is often fresher and more nutritious.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "diet_3",
				title: "Reduce Food Waste",
				description: "40% of food in the US is wasted. Plan meals, use leftovers creatively, and understand expiration dates - 'best by' doesn't mean unsafe after.",
				impact: "high",
				stars: 2,
			},
			{
				id: "diet_4",
				title: "Use a Reusable Water Bottle",
				description: "Americans buy 50 billion plastic water bottles per year. A reusable bottle pays for itself in weeks and keeps hundreds of bottles out of landfills.",
				impact: "low",
				stars: 2,
			},
			{
				id: "diet_5",
				title: "Choose Sustainable Products",
				description: "Look for certifications like Energy Star, FSC, and Fair Trade. These products meet environmental standards and support sustainable practices.",
				impact: "medium",
				stars: 2,
			},
			{
				id: "diet_6",
				title: "Reduce Single-Use Plastics",
				description: "Bring your own utensils, straws, and containers. Single-use plastics take 400+ years to decompose and often end up in oceans harming wildlife.",
				impact: "medium",
				stars: 2,
			},
		],
	},
];

export const getTotalTips = (): number => {
	return ecoTipsData.reduce((total, category) => total + category.tips.length, 0);
};

export const getTotalStarsAvailable = (): number => {
	return ecoTipsData.reduce(
		(total, category) =>
			total + category.tips.reduce((catTotal, tip) => catTotal + tip.stars, 0),
		0
	);
};
