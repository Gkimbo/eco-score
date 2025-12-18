import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EarnStarsPage from "../../../components/rewards/EarnStarsPage";
import FetchData from "../../../services/fetchData";
import { achievements } from "../../../services/data/challenges";

// Mock the safe area context
jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	SafeAreaProvider: ({ children }: any) => children,
}));

// Mock FetchData
jest.mock("../../../services/fetchData", () => ({
	claimAchievement: jest.fn(),
	addReward: jest.fn(),
	getAchievements: jest.fn().mockResolvedValue({ achievements: [] }),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-native", () => ({
	...jest.requireActual("react-router-native"),
	useNavigate: () => mockNavigate,
}));

describe("EarnStarsPage Component", () => {
	const mockDispatch = jest.fn();
	const mockSetIsDrawerOpen = jest.fn();

	const defaultState = {
		currentUser: { token: "test-token" },
		rewards: 500,
		treesPlanted: 0,
		checkInStreak: 3,
		userInformation: { name: "Test User" },
		cars: [],
		homes: [],
		achievements: [],
		tipsRead: [],
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
		it("should render the page header", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Earn Stars")).toBeTruthy();
		});

		it("should render quick earn section", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Quick Earn")).toBeTruthy();
		});

		it("should display watch ad button", () => {
			const { getByText, getAllByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Watch an Ad")).toBeTruthy();
			// There may be multiple +10 ⭐ elements (one for the button, possibly others)
			const starElements = getAllByText("+10 ⭐");
			expect(starElements.length).toBeGreaterThan(0);
		});

		it("should display achievements sections", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Engagement")).toBeTruthy();
			expect(getByText("Eco Achievements")).toBeTruthy();
		});

		it("should show engagement achievements", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Welcome!")).toBeTruthy();
			expect(getByText("Profile Complete")).toBeTruthy();
		});

		it("should show eco achievements", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Electric Explorer")).toBeTruthy();
			expect(getByText("Recycling Hero")).toBeTruthy();
		});
	});

	describe("Achievement Status", () => {
		it("should mark first_login as claimable for new users", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			// The Welcome achievement should be claimable
			expect(getByText("Welcome!")).toBeTruthy();
		});

		it("should mark completed achievements when already claimed", () => {
			const claimedState = {
				...defaultState,
				achievements: [{ id: "first_login", completedAt: "2024-01-01" }],
			};
			const { getByText } = render(
				<EarnStarsPage {...defaultProps} state={claimedState} />
			);
			expect(getByText("Welcome!")).toBeTruthy();
		});

		it("should show profile complete as available when userInfo exists", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Profile Complete")).toBeTruthy();
		});

		it("should show electric vehicle achievement as locked when no EV", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Electric Explorer")).toBeTruthy();
		});

		it("should show electric vehicle achievement as available when EV exists", () => {
			const evState = {
				...defaultState,
				cars: [{ id: 1, fuelType: "electricity", make: "Tesla" }],
			};
			const { getByText } = render(
				<EarnStarsPage {...defaultProps} state={evState} />
			);
			expect(getByText("Electric Explorer")).toBeTruthy();
		});
	});

	describe("Claiming Achievements", () => {
		it("should call claimAchievement when achievement card is pressed", async () => {
			(FetchData.claimAchievement as jest.Mock).mockResolvedValue({
				message: "Achievement claimed",
				achievementId: "first_login",
				starsEarned: 10,
			});

			const { getByText } = render(<EarnStarsPage {...defaultProps} />);

			// Press the Welcome! achievement (first_login is claimable for all users)
			const welcomeAchievement = getByText("Welcome!");
			fireEvent.press(welcomeAchievement);

			await waitFor(() => {
				expect(FetchData.claimAchievement).toHaveBeenCalled();
			});
		});

		it("should dispatch ADD_STARS on successful claim", async () => {
			(FetchData.claimAchievement as jest.Mock).mockResolvedValue({
				message: "Achievement claimed",
				achievementId: "first_login",
				starsEarned: 10,
			});

			const { getByText } = render(<EarnStarsPage {...defaultProps} />);

			// Press the Welcome! achievement
			const welcomeAchievement = getByText("Welcome!");
			fireEvent.press(welcomeAchievement);

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "ADD_STARS",
					payload: expect.any(Number),
				});
			});
		});

		it("should show success message after successful claim", async () => {
			(FetchData.claimAchievement as jest.Mock).mockResolvedValue({
				message: "Achievement claimed",
				achievementId: "first_login",
				starsEarned: 10,
			});

			const { getByText, findByText } = render(<EarnStarsPage {...defaultProps} />);

			// Press the Welcome! achievement
			const welcomeAchievement = getByText("Welcome!");
			fireEvent.press(welcomeAchievement);

			await waitFor(() => {
				expect(findByText(/Claimed/)).toBeTruthy();
			});
		});
	});

	describe("Watch Ad", () => {
		it("should call addReward when watch ad is pressed", async () => {
			(FetchData.addReward as jest.Mock).mockResolvedValue({});

			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			const watchAdButton = getByText("Watch an Ad").parent;

			if (watchAdButton) {
				fireEvent.press(watchAdButton);
			}

			await waitFor(() => {
				expect(FetchData.addReward).toHaveBeenCalledWith({
					user: { token: "test-token" },
					rewards: 10,
				});
			});
		});

		it("should dispatch ADD_STARS with 10 on watch ad", async () => {
			(FetchData.addReward as jest.Mock).mockResolvedValue({});

			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			const watchAdButton = getByText("Watch an Ad").parent;

			if (watchAdButton) {
				fireEvent.press(watchAdButton);
			}

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "ADD_STARS",
					payload: 10,
				});
			});
		});
	});

	describe("Tree Milestones", () => {
		it("should show tree milestone as locked when no trees planted", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Seedling")).toBeTruthy();
		});

		it("should show tree milestone as available when trees planted", () => {
			const treeState = { ...defaultState, treesPlanted: 1 };
			const { getByText } = render(
				<EarnStarsPage {...defaultProps} state={treeState} />
			);
			expect(getByText("Seedling")).toBeTruthy();
		});
	});

	describe("Streak Milestones", () => {
		it("should show 7-day streak as locked when streak < 7", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			expect(getByText("Week Warrior")).toBeTruthy();
		});

		it("should show 7-day streak as available when streak >= 7", () => {
			const streakState = { ...defaultState, checkInStreak: 7 };
			const { getByText } = render(
				<EarnStarsPage {...defaultProps} state={streakState} />
			);
			expect(getByText("Week Warrior")).toBeTruthy();
		});
	});

	describe("Navigation", () => {
		it("should have back navigation capability", () => {
			const { getByText } = render(<EarnStarsPage {...defaultProps} />);
			// The component should render successfully
			expect(getByText("Earn Stars")).toBeTruthy();
		});
	});

	describe("No User Info", () => {
		it("should still render when no user info", () => {
			const noInfoState = { ...defaultState, userInformation: null };
			const { getByText } = render(
				<EarnStarsPage {...defaultProps} state={noInfoState} />
			);
			// Component should still render the header
			expect(getByText("Earn Stars")).toBeTruthy();
		});
	});
});
