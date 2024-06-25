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
	noScroll,
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
	return noScroll ? (
		<SafeAreaView style={[styles.safe, background]}>
			<View style={[styles.noScroll, background]}>{children}</View>
			{underScroll}
		</SafeAreaView>
	) : (
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
		backgroundColor:'#fff'
	},
	noScroll: {
		flexGrow: 1,
		padding: 15,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	leftColAr: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
});
