import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigate } from "react-router-native";
import { ecoProductsData as productCategories, ProductCategory, EcoProduct } from "../../services/data/ecoProducts";
import { colors, spacing, borderRadius, typography, shadows } from "../../services/styles/theme";

interface ShopPageProps {
	setIsDrawerOpen: any;
	isDrawerOpen: boolean;
	state: any;
	dispatch: any;
}

const ShopPage: React.FC<ShopPageProps> = ({
	setIsDrawerOpen,
	isDrawerOpen,
	state,
	dispatch,
}) => {
	const insets = useSafeAreaInsets();
	const navigate = useNavigate();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const handleOpenLink = async (url: string) => {
		try {
			const supported = await Linking.canOpenURL(url);
			if (supported) {
				await Linking.openURL(url);
			}
		} catch (error) {
			console.error("Failed to open URL:", error);
		}
	};

	const renderProduct = (product: EcoProduct) => {
		return (
			<Pressable
				key={product.id}
				style={({ pressed }) => [
					styles.productCard,
					pressed && styles.cardPressed,
				]}
				onPress={() => handleOpenLink(product.url)}
			>
				<View style={styles.productHeader}>
					<Text style={styles.productIcon}>{product.icon}</Text>
					<View style={styles.productPriceTag}>
						<Text style={styles.productPrice}>{product.priceRange}</Text>
					</View>
				</View>
				<Text style={styles.productName}>{product.name}</Text>
				<Text style={styles.productDescription}>{product.description}</Text>
				{product.co2Impact && (
					<View style={styles.impactBadge}>
						<Text style={styles.impactIcon}>🌱</Text>
						<Text style={styles.impactText}>{product.co2Impact}</Text>
					</View>
				)}
				<View style={styles.viewButton}>
					<Text style={styles.viewButtonText}>View Product →</Text>
				</View>
			</Pressable>
		);
	};

	// Safety check for productCategories
	if (!productCategories || !Array.isArray(productCategories)) {
		return (
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			>
				<View style={styles.header}>
					<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
						<Text style={styles.backText}>← Back</Text>
					</Pressable>
					<Text style={styles.headerTitle}>Shop</Text>
					<Text style={styles.headerSubtitle}>Loading products...</Text>
				</View>
			</ScrollView>
		);
	}

	const filteredCategories = selectedCategory
		? productCategories.filter((cat) => cat.id === selectedCategory)
		: productCategories;

	return (
		<ScrollView
			style={[styles.scrollView, isDrawerOpen && styles.blurred]}
			contentContainerStyle={[styles.container, { paddingTop: insets.top + 80 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.header}>
				<Pressable onPress={() => navigate("/rewards")} style={styles.backButton}>
					<Text style={styles.backText}>← Back</Text>
				</Pressable>
				<Text style={styles.headerTitle}>Shop</Text>
				<Text style={styles.headerSubtitle}>
					Eco-friendly products to reduce your footprint
				</Text>
			</View>

			{/* Info Banner */}
			<View style={styles.infoBanner}>
				<Text style={styles.infoIcon}>🌍</Text>
				<Text style={styles.infoText}>
					Support sustainable brands and reduce your carbon footprint. Links open
					external product pages.
				</Text>
			</View>

			{/* Category Filter */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoryScroll}
				contentContainerStyle={styles.categoryContainer}
			>
				<Pressable
					style={[
						styles.categoryChip,
						!selectedCategory && styles.categoryChipActive,
					]}
					onPress={() => setSelectedCategory(null)}
				>
					<Text
						style={[
							styles.categoryChipText,
							!selectedCategory && styles.categoryChipTextActive,
						]}
					>
						All
					</Text>
				</Pressable>
				{productCategories.map((category) => (
					<Pressable
						key={category.id}
						style={[
							styles.categoryChip,
							selectedCategory === category.id && styles.categoryChipActive,
						]}
						onPress={() => setSelectedCategory(category.id)}
					>
						<Text style={styles.categoryChipIcon}>{category.icon}</Text>
						<Text
							style={[
								styles.categoryChipText,
								selectedCategory === category.id &&
									styles.categoryChipTextActive,
							]}
						>
							{category.name}
						</Text>
					</Pressable>
				))}
			</ScrollView>

			{/* Product Categories */}
			{filteredCategories.map((category) => (
				<View key={category.id} style={styles.categorySection}>
					<View style={styles.categoryHeader}>
						<Text style={styles.categorySectionIcon}>{category.icon}</Text>
						<Text style={styles.categorySectionName}>{category.name}</Text>
					</View>
					<View style={styles.productsGrid}>
						{category.products.map(renderProduct)}
					</View>
				</View>
			))}

			{/* Disclaimer */}
			<View style={styles.disclaimer}>
				<Text style={styles.disclaimerText}>
					These are third-party products. EcoScore is not affiliated with these
					brands and does not earn commission on purchases.
				</Text>
			</View>

			<View style={{ height: insets.bottom + 80 }} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: colors.background,
	},
	blurred: {
		opacity: 0.3,
	},
	container: {
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.xl,
	},
	header: {
		marginBottom: spacing.lg,
	},
	backButton: {
		marginBottom: spacing.sm,
	},
	backText: {
		fontSize: typography.fontSizes.lg,
		color: colors.primary,
		fontWeight: typography.fontWeights.medium,
	},
	headerTitle: {
		fontSize: typography.fontSizes.xxxl,
		fontWeight: typography.fontWeights.bold,
		color: colors.primaryDark,
		marginBottom: spacing.xs,
	},
	headerSubtitle: {
		fontSize: typography.fontSizes.lg,
		color: colors.textSecondary,
	},
	infoBanner: {
		backgroundColor: colors.accent + "20",
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.lg,
	},
	infoIcon: {
		fontSize: 24,
		marginRight: spacing.md,
	},
	infoText: {
		flex: 1,
		fontSize: typography.fontSizes.sm,
		color: colors.accent,
		lineHeight: 20,
	},
	categoryScroll: {
		marginBottom: spacing.lg,
	},
	categoryContainer: {
		paddingRight: spacing.md,
	},
	categoryChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		borderRadius: borderRadius.full,
		marginRight: spacing.sm,
		borderWidth: 1,
		borderColor: colors.border,
	},
	categoryChipActive: {
		backgroundColor: colors.primary,
		borderColor: colors.primary,
	},
	categoryChipIcon: {
		fontSize: 16,
		marginRight: spacing.xs,
	},
	categoryChipText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textPrimary,
		fontWeight: typography.fontWeights.medium,
	},
	categoryChipTextActive: {
		color: colors.textOnPrimary,
	},
	categorySection: {
		marginBottom: spacing.xl,
	},
	categoryHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing.md,
	},
	categorySectionIcon: {
		fontSize: 24,
		marginRight: spacing.sm,
	},
	categorySectionName: {
		fontSize: typography.fontSizes.xl,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
	},
	productsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	productCard: {
		width: "48%",
		backgroundColor: colors.surface,
		borderRadius: borderRadius.lg,
		padding: spacing.md,
		marginBottom: spacing.md,
		...shadows.sm,
	},
	cardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	productHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: spacing.sm,
	},
	productIcon: {
		fontSize: 36,
	},
	productPriceTag: {
		backgroundColor: colors.backgroundDark,
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.sm,
	},
	productPrice: {
		fontSize: typography.fontSizes.xs,
		color: colors.textSecondary,
		fontWeight: typography.fontWeights.medium,
	},
	productName: {
		fontSize: typography.fontSizes.md,
		fontWeight: typography.fontWeights.semibold,
		color: colors.textPrimary,
		marginBottom: spacing.xs,
	},
	productDescription: {
		fontSize: typography.fontSizes.xs,
		color: colors.textSecondary,
		lineHeight: 16,
		marginBottom: spacing.sm,
	},
	impactBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.primarySoft + "30",
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
		borderRadius: borderRadius.sm,
		marginBottom: spacing.sm,
		alignSelf: "flex-start",
	},
	impactIcon: {
		fontSize: 12,
		marginRight: spacing.xs,
	},
	impactText: {
		fontSize: typography.fontSizes.xs,
		color: colors.primaryDark,
		fontWeight: typography.fontWeights.medium,
	},
	viewButton: {
		backgroundColor: colors.primary,
		borderRadius: borderRadius.md,
		padding: spacing.sm,
		alignItems: "center",
	},
	viewButtonText: {
		fontSize: typography.fontSizes.sm,
		color: colors.textOnPrimary,
		fontWeight: typography.fontWeights.semibold,
	},
	disclaimer: {
		backgroundColor: colors.backgroundDark,
		borderRadius: borderRadius.md,
		padding: spacing.md,
		marginTop: spacing.lg,
	},
	disclaimerText: {
		fontSize: typography.fontSizes.xs,
		color: colors.textMuted,
		textAlign: "center",
		lineHeight: 16,
	},
});

export default ShopPage;
