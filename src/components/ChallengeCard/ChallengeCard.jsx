import {
	StyleSheet,
	View,
	Pressable,
	Dimensions,
	ScrollView,
	StatusBar,
	SafeAreaView,
} from "react-native";
import { Text, Dialog, Avatar, Button } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBike from "../ProgressBike/ProgressBike";
import ChallengeRewardDialog from "../ChallengeRewardDialog/ChallengeRewardDialog";

export default function ChallengeCard({ item, prog }) {
	const [earned, setEarned] = useState({});
	const [open, setOpen] = useState(false);
	const is_updated = useSelector((store) => store.incentives.updated);
	// const [dHeight, setDHeight] = useState(Dimensions.get("window").height/1.25);
	const [dHeight, setDHeight] = useState(
		Dimensions.get("window").height - 200
	);

	const onMeasure = (height) => {
		setDHeight(height);
	};

	useEffect(() => {
		console.log("$$$$ progressUpdated", is_updated);
	}, [is_updated]);

	useEffect(() => {
		progressValue(item, prog);
	}, [prog]);

	const progressValue = (item, prog) => {
		// console.log("$$ PROG", prog);
		// console.log("$$ ITEM", item);
		let check = prog.find((comp) => comp.active_incentive_id === item.id);
		if (check) {
			// console.log("$$ CHECK", check);
			// console.log("$$ CHECK", check);
			setEarned(check);
		}
	};
	const toGo = (item, earned) => {
		// console.log("$$ TOGO", item.id, earned);

		const endDate = new Date(item.end_date).toLocaleString("en-US", {
			weekday: "long",
			month: "short",
			day: "numeric",
			year: "numeric",
		});
		const endTime = new Date(item.end_date).toLocaleString("en-US", {
			dayPeriod: "short",
			hour: "numeric",
			minute: "numeric",
		});

		let goal = item.info.point_value;
		let soFar = earned.earned_points_toward_goal
			? earned.earned_points_toward_goal
			: 0;
		let remaining = goal - soFar;

		remaining = Math.round(remaining * 100) / 100;

		if (earned.completion_progress >= 1) {
			return (
				<>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: "#1269A9",
							textAlign: "center",
						}}
					>
						{`Completed!`}
					</Text>
					<Text
						style={{
							fontSize: 16,
							// fontWeight: "bold",
							color: "#1269A9",
							textAlign: "center",
							marginTop: 10,
						}}
					>
						{`Keep up the great work `}
					</Text>
				</>
			);
		} else {
			return (
				<Text
					style={{
						fontSize: 14,
						// fontWeight: "bold",
						color: "#1269A9",
						textAlign: "center",
					}}
				>
					{item.info.category.unit_of_measure === "rides"
						? `Finish ${
								item.info.point_value === 1
									? `${remaining} more ${item.info.category.unit_of_measure.slice(
											0,
											-1
									  )}`
									: `${remaining} more ${item.info.category.unit_of_measure}`
						  } before:\n${endDate.replace(
								/,(?=\s\w+)/,
								""
						  )} at ${endTime}`
						: `Ride ${
								item.info.point_value === 1
									? `${remaining} more ${item.info.category.unit_of_measure.slice(
											0,
											-1
									  )}`
									: `${remaining} more ${item.info.category.unit_of_measure}`
						  } before:\n${endDate.replace(
								/,(?=\s\w+)/,
								""
						  )} at ${endTime}`}
				</Text>
			);
		}
	};

	//    console.log('GOAL PROG', prog);

	return earned ? (
		<>
			<View style={styles.card}>
				<View style={[styles.leftColAr]}>
					<Text style={styles.cardTitle}>{item?.info.title}</Text>
					<Text style={styles.cardDescription}>
						{item.info.description}
					</Text>
				</View>

				<View style={styles.cenColEnd}>
					<ProgressBike
						earned={earned.completion_progress}
						loading={!is_updated}
						stats={earned}
						unit={item.info.category.unit_of_measure}
						motivation={toGo(item, earned)}
					/>
					{toGo(item, earned)}
				</View>
				{(item.promo_video || item.reward_photo) && (
					<View
						style={{
							width: "100%",
							flexDirection: "row",
							justifyContent: "flex-end",
						}}
					>
						<Pressable
							style={styles.rewardDetails}
							onPress={() => {
								setOpen(!open);
							}}
						>
							<Text
								style={{
									fontSize: 14,
									fontWeight: "bold",
									color: "#1269A9",
								}}
							>
								More info
							</Text>
							<Avatar
								rounded
								icon={{
									type: "material-community",
									name: "information-variant",
									// name: "information",
									size: 17,
									color: "#1269A9",
								}}
								containerStyle={{
									backgroundColor: "#F7B247",
									borderColor: "#1269A9",
									borderWidth: 1.5,
									justifyContent: "center",
									alignContent: "center",
									// alignSelf: "flex-start",
									marginHorizontal: 5,
									height: 20,
									width: 20,
								}}
							/>
						</Pressable>
					</View>
				)}
			</View>

				<Dialog
					isVisible={open}
					onBackdropPress={() => {
						setOpen(!open);
					}}
					onDismiss={() => {
						setDHeight(null);
					}}
					overlayStyle={[
						styles.dialog,
					]}
				>

					<ChallengeRewardDialog chal={item} onMeasure={onMeasure} />
				</Dialog>
		</>
	) : (
		<></>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "flex-start",
		padding: 5,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#1269A9",
		marginRight: 8,
		width: 320,
	},
	dialog: {
		flex:.85,
		justifyContent:'center',
		alignItems:'center',
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#F7B247",
		width: "85%",
	},
	endDate: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	leftColBe: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	leftColAr: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
		padding: 5,
	},
	cenColEnd: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginVertical: 15,
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
	rewardDetails: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
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
	attention: {
		fontSize: 15,
		color: "#F7B247",
		fontWeight: "bold",
		marginBottom: 10,
	},
	cardDescription: {
		fontSize: 13,
		color: "#000",
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
