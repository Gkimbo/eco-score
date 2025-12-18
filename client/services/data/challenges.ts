export interface Achievement {
	id: string;
	name: string;
	description: string;
	icon: string;
	stars: number;
	type: "one_time" | "repeatable" | "milestone";
	category: "engagement" | "eco" | "social";
	condition?: {
		field: string;
		operator: "equals" | "gte" | "lte" | "contains";
		value: any;
	};
}

export interface DailyChallenge {
	id: string;
	name: string;
	description: string;
	icon: string;
	stars: number;
}

// One-time and milestone achievements
export const achievements: Achievement[] = [
	// Engagement Achievements
	{
		id: "first_login",
		name: "Welcome!",
		description: "Sign up and join the eco-community",
		icon: "👋",
		stars: 10,
		type: "one_time",
		category: "engagement",
	},
	{
		id: "complete_profile",
		name: "Profile Complete",
		description: "Fill out your basic information",
		icon: "📝",
		stars: 100,
		type: "one_time",
		category: "engagement",
	},
	{
		id: "first_car",
		name: "Road Warrior",
		description: "Add your first vehicle",
		icon: "🚗",
		stars: 50,
		type: "one_time",
		category: "engagement",
	},
	{
		id: "first_home",
		name: "Home Sweet Home",
		description: "Add your first home",
		icon: "🏠",
		stars: 50,
		type: "one_time",
		category: "engagement",
	},
	{
		id: "streak_7",
		name: "Week Warrior",
		description: "Check in 7 days in a row",
		icon: "🔥",
		stars: 50,
		type: "milestone",
		category: "engagement",
		condition: { field: "checkInStreak", operator: "gte", value: 7 },
	},
	{
		id: "streak_30",
		name: "Monthly Master",
		description: "Check in 30 days in a row",
		icon: "🏆",
		stars: 200,
		type: "milestone",
		category: "engagement",
		condition: { field: "checkInStreak", operator: "gte", value: 30 },
	},
	{
		id: "streak_100",
		name: "Century Club",
		description: "Check in 100 days in a row",
		icon: "💯",
		stars: 500,
		type: "milestone",
		category: "engagement",
		condition: { field: "checkInStreak", operator: "gte", value: 100 },
	},

	// Eco Achievements - Vehicles
	{
		id: "electric_vehicle",
		name: "Electric Explorer",
		description: "Add an electric vehicle",
		icon: "⚡",
		stars: 100,
		type: "one_time",
		category: "eco",
		condition: { field: "car.fuelType", operator: "equals", value: "electricity" },
	},
	{
		id: "hybrid_vehicle",
		name: "Hybrid Hero",
		description: "Add a hybrid vehicle",
		icon: "🔋",
		stars: 50,
		type: "one_time",
		category: "eco",
		condition: { field: "car.fuelType", operator: "equals", value: "hybrid" },
	},

	// Eco Achievements - Home
	{
		id: "solar_home",
		name: "Solar Powered",
		description: "Power your home with solar energy",
		icon: "☀️",
		stars: 100,
		type: "one_time",
		category: "eco",
		condition: { field: "home.electricitySource", operator: "equals", value: "solar" },
	},
	{
		id: "wind_home",
		name: "Wind Warrior",
		description: "Power your home with wind energy",
		icon: "💨",
		stars: 100,
		type: "one_time",
		category: "eco",
		condition: { field: "home.electricitySource", operator: "equals", value: "wind" },
	},
	{
		id: "recycling_hero",
		name: "Recycling Hero",
		description: "Recycle at home",
		icon: "♻️",
		stars: 50,
		type: "one_time",
		category: "eco",
		condition: { field: "home.recycling", operator: "equals", value: "yes" },
	},
	{
		id: "composting_champion",
		name: "Composting Champion",
		description: "Compost at home",
		icon: "🌱",
		stars: 50,
		type: "one_time",
		category: "eco",
		condition: { field: "home.compost", operator: "equals", value: "yes" },
	},

	// Tree Planting Milestones
	{
		id: "tree_1",
		name: "Seedling",
		description: "Plant your first tree",
		icon: "🌱",
		stars: 25,
		type: "milestone",
		category: "eco",
		condition: { field: "treesPlanted", operator: "gte", value: 1 },
	},
	{
		id: "tree_5",
		name: "Sapling Grove",
		description: "Plant 5 trees",
		icon: "🌳",
		stars: 100,
		type: "milestone",
		category: "eco",
		condition: { field: "treesPlanted", operator: "gte", value: 5 },
	},
	{
		id: "tree_10",
		name: "Forest Founder",
		description: "Plant 10 trees",
		icon: "🌲",
		stars: 250,
		type: "milestone",
		category: "eco",
		condition: { field: "treesPlanted", operator: "gte", value: 10 },
	},
	{
		id: "tree_25",
		name: "Grove Guardian",
		description: "Plant 25 trees",
		icon: "🏕️",
		stars: 500,
		type: "milestone",
		category: "eco",
		condition: { field: "treesPlanted", operator: "gte", value: 25 },
	},
	{
		id: "tree_50",
		name: "Forest Protector",
		description: "Plant 50 trees",
		icon: "🦉",
		stars: 1000,
		type: "milestone",
		category: "eco",
		condition: { field: "treesPlanted", operator: "gte", value: 50 },
	},

	// Learning Achievements
	{
		id: "first_tip",
		name: "Eco Learner",
		description: "Read your first eco tip",
		icon: "📚",
		stars: 5,
		type: "one_time",
		category: "engagement",
	},
	{
		id: "tips_10",
		name: "Knowledge Seeker",
		description: "Read 10 eco tips",
		icon: "🎓",
		stars: 50,
		type: "milestone",
		category: "engagement",
	},
	{
		id: "tips_all",
		name: "Eco Expert",
		description: "Read all eco tips",
		icon: "🏅",
		stars: 200,
		type: "milestone",
		category: "engagement",
	},
];

// Daily check-in rewards
export const dailyRewards = {
	baseStars: 5,
	streakBonuses: [
		{ days: 7, bonus: 50, name: "Week Streak" },
		{ days: 14, bonus: 100, name: "Two Week Streak" },
		{ days: 30, bonus: 200, name: "Monthly Streak" },
		{ days: 60, bonus: 400, name: "Two Month Streak" },
		{ days: 100, bonus: 1000, name: "Century Streak" },
	],
};

// Watch ad reward
export const watchAdReward = {
	stars: 10,
	cooldownMinutes: 5, // Minimum time between ad watches
	dailyLimit: 10, // Max ads per day
};

// Helper functions
export const getAchievementById = (id: string): Achievement | undefined => {
	return achievements.find((a) => a.id === id);
};

export const getAchievementsByCategory = (category: Achievement["category"]): Achievement[] => {
	return achievements.filter((a) => a.category === category);
};

export const getEngagementAchievements = (): Achievement[] => {
	return getAchievementsByCategory("engagement");
};

export const getEcoAchievements = (): Achievement[] => {
	return getAchievementsByCategory("eco");
};

export const getTotalPossibleStars = (): number => {
	return achievements.reduce((total, achievement) => total + achievement.stars, 0);
};
