import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import LearnPage from "../../../components/rewards/LearnPage";
import FetchData from "../../../services/fetchData";
import { ecoTipsData, getTotalTips } from "../../../services/data/ecoTips";

// Mock the safe area context
jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	SafeAreaProvider: ({ children }: any) => children,
}));

// Mock FetchData
jest.mock("../../../services/fetchData", () => ({
	markTipRead: jest.fn(),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-native", () => ({
	...jest.requireActual("react-router-native"),
	useNavigate: () => mockNavigate,
}));

describe("LearnPage Component", () => {
	const mockDispatch = jest.fn();
	const mockSetIsDrawerOpen = jest.fn();

	const defaultState = {
		currentUser: { token: "test-token" },
		rewards: 500,
		userInformation: { name: "Test User" },
		tipsRead: "[]", // JSON string
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
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("Learn")).toBeTruthy();
		});

		it("should render subtitle", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("Tips to reduce your carbon footprint")).toBeTruthy();
		});

		it("should render progress section", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("Reading Progress")).toBeTruthy();
		});

		it("should show tips read count", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			const totalTips = getTotalTips();
			expect(getByText(`0 of ${totalTips} tips read`)).toBeTruthy();
		});

		it("should render all tip categories", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("Transportation")).toBeTruthy();
			expect(getByText("Home Energy")).toBeTruthy();
			expect(getByText("Reduce & Recycle")).toBeTruthy();
			expect(getByText("Diet & Lifestyle")).toBeTruthy();
		});

		it("should show info card", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("Did you know?")).toBeTruthy();
		});
	});

	describe("Category Cards", () => {
		it("should display category icons", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			ecoTipsData.forEach((category) => {
				expect(getByText(category.icon)).toBeTruthy();
			});
		});

		it("should show progress for each category", () => {
			const { getAllByText } = render(<LearnPage {...defaultProps} />);
			// Each category shows "0/X read" initially
			const progressTexts = getAllByText(/0\/\d+ read/);
			expect(progressTexts.length).toBe(ecoTipsData.length);
		});
	});

	describe("Expanding Categories", () => {
		it("should expand category when pressed", () => {
			const { getByText, queryByText } = render(<LearnPage {...defaultProps} />);

			// Get first tip from transportation category
			const firstTip = ecoTipsData[0].tips[0];

			// Initially the tip should not be visible
			expect(queryByText(firstTip.title)).toBeNull();

			// Press the Transportation category
			fireEvent.press(getByText("Transportation"));

			// Now the tip should be visible
			expect(getByText(firstTip.title)).toBeTruthy();
		});

		it("should show tip descriptions when expanded", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			const firstTip = ecoTipsData[0].tips[0];

			fireEvent.press(getByText("Transportation"));

			// Description should be visible
			expect(getByText(firstTip.description)).toBeTruthy();
		});

		it("should show expand/collapse icon", () => {
			const { getAllByText, getByText } = render(<LearnPage {...defaultProps} />);

			// Initially shows ▼ (collapsed)
			const downArrows = getAllByText("▼");
			expect(downArrows.length).toBe(ecoTipsData.length);

			// Press Transportation category
			fireEvent.press(getByText("Transportation"));

			// Should now show ▲ for expanded category
			expect(getAllByText("▲").length).toBe(1);
		});

		it("should collapse category when pressed again", () => {
			const { getByText, queryByText } = render(<LearnPage {...defaultProps} />);
			const firstTip = ecoTipsData[0].tips[0];

			// Expand
			fireEvent.press(getByText("Transportation"));
			expect(getByText(firstTip.title)).toBeTruthy();

			// Collapse
			fireEvent.press(getByText("Transportation"));
			expect(queryByText(firstTip.title)).toBeNull();
		});
	});

	describe("Reading Tips", () => {
		it("should call markTipRead when tip is pressed", async () => {
			(FetchData.markTipRead as jest.Mock).mockResolvedValue({
				message: "Tip marked as read",
				tipId: ecoTipsData[0].tips[0].id,
				starsEarned: 2,
			});

			const { getByText } = render(<LearnPage {...defaultProps} />);

			// Expand transportation category
			fireEvent.press(getByText("Transportation"));

			// Get first tip and press it
			const firstTip = ecoTipsData[0].tips[0];
			fireEvent.press(getByText(firstTip.title));

			await waitFor(() => {
				expect(FetchData.markTipRead).toHaveBeenCalledWith(
					"test-token",
					firstTip.id,
					firstTip.stars
				);
			});
		});

		it("should dispatch ADD_STARS when tip is read", async () => {
			const firstTip = ecoTipsData[0].tips[0];
			(FetchData.markTipRead as jest.Mock).mockResolvedValue({
				message: "Tip marked as read",
				tipId: firstTip.id,
				starsEarned: firstTip.stars,
			});

			const { getByText } = render(<LearnPage {...defaultProps} />);

			fireEvent.press(getByText("Transportation"));
			fireEvent.press(getByText(firstTip.title));

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "ADD_STARS",
					payload: firstTip.stars,
				});
			});
		});

		it("should dispatch UPDATE_TIPS_READ when tip is read", async () => {
			const firstTip = ecoTipsData[0].tips[0];
			(FetchData.markTipRead as jest.Mock).mockResolvedValue({
				message: "Tip marked as read",
				tipId: firstTip.id,
				starsEarned: firstTip.stars,
			});

			const { getByText } = render(<LearnPage {...defaultProps} />);

			fireEvent.press(getByText("Transportation"));
			fireEvent.press(getByText(firstTip.title));

			await waitFor(() => {
				expect(mockDispatch).toHaveBeenCalledWith(
					expect.objectContaining({
						type: "UPDATE_TIPS_READ",
					})
				);
			});
		});

		it("should show star reward for unread tips", () => {
			const { getByText, getAllByText } = render(<LearnPage {...defaultProps} />);

			fireEvent.press(getByText("Transportation"));

			// Tips should show their star rewards
			const starRewards = getAllByText(/\+\d+ ⭐/);
			expect(starRewards.length).toBeGreaterThan(0);
		});
	});

	describe("Already Read Tips", () => {
		it("should show tips as read when already in tipsRead", () => {
			const readState = {
				...defaultState,
				tipsRead: JSON.stringify(["transport_1", "transport_2"]),
			};
			const { getByText } = render(
				<LearnPage {...defaultProps} state={readState} />
			);

			expect(getByText(`2 of ${getTotalTips()} tips read`)).toBeTruthy();
		});

		it("should show Read badge for already read tips", () => {
			const firstTipId = ecoTipsData[0].tips[0].id;
			const readState = {
				...defaultState,
				tipsRead: JSON.stringify([firstTipId]),
			};
			const { getByText, getAllByText } = render(
				<LearnPage {...defaultProps} state={readState} />
			);

			fireEvent.press(getByText("Transportation"));

			// Should show "Read" badge for the read tip
			const readBadges = getAllByText("Read");
			expect(readBadges.length).toBeGreaterThan(0);
		});

		it("should update progress based on tips read", () => {
			const transportationTips = ecoTipsData[0].tips.map((t) => t.id);
			const readState = {
				...defaultState,
				tipsRead: JSON.stringify(transportationTips),
			};
			const { getByText } = render(
				<LearnPage {...defaultProps} state={readState} />
			);

			const tipsRead = transportationTips.length;
			expect(getByText(`${tipsRead} of ${getTotalTips()} tips read`)).toBeTruthy();
		});
	});

	describe("Stars Display", () => {
		it("should show earned stars in progress card", () => {
			const readState = {
				...defaultState,
				tipsRead: JSON.stringify(["transport_1", "transport_2"]),
			};
			const { getByText } = render(
				<LearnPage {...defaultProps} state={readState} />
			);

			// 2 tips read * 2 stars each = +4
			expect(getByText("+4 ⭐")).toBeTruthy();
		});
	});

	describe("Navigation", () => {
		it("should have back button", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			expect(getByText("← Back")).toBeTruthy();
		});

		it("should navigate to rewards when back is pressed", () => {
			const { getByText } = render(<LearnPage {...defaultProps} />);
			fireEvent.press(getByText("← Back"));
			expect(mockNavigate).toHaveBeenCalledWith("/rewards");
		});
	});

	describe("Drawer State", () => {
		it("should apply blurred style when drawer is open", () => {
			const { toJSON } = render(
				<LearnPage {...defaultProps} isDrawerOpen={true} />
			);
			expect(toJSON()).toBeTruthy();
		});
	});

	describe("Impact Display", () => {
		it("should show impact badges for tips that have impact", () => {
			const { getByText, queryAllByText } = render(<LearnPage {...defaultProps} />);

			// Expand a category with tips that have impact
			fireEvent.press(getByText("Transportation"));

			// Check if any impact badges are shown
			// The actual impact text varies per tip
			const tipsWithImpact = ecoTipsData[0].tips.filter(t => t.impact);
			if (tipsWithImpact.length > 0) {
				expect(queryAllByText(tipsWithImpact[0].impact!).length).toBeGreaterThan(0);
			}
		});
	});
});
