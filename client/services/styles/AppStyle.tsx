import { StyleSheet } from "react-native";
import { colors } from "./theme";

const appStyles = StyleSheet.create({
	title: {
		backgroundColor: colors.surface,
		color: colors.textPrimary,
	},
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	screenContainer: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: 16,
	},
});

export default appStyles;
