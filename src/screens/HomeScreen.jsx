import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import CustomSpeedDial from "../components/CustomSpeedDial/CustomSpeedDial";
import {
	StyleSheet,
	View,
	FlatList,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { Text, Divider } from "@rneui/themed";
import React, { useEffect, useState } from "react";

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

import { setIsProgressUpdated } from "../redux/slices/incentiveSlice";

import ExpandChallenges from "../components/ExpandChallenges/ExpandChallenges";
import UserStatsSection from "../components/UserStatsSection/UserStatsSection";
import { getMyRideSurveys } from "../redux/thunks/rideSurveyThunk";

import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
	const dispatch = useDispatch();

	const user = useSelector((store) => store.user);

	const travelStats = useSelector((store) => store.travelStats);

	const userInfo = { user_id: user.user_id, publicUser: user.is_public };

	const activeChallenges = useSelector((store) => store.incentives.active);

	const challengeProgress = useSelector((store) => store.incentives.progress);

	const surveyHistory = useSelector((store) => store.rideSurveys);

	const [refreshing, setRefreshing] = useState(false);
	const [mostCommon, setMostCommon] = useState({});
	const [newChallenge, setNewChallenge] = useState({});

	useFocusEffect(
		React.useCallback(() => {
			dispatch(getUserTravelStats(user.user_id));
			dispatch(getActiveIncentives(userInfo));
			dispatch(getUserIncentiveProgress(user.user_id));
			dispatch(getMyRideSurveys(user.user_id));
			dispatch(getUserIncentiveHistory(user.user_id));
			dispatch(getAllPreviousChallenges(user.is_public));
		}, [dispatch])
	);

	const onRefresh = async () => {
		setRefreshing(true);
		dispatch(setIsProgressUpdated(false));
		try {
			dispatch(getUserTravelStats(user.user_id));
			dispatch(getActiveIncentives(userInfo));
			dispatch(getUserIncentiveProgress(user.user_id));
			dispatch(getMyRideSurveys(user.user_id));
			dispatch(getUserIncentiveHistory(user.user_id));
			dispatch(getAllPreviousChallenges(user.is_public));
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

	if (user.username !== "finish_set_up") {
		return (
			<ScreenWrapper
				underScroll={<CustomSpeedDial />}
				background={{ backgroundColor: "#fff" }}
				onRefresh={onRefresh}
				refreshing={refreshing}
				// noScroll={true}
			>
				<View style={styles.sectionView}>
					<View style={styles.leftColAr}>
						<Text style={styles.sectionText}>
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
							{ alignSelf: "flex-start", marginTop: 5 },
						]}
					>
						Active Challenges
					</Text>


						<View style={styles.cardSection}>
							<FlatList
								data={activeChallenges}
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

				</View>
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
});

{
	/* <Button
						raised
						onPress={() => {
							dispatch(staffGetBikes(user.org_id));
						}}
						containerStyle={styles.mv10}
					>
						get org bikes
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(getMyBike(user.user_id));
						}}
						containerStyle={styles.mv10}
					>
						get my bike
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearMyBike());
						}}
						containerStyle={styles.mv10}
					>
						clear my bike
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearOrgBikes());
						}}
						containerStyle={styles.mv10}
					>
						clear orgBikes
					</Button>
					<Button
						raised
						onPress={() => {
							dispatch(clearDistance());
						}}
						containerStyle={styles.mv10}
					>
						clear distance
					</Button> */
}
