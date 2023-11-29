import React from "react";
import { Drawer, useTheme } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

interface CustomDrawerItemProps {
	label: string;
	icon: string;
	onPress: () => void;
}

const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({
	label,
	icon,
	onPress,
}) => {
	const theme = useTheme();

	return (
		<Drawer.Item
			label={() => (
				<View style={styles.drawerItem}>
					<Text style={{ color: "black" }}>{label}</Text>
				</View>
			)}
			icon={icon}
			onPress={onPress}
		/>
	);
};

const styles = StyleSheet.create({
	drawerItem: {
		marginVertical: 5,
		backgroundColor: "#f1f1f1",
	},
});

export default CustomDrawerItem;
