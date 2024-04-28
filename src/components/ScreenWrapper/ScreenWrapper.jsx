import React, { useState, createContext, useContext } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	StyleSheet,
	Text,
	RefreshControl,
} from "react-native";

export default function ScreenWrapper({
	children,
	underScroll,
	background,
	onRefresh,
	refreshing,
}) {
	const handleRefresh = async () => {
		try {
			if (onRefresh) {
				await onRefresh();
			}
		} catch (error) {
			console.error("SOMETHING WENT WRONG WHILE REFRESHING", error);
		}
	};
	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView
				contentContainerStyle={styles.scroll}
				refreshControl={
					onRefresh && (
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
					)
				}
			>
				<View style={[styles.innerScroll, background]}>{children}</View>
			</ScrollView>
			{underScroll}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	leftColAr: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
});
