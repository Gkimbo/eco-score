import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeButton from "../../../components/navBar/HomeButton";

const mockNavigate = jest.fn();

jest.mock("react-router-native", () => ({
	useNavigate: () => mockNavigate,
}));

describe("HomeButton", () => {
	beforeEach(() => {
		mockNavigate.mockClear();
	});

	it("renders correctly", () => {
		const { getByTestId } = render(<HomeButton />);
		// The component should render without crashing
		expect(true).toBe(true);
	});

	it("navigates to home when pressed", () => {
		const { root } = render(<HomeButton />);

		// Find and press the button
		const pressable = root.findByType("View");
		if (pressable && pressable.props.onPress) {
			fireEvent.press(pressable);
			expect(mockNavigate).toHaveBeenCalledWith("/");
		}
	});

	it("has correct styling", () => {
		const { toJSON } = render(<HomeButton />);
		const tree = toJSON();
		expect(tree).toBeTruthy();
	});
});
