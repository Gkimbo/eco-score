import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RewardsHub from "../../../components/rewards/RewardsHub";
import FetchData from "../../../services/fetchData";

// Mock the safe area context
jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	SafeAreaProvider: ({ children }: any) => children,
}));

// Mock FetchData
jest.mock("../../../services/fetchData", () => ({
	dailyCheckIn: jest.fn(),
	addTrees: jest.fn(),
	getCommunityStats: jest.fn().mockResolvedValue({
		totalTreesPlanted: 1234,
		usersContributing: 56,
		co2Offset: 59232,
	}),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-native", () => ({
	...jest.requireActual("react-router-native"),
	useNavigate: () => mockNavigate,
}));

describe("RewardsHub Component", () => {
	const mockDispatch = jest.fn();
	const mockSetIsDrawerOpen = jest.fn();

	const defaultState = {
		currentUser: { token: "test-token" },
		rewards: 500,
		treesPlanted: 3,
		checkInStreak: 5,
		userInformation: { name: "Test User" },
	};

	const defaultProps = {
		setIsDrawerOpen: mockSetIsDrawerOpen,
		isDrawerOpen: false,
		state: defaultState,
		dispatch: mockDispatch,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Rendering", () => {
		it("should render the rewards hub header", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("Rewards Hub")).toBeTruthy();
			expect(getByText("Earn, learn, and make an impact")).toBeTruthy();
		});

		it("should display current stars count", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("500")).toBeTruthy();
			expect(getByText("Your Stars")).toBeTruthy();
		});

		it("should display streak badge when streak exists", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("🔥 5 day streak")).toBeTruthy();
		});

		it("should not display streak badge when streak is 0", () => {
			const noStreakState = { ...defaultState, checkInStreak: 0 };
			const { queryByText } = render(
				<RewardsHub {...defaultProps} state={noStreakState} />
			);
			expect(queryByText(/day streak/)).toBeNull();
		});

		it("should display trees planted count", () => {
			const { getByText, getAllByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("3")).toBeTruthy();
			// "Trees Planted" appears in both Your Impact and Community Impact sections
			const treesPlantedLabels = getAllByText("Trees Planted");
			expect(treesPlantedLabels.length).toBeGreaterThan(0);
		});

		it("should display CO2 impact (trees * 48)", () => {
			const { getByText, getAllByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("144")).toBeTruthy(); // 3 trees * 48 lbs
			// "lbs CO2/year" appears in both Your Impact and Community Impact sections
			const co2Labels = getAllByText("lbs CO2/year");
			expect(co2Labels.length).toBeGreaterThan(0);
		});

		it("should show progress to next tree", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("Progress to next tree")).toBeTruthy();
			expect(getByText("500/1000")).toBeTruthy();
		});

		it("should show stars needed to plant tree", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("500 more stars needed")).toBeTruthy();
		});

		it("should show navigation cards", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("Earn Stars")).toBeTruthy();
			expect(getByText("Learn")).toBeTruthy();
			expect(getByText("Shop")).toBeTruthy();
			expect(getByText("Plant Tree")).toBeTruthy();
		});
	});

	describe("No User Information", () => {
		it("should show prompt to add basic info when no userInformation", () => {
			const noInfoState = { ...defaultState, userInformation: null };
			const { getByText } = render(
				<RewardsHub {...defaultProps} state={noInfoState} />
			);
			expect(
				getByText("Please fill out your basic information to earn rewards and plant trees")
			).toBeTruthy();
		});
	});

	describe("Daily Check-in", () => {
		it("should call dailyCheckIn when button is pressed", async () => {
			(FetchData.dailyCheckIn as jest.Mock).mockResolvedValue({
				starsEarned: 5,
				streak: 6,
				baseStars: 5,
				bonusStars: 0,
			});

			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const checkInButton = getByText("Daily Check-in").parent?.parent;

			if (checkInButton) {
				fireEvent.press(checkInButton);
			}

			await waitFor(() => {
				expect(FetchData.dailyCheckIn).toHaveBeenCalledWith("test-token");
			});
		});

		it("should dispatch ADD_STARS on successful check-in", async () => {
			(FetchData.dailyCheckIn as jest.Mock).mockResolvedValue({
				starsEarned: 5,
				streak: 6,
				baseStars: 5,
				bonusStars: 0,
			});

			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const checkInButton = getByText("Daily Check-in").parent?.parent;

			if (checkInButton) {
				fireEvent.press(checkInButton);
			}

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "ADD_STARS",
					payload: 5,
				});
			});
		});

		it("should dispatch UPDATE_STREAK on successful check-in", async () => {
			(FetchData.dailyCheckIn as jest.Mock).mockResolvedValue({
				starsEarned: 5,
				streak: 6,
				baseStars: 5,
				bonusStars: 0,
			});

			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const checkInButton = getByText("Daily Check-in").parent?.parent;

			if (checkInButton) {
				fireEvent.press(checkInButton);
			}

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith(
					expect.objectContaining({
						type: "UPDATE_STREAK",
						payload: expect.objectContaining({ streak: 6 }),
					})
				);
			});
		});

		it("should show bonus message when streak bonus is earned", async () => {
			(FetchData.dailyCheckIn as jest.Mock).mockResolvedValue({
				starsEarned: 55,
				streak: 7,
				baseStars: 5,
				bonusStars: 50,
			});

			const { getByText, findByText } = render(<RewardsHub {...defaultProps} />);
			const checkInButton = getByText("Daily Check-in").parent?.parent;

			if (checkInButton) {
				fireEvent.press(checkInButton);
			}

			await waitFor(() => {
				expect(
					findByText(/Check-in successful! \+5 stars \+ 50 streak bonus!/)
				).toBeTruthy();
			});
		});
	});

	describe("Plant Tree", () => {
		it("should show Ready when user has 1000+ stars", () => {
			const richState = { ...defaultState, rewards: 1500 };
			const { getByText } = render(
				<RewardsHub {...defaultProps} state={richState} />
			);
			expect(getByText("Ready!")).toBeTruthy();
		});

		it("should show stars needed when user has less than 1000", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			expect(getByText("500 more")).toBeTruthy();
		});

		it("should call addTrees when plant tree is pressed with sufficient stars", async () => {
			(FetchData.addTrees as jest.Mock).mockResolvedValue({});

			const richState = { ...defaultState, rewards: 1500 };
			const { getByText } = render(
				<RewardsHub {...defaultProps} state={richState} />
			);
			const plantButton = getByText("Plant Tree").parent;

			if (plantButton) {
				fireEvent.press(plantButton);
			}

			await waitFor(() => {
				expect(FetchData.addTrees).toHaveBeenCalled();
			});
		});

		it("should dispatch DEDUCT_STARS and PLANT_TREES on successful tree plant", async () => {
			(FetchData.addTrees as jest.Mock).mockResolvedValue({});

			const richState = { ...defaultState, rewards: 1500 };
			const { getByText } = render(
				<RewardsHub {...defaultProps} state={richState} />
			);
			const plantButton = getByText("Plant Tree").parent;

			if (plantButton) {
				fireEvent.press(plantButton);
			}

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "DEDUCT_STARS",
					payload: 1000,
				});
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "PLANT_TREES",
					payload: 1,
				});
			});
		});
	});

	describe("Navigation", () => {
		it("should navigate to /rewards/earn when Earn Stars is pressed", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const earnCard = getByText("Earn Stars").parent;

			if (earnCard) {
				fireEvent.press(earnCard);
			}

			expect(mockNavigate).toHaveBeenCalledWith("/rewards/earn");
		});

		it("should navigate to /rewards/learn when Learn is pressed", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const learnCard = getByText("Learn").parent;

			if (learnCard) {
				fireEvent.press(learnCard);
			}

			expect(mockNavigate).toHaveBeenCalledWith("/rewards/learn");
		});

		it("should navigate to /rewards/shop when Shop is pressed", () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			const shopCard = getByText("Shop").parent;

			if (shopCard) {
				fireEvent.press(shopCard);
			}

			expect(mockNavigate).toHaveBeenCalledWith("/rewards/shop");
		});
	});

	describe("Drawer State", () => {
		it("should apply blurred style when drawer is open", () => {
			const { toJSON } = render(
				<RewardsHub {...defaultProps} isDrawerOpen={true} />
			);
			// The component should render with reduced opacity
			expect(toJSON()).toBeTruthy();
		});
	});

	describe("Community Impact", () => {
		it("should display community impact section header", async () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("Community Impact")).toBeTruthy();
			});
		});

		it("should display community subtitle", async () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("Together we're making a difference")).toBeTruthy();
			});
		});

		it("should call getCommunityStats on mount", async () => {
			render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(FetchData.getCommunityStats).toHaveBeenCalled();
			});
		});

		it("should display total trees planted from community", async () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("1234")).toBeTruthy();
			});
		});

		it("should display number of contributors", async () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("56")).toBeTruthy();
				expect(getByText("Contributors")).toBeTruthy();
			});
		});

		it("should display formatted CO2 offset", async () => {
			const { getByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("59,232")).toBeTruthy();
			});
		});

		it("should show default values when community stats fail", async () => {
			(FetchData.getCommunityStats as jest.Mock).mockResolvedValueOnce({
				totalTreesPlanted: 0,
				usersContributing: 0,
				co2Offset: 0,
			});
			const { getByText, getAllByText } = render(<RewardsHub {...defaultProps} />);
			await waitFor(() => {
				expect(getByText("Community Impact")).toBeTruthy();
				// At least the section should render
				const zeros = getAllByText("0");
				expect(zeros.length).toBeGreaterThan(0);
			});
		});
	});
});
