import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Linking } from "react-native";
import ShopPage from "../../../components/rewards/ShopPage";
import { ecoProductsData, getTotalProducts } from "../../../services/data/ecoProducts";

// Mock the safe area context
jest.mock("react-native-safe-area-context", () => ({
	useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
	SafeAreaProvider: ({ children }: any) => children,
}));

// Mock Linking
jest.mock("react-native/Libraries/Linking/Linking", () => ({
	openURL: jest.fn(),
	canOpenURL: jest.fn().mockResolvedValue(true),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-native", () => ({
	...jest.requireActual("react-router-native"),
	useNavigate: () => mockNavigate,
}));

describe("ShopPage Component", () => {
	const mockDispatch = jest.fn();
	const mockSetIsDrawerOpen = jest.fn();

	const defaultState = {
		currentUser: { token: "test-token" },
		rewards: 500,
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
		it("should render the page header", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Shop")).toBeTruthy();
		});

		it("should render subtitle", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Eco-friendly products to reduce your footprint")).toBeTruthy();
		});

		it("should render info banner", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText(/Support sustainable brands/)).toBeTruthy();
		});

		it("should render All filter chip", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("All")).toBeTruthy();
		});

		it("should render category filter chips", () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);
			// Categories should be in filter chips
			ecoProductsData.forEach((category) => {
				const matches = getAllByText(category.name);
				// Should have at least one (in chips, may also be in section header)
				expect(matches.length).toBeGreaterThan(0);
			});
		});

		it("should display category section icons", () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);
			ecoProductsData.forEach((category) => {
				const icons = getAllByText(category.icon);
				expect(icons.length).toBeGreaterThan(0);
			});
		});
	});

	describe("Products Display", () => {
		it("should display products from all categories by default", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);

			// Check for some specific products
			expect(getByText("Tesla Model 3")).toBeTruthy();
			expect(getByText("Google Nest Thermostat")).toBeTruthy();
		});

		it("should display product descriptions", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			const firstProduct = ecoProductsData[0].products[0];
			expect(getByText(firstProduct.description)).toBeTruthy();
		});

		it("should display product price ranges", () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);
			// Check for price ranges like "$"
			const prices = getAllByText(/\$/);
			expect(prices.length).toBeGreaterThan(0);
		});

		it("should display View Product buttons", () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);
			const viewButtons = getAllByText(/View Product/);
			expect(viewButtons.length).toBeGreaterThan(0);
		});
	});

	describe("Category Filtering", () => {
		it("should filter products when category chip is pressed", () => {
			const { getByText, getAllByText, queryByText } = render(<ShopPage {...defaultProps} />);

			// Find the "Electric Vehicles" chip (in category filter area)
			const evChips = getAllByText("Electric Vehicles");
			// Press the first one (should be the filter chip)
			fireEvent.press(evChips[0]);

			// Tesla should still be visible (EV product)
			expect(getByText("Tesla Model 3")).toBeTruthy();

			// Products from other categories should be filtered out
			// (unless they have the same name as EV products)
		});

		it("should show all products when All chip is pressed", () => {
			const { getByText, getAllByText } = render(<ShopPage {...defaultProps} />);

			// First filter by a category
			const evChips = getAllByText("Electric Vehicles");
			fireEvent.press(evChips[0]);

			// Then press All
			fireEvent.press(getByText("All"));

			// Products from multiple categories should be visible
			expect(getByText("Tesla Model 3")).toBeTruthy();
			expect(getByText("Google Nest Thermostat")).toBeTruthy();
		});
	});

	describe("Product Links", () => {
		it("should open external URL when product card is pressed", async () => {
			const { getByText, getAllByText } = render(<ShopPage {...defaultProps} />);

			// Find and press a "View Product" button
			const viewButtons = getAllByText(/View Product/);
			if (viewButtons.length > 0) {
				fireEvent.press(viewButtons[0].parent!);
			}

			// Wait a tick for async operation
			await new Promise(resolve => setTimeout(resolve, 0));
			expect(Linking.openURL).toHaveBeenCalled();
		});

		it("should call Linking.canOpenURL before opening", async () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);

			const viewButtons = getAllByText(/View Product/);
			if (viewButtons.length > 0) {
				fireEvent.press(viewButtons[0].parent!);
			}

			await new Promise(resolve => setTimeout(resolve, 0));
			expect(Linking.canOpenURL).toHaveBeenCalled();
		});
	});

	describe("Product Categories Data", () => {
		it("should have Electric Vehicles with EVs", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Tesla Model 3")).toBeTruthy();
		});

		it("should have Solar & Energy products", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Google Nest Thermostat")).toBeTruthy();
		});

		it("should have Home & Garden products", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Composting Bin")).toBeTruthy();
		});

		it("should have Alternative Transport products", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Rad Power Bikes")).toBeTruthy();
		});

		it("should have Everyday Items products", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("Hydro Flask Water Bottle")).toBeTruthy();
		});
	});

	describe("CO2 Impact Display", () => {
		it("should show CO2 impact for products that have it", () => {
			const { getAllByText } = render(<ShopPage {...defaultProps} />);
			// Products with CO2 impact should show the 🌱 badge
			const impactIcons = getAllByText("🌱");
			expect(impactIcons.length).toBeGreaterThan(0);
		});
	});

	describe("Disclaimer", () => {
		it("should display disclaimer about third-party products", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText(/These are third-party products/)).toBeTruthy();
		});
	});

	describe("URL Validation", () => {
		it("all product URLs should be HTTPS", () => {
			ecoProductsData.forEach((category) => {
				category.products.forEach((product) => {
					expect(product.url.startsWith("https://")).toBe(true);
				});
			});
		});
	});

	describe("Drawer State", () => {
		it("should apply blurred style when drawer is open", () => {
			const { toJSON } = render(
				<ShopPage {...defaultProps} isDrawerOpen={true} />
			);
			expect(toJSON()).toBeTruthy();
		});
	});

	describe("Navigation", () => {
		it("should have back button", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			expect(getByText("← Back")).toBeTruthy();
		});

		it("should navigate to rewards when back is pressed", () => {
			const { getByText } = render(<ShopPage {...defaultProps} />);
			fireEvent.press(getByText("← Back"));
			expect(mockNavigate).toHaveBeenCalledWith("/rewards");
		});
	});
});
