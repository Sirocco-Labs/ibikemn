import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";
import { Text } from "@rneui/themed";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import {
	getUserIncentiveHistory,
	getAllPreviousChallenges,
} from "../redux/thunks/incentiveThunk";

import UserChallengeHistoryItem from "../components/UserChallengeHistoryItem/UserChallengeHistoryItem";
import AllChallengeHistoryItem from "../components/AllChallengeHistoryItem/AllChallengeHistoryItem";
import { useFocusEffect } from "@react-navigation/native";

export default function IncentiveScreen() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const progressHistory = useSelector((store) => store.incentives.history);
	const allPreviousChallenges = useSelector(
		(store) => store.incentives.allPrevious
	);
	useFocusEffect(
		React.useCallback(() => {
			dispatch(getUserIncentiveHistory(user.user_id));
			dispatch(getAllPreviousChallenges(user.is_public));
		}, [dispatch])
	);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<View style={styles.wrapper}>
				<View style={styles.sectionView}>
					<Text style={styles.sectionHeader}>
						All Previous Challenges
					</Text>
					<FlatList
						data={allPreviousChallenges}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<AllChallengeHistoryItem item={item} />
						)}
					/>
				</View>

					<View style={styles.sectionView}>
						<Text style={styles.sectionHeader}>
							Previous Challenge Progress
						</Text>

						<FlatList
							data={progressHistory}
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => (
								<UserChallengeHistoryItem item={item} />
							)}
						/>
					</View>

			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		paddingHorizontal: 10,
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 5,
		marginTop: 10,
		backgroundColor: "#fff",
	},
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColAr: {
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	leftColBe: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColBe: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColBe: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
	bigText: { fontSize: 50 },
	medText: { fontSize: 30 },
	regText: { fontSize: 14 },
	sectionHeader: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 5,
		color: "#1269A9",
		alignSelf: "flex-start",
	},
});
