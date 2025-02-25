import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UserStatsSection from "../UserStatsSection/UserStatsSection";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

export default function StatsAndChallengesSection({
	travelStats,
	mostCommon,
	challengesNotMet,
	challengeProgress,
	challengesMet,
    user
}) {
	return (
		<View style={styles.sectionView}>
			<View style={styles.leftColAr}>
				<Text style={[styles.sectionText, { marginBottom: 0 }]}>
					{user.username}'s Ride Stats
				</Text>
				<UserStatsSection
					travelStats={travelStats}
					survey={mostCommon}
				/>
			</View>
			<Text
				style={[
					styles.sectionText,
					{
						alignSelf: "flex-start",
						marginTop: 10,
						marginBottom: 5,
					},
				]}
			>
				Active Challenge Progress
			</Text>

			<View style={styles.cardSection}>
				<FlatList
					data={challengesNotMet}
					horizontal
					renderItem={({ item }) => (
						<ChallengeCard
							item={item}
							prog={challengeProgress}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>

			{challengesMet.length > 0 && (
				<>
					<Text
						style={[
							styles.sectionText,
							{
								alignSelf: "flex-start",
								marginBottom: 5,
							},
						]}
					>
						Completed Challenges
					</Text>

					<View style={styles.cardSection}>
						<FlatList
							data={challengesMet}
							horizontal
							renderItem={({ item }) => (
								<ChallengeCard
									item={item}
									prog={challengeProgress}
								/>
							)}
							keyExtractor={(item) => item.id}
						/>
					</View>
				</>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
		flex: 1,
	},
	wrapper: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 5,
		marginBottom: 10,
	},
	dialogContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		marginVertical: 10,
	},
	completedContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		marginVertical: 5,
	},
	rewardSection: {
		// flex: 1,
		height: "auto",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
		// padding: 5,
	},
	expandSectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		// padding: 15,
		marginTop: 25,
		marginVertical: 15,
	},
	sectionViewCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		// padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	cardSection: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		// borderRadius: 16,
		marginBottom: 1,
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
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#1269A9",
	},
	rewardTitle: {
		fontWeight: "700",
		fontSize: 18,
		color: "#1269A9",
		marginBottom: 15,
	},
	rewardText: {
		fontWeight: "700",
		// fontSize: 16,
		color: "#1269A9",
		marginBottom: 5,
		// textAlign:'center'
	},
	rewardFooter: {
		// fontWeight: "700",
		fontSize: 12,
		color: "#1269A9",
		marginBottom: 5,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
		marginVertical: 5,
	},
	buttonCol: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
});
