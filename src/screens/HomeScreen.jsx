import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import CustomSpeedDial from "../components/CustomSpeedDial/CustomSpeedDial";
import {
	StyleSheet,
	View,
	FlatList,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { Text, Divider, Dialog } from "@rneui/themed";
import { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	staffGetBikes,
	getMyBike,
} from "../redux/thunks/private/staffBikeThunk";
import { clearOrgBikes } from "../redux/slices/private/orgBikeSlice";
import { clearMyBike } from "../redux/slices/private/staffBikeSlice";
import { clearDistance } from "../redux/slices/distanceSlice";

import { getUserTravelStats } from "../redux/thunks/userRidesThunk";
import {
	getActiveIncentives,
	getUserIncentiveProgress,
	getUserIncentiveHistory,
	getAllPreviousChallenges,
} from "../redux/thunks/incentiveThunk";

import {
	setIsProgressUpdated,
	setShowRewardDialog,
} from "../redux/slices/incentiveSlice";

import UserStatsSection from "../components/UserStatsSection/UserStatsSection";
import { getMyRideSurveys } from "../redux/thunks/rideSurveyThunk";

import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import { useFocusEffect } from "@react-navigation/native";

import * as Network from "expo-network";
import { InitialLocationPermissionRequest } from "../tasks/RequestLocationPermission";
import { getWinningInfo } from "../redux/thunks/rewardThunk";

import ScaleButton from "../components/ScaleButton/ScaleButton";

export default function HomeScreen() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

	const travelStats = useSelector((store) => store.travelStats);

	const userInfo = { user_id: user.user_id, publicUser: user.is_public };

	const activeChallenges = useSelector((store) => store.incentives.active);

	const challengeProgress = useSelector((store) => store.incentives.progress);
	const rewardWinner = useSelector((store) => store.incentives.reward);
	const showRewardDialog = useSelector(
		(store) => store.incentives.showRewardDialog
	);

	const surveyHistory = useSelector((store) => store.rideSurveys);

	const [refreshing, setRefreshing] = useState(false);
	const [mostCommon, setMostCommon] = useState({});
	const [newChallenge, setNewChallenge] = useState({});
	const [connected, setConnected] = useState(true);
	const [winner, setWinner] = useState(false);
	const [showFAB, setShowFAB] = useState(false);

	const [rewardNotice, setRewardNotice] = useState(false);

	useFocusEffect(
		useCallback(() => {
			dispatch(getUserTravelStats(user.user_id));
			dispatch(getActiveIncentives(userInfo));
			dispatch(getMyRideSurveys(user.user_id));
			dispatch(getUserIncentiveHistory(user.user_id));
			dispatch(getAllPreviousChallenges(user.is_public));
			dispatch(getWinningInfo(user.id));

			// dispatch(getUserIncentiveProgress(user.user_id));
		}, [dispatch])
	);

	const onRefresh = async () => {
		setRefreshing(true);
		dispatch(setIsProgressUpdated(false));
		try {
			dispatch(getUserTravelStats(user.user_id));
			dispatch(getActiveIncentives(userInfo));
			dispatch(getMyRideSurveys(user.user_id));
			dispatch(getUserIncentiveHistory(user.user_id));
			dispatch(getAllPreviousChallenges(user.is_public));
			dispatch(getUserIncentiveProgress(user.user_id));
		} catch (error) {
		} finally {
			setRefreshing(false);
		}
	};

	useEffect(() => {
		function mostFrequent() {
			const props = ["is_solo", "destination_type", "route_type"];

			const counts = props.reduce((time, property) => {
				time[property] = surveyHistory.reduce((propCounts, obj) => {
					let value = obj[property];
					if (property === "destination_type") {
						if (
							value ===
							"Errands (grocery store, post office, etc)"
						) {
							value = "Errands";
						} else if (
							value ===
							"A place for recreation (local park, landmark, or trail)"
						) {
							value = "Recreational";
						} else if (
							value ===
							"A place for socializing (a restaurant, bar, library)"
						) {
							value = "Social";
						} else if (value === "I rode for fitness") {
							value = "Fitness";
						}
						propCounts[value] = (propCounts[value] || 0) + 1;
					} else if (property === "route_type") {
						if (
							value ===
							"On road infrastructure (a bike lane, cycle track)"
						) {
							value = "Bike Lane";
						} else if (value === "Bike trail") {
							value = "Bike Trail";
						} else if (value === "A mix of both") {
							value = "Mixed";
						} else if (
							value ===
							"My route didn't include any bike friendly pathways"
						) {
							value = "Unfriendly";
						}
						propCounts[value] = (propCounts[value] || 0) + 1;
					} else {
						propCounts[value] = (propCounts[value] || 0) + 1;
					}
					return propCounts;
				}, {});
				return time;
			}, {});
			const mostCommonValues = {};
			for (const property of props) {
				let mostCommonValue = null;
				let highestCount = 0;
				for (const [value, count] of Object.entries(counts[property])) {
					if (count > highestCount) {
						mostCommonValue = value;
						highestCount = count;
					}
				}
				property === "is_solo"
					? (mostCommonValues[`${property}`] = {
							solo: counts[`${property}`][true] || 0,
							group: counts[`${property}`][false] || 0,
							value:
								mostCommonValue === "true" ? "Solo" : "Group",
							frequency: highestCount,
					  })
					: (mostCommonValues[`${property}`] = {
							value: mostCommonValue,
							frequency: highestCount,
					  });
			}

			return mostCommonValues;
		}
		setMostCommon(mostFrequent());
	}, [surveyHistory]);

	useEffect(() => {
		function findClosestTimestamp(array) {
			return array.reduce((closest, current) => {
				const currentTimestamp = new Date(current.created_at).getTime();
				const closestTimestamp = closest
					? new Date(closest.created_at).getTime()
					: Infinity;
				const currentTime = new Date().getTime();

				if (
					Math.abs(currentTimestamp - currentTime) <
					Math.abs(closestTimestamp - currentTime)
				) {
					return current;
				} else {
					return closest;
				}
			}, null);
		}
		setNewChallenge(findClosestTimestamp(activeChallenges));
	}, [activeChallenges]);

	const challengesMet = activeChallenges.filter((challenge) => {
		const progress = challengeProgress.find(
			(prog) => prog.active_incentive_id === challenge.id
		);
		return progress && progress.has_been_met;
	});

	const challengesNotMet = activeChallenges.filter((challenge) => {
		const progress = challengeProgress.find(
			(prog) => prog.active_incentive_id === challenge.id
		);
		return !progress || !progress.has_been_met;
	});

	const sortedChallenges = [...challengesNotMet, ...challengesMet];

	useEffect(() => {
		if (rewardWinner && rewardWinner.length > 0) {
			console.log("setting winner true");
			setWinner(true);
		}
	}, []);
	useEffect(() => {
		setShowFAB(true);
	}, []);

	if (user.username !== "finish_set_up") {
		return (
			<ScreenWrapper
				background={{ backgroundColor: "#fff" }}
				onRefresh={onRefresh}
				refreshing={refreshing}
			>
				<View style={styles.sectionView}>
					{/* <Dialog
						isVisible={winner}
						onBackdropPress={() => {
							setWinner(false);
						}}
						overlayStyle={{
							// height: "50%",
							width: "75%",
							padding: 5,
							borderColor: "#F7B247",
							borderWidth: 3,
						}}
					>
						<View style={styles.rewardSection}>
							<View style={styles.dialogContent}>
								<Text style={styles.rewardTitle}>
									Congrats {user.username}!
								</Text>
							</View>
							{rewardWinner &&
							rewardWinner.map((reward) => (
								<View
									key={reward.id}
									style={styles.dialogContent}
								>
									<Text style={styles.rewardText}>
										You are the winner of the{" "}
										{reward.incentive_info.title} challenge,
										please check your email for instruction
										on how to claim your reward.
									</Text>
								</View>
							))
							}
							<View style={styles.cenColAr}>
								<ScaleButton
									looks={[styles.solidButton, { width: 150 }]}
									onPress={() => {
										setWinner(false);
									}}
								>
									<Text
										style={{
											fontSize: 18,
											fontWeight: "700",
											color: "#fff",
										}}
									>
										Close
									</Text>
								</ScaleButton>
								<View style={styles.dialogContent}>
									<Text
										style={[
											styles.rewardFooter,
											{ textAlign: "center" },
										]}
									>
										If you have any questions, or need
										assistance please contact
										_____@bikemn.org.
									</Text>
								</View>
							</View>
						</View>
					</Dialog> */}

					{/* {winner && (
						<View style={styles.rewardSection}>
							{rewardWinner.map((reward) => (
								<View key={reward.id}>
									<Text style={styles.rewardTitle}>
										Congrats {user.username}!
									</Text>
									<Text style={styles.rewardTitle}>
										You are the winner of the{" "}
										{reward.incentive_info.title} challenge
									</Text>
								</View>
							))}
						</View>
					)} */}

					<View style={styles.leftColAr}>
						<Text
							style={[styles.sectionText, { marginBottom: 10 }]}
						>
							{user.username}'s Stats
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
								marginTop: 20,
								marginBottom: 5,
							},
						]}
					>
						Active Challenge Progress
					</Text>

					<View style={styles.cardSection}>
						<FlatList
							data={sortedChallenges}
							horizontal
							renderItem={({ item }) => (
								<ChallengeCard
									item={item}
									// prog={challengeProgress.find(
									// 	(prog) =>
									// 		prog.active_incentive_id === item.id
									// )}
									prog={challengeProgress}
								/>
							)}
							keyExtractor={(item) => item.id}
						/>
					</View>
				</View>
				<CustomSpeedDial />
			</ScreenWrapper>
		);
	} else {
		return <View></View>;
	}
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
		marginBottom: 5,
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
