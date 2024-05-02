import {
	SafeAreaView,
	StyleSheet,
	View,
	Modal,
	ScrollView,
} from "react-native";
import { Text, SpeedDial, Button, LinearProgress, Card } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBike from "../ProgressBike/ProgressBike";

import ShadowEffect from "../ShadowEffect/ShadowEffect";
import { Shadow } from "react-native-shadow-2";

export default function ChallengeCard({ item, prog }) {
	const [loading, setLoading] = useState(true);
	const [earned, setEarned] = useState({});
	const is_updated = useSelector((store) => store.incentives.updated);

	useEffect(() => {
		progressValue(item, prog);
	}, [prog]);

	const progressValue = (item, prog) => {
		let check = prog.find((prog) => prog.active_incentive_id === item.id);
		if (check) {
			setEarned(check);
		}
	};
	const toGo = (item, earned) => {

		let goal = item.info.point_value;
		let soFar = earned.earned_points_toward_goal
			? earned.earned_points_toward_goal
			: 0;
		let remaining = goal - soFar;

		remaining = Math.round(remaining * 100) / 100;

		return(item.info.category.unit_of_measure === "rides"
				? `Finish ${
						item.info.point_value === 1
							? `${remaining
							  } more ${item.info.category.unit_of_measure.slice(
									0,
									-1
							  )}`
							: `${remaining} more ${
									item.info.category.unit_of_measure
							  }`
				  } before the challenge ends!`
				: `Ride ${
						item.info.point_value === 1
							? `${remaining} more ${item.info.category.unit_of_measure.slice(
									0,
									-1
							  )}`
							: `${remaining} more ${
									item.info.category.unit_of_measure
							  }`
				  } before the challenge ends!`
		)
	};

	//    console.log('GOAL PROG', prog);

	return earned ? (
		<View style={styles.card}>
			<View style={styles.leftColAr}>
				<Text style={styles.cardTitle}>{item.info.title}</Text>
				<Text style={styles.cardDescription}>
					{item.info.description}
				</Text>
			</View>
			<View style={styles.cenColBe}>
				<ProgressBike
					earned={earned.completion_progress}
					loading={!is_updated}
					stats={earned}
					unit={item.info.category.unit_of_measure}
					motivation={toGo(item, earned)}
				/>
				{/* <View style={styles.endDate}> */}
				{/* <Text
					style={{
						fontSize: 14,
						fontWeight: "bold",
						// color: "#F7B247",
						color: "#1269A9",
						// color: "#681397",
					}}
				>
					{item.info.category.unit_of_measure === "rides"
						? `Finish ${
								item.info.point_value === 1
									? `${toGo(
											item,
											earned
									  )} more ${item.info.category.unit_of_measure.slice(
											0,
											-1
									  )}`
									: `${toGo(item, earned)} more ${
											item.info.category.unit_of_measure
									  }`
						  } before the challenge ends!`
						: `Ride ${
								item.info.point_value === 1
									? `${toGo(
											item,
											earned
									  )} more ${item.info.category.unit_of_measure.slice(
											0,
											-1
									  )}`
									: `${toGo(item, earned)} more ${
											item.info.category.unit_of_measure
									  }`
						  } before the challenge ends!`}
				</Text> */}
				<Text
					style={{
						fontSize: 14,
						// fontWeight: "bold",
						color: "#000",
						marginVertical: 5,
					}}
				>
					{`Challenge ends at 11:59pm on ${new Date(
						item.end_date
					).toLocaleDateString("en-US", {
						timeZone: "UTC",
					})}`}
				</Text>
			</View>
		</View>
	) : (
		<></>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
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
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	endDate: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	splitLeftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "40%",
	},
	splitLeftColCen: {
		justifyContent: "center",
		alignItems: "center",
		width: "40%",
	},
	splitRightColCen: {
		justifyContent: "center",
		alignItems: "flex-end",
		width: "40%",
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
		// marginVertical: 10,
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
	cardTitle: {
		fontSize: 20,
		color: "#1269A9",
		fontWeight: "bold",
		marginBottom: 10,
	},
	cardDescription: {
		fontSize: 13,
		color: "#000",
		marginBottom: 10,
	},
	card: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 5,
		borderWidth:1.5,
		borderColor: "#1269A9",
		marginVertical: 8,
		// borderRadius: 15,
	},
});

{
	/* <View style={[styles.leftColAr]}>
				<View style={styles.cenRow}>
					<Text>{item.info.title}</Text>
					<Text>
						{new Date(item.start_date).toLocaleDateString("en-US", {
							timeZone: "UTC",
						})}
					</Text>
				</View>

				<Text>{item.info.description}</Text>
				<Text>{`${item.info.point_value} ${item.info.category.unit_of_measure}`}</Text>
				<Text>
					{new Date(item.end_date).toLocaleDateString("en-US", {
						timeZone: "UTC",
					})}
				</Text>
			</View> */
}
