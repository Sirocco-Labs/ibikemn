import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProgressBike = ({ earned, loading, stats }) => {
	const [load, setLoad] = useState(false);
	const [wide, setWide] = useState(0);
	useEffect(() => {
		if (loading) {
			setLoad(true);
			setTimeout(() => {
				setLoad(false);
			}, 2000);
		} else {
			let size = earned * 100 - 2;
			setWide(size);
		}
		console.log("earned", earned);
	}, [loading, earned]);

	return earned >= 2 ? (
		<View>
			<Text></Text>
		</View>
	) : (
		<View style={[styles.container]}>
			<View style={[styles.innerContainer]}>
				<View style={styles.checking}>
					{load ? (
						<View style={styles.progressText}>
							<Text
								style={{
									color: "#1269A9",
									fontSize: 14,
									fontWeight: "bold",
								}}
							>
								Checking for updates...
							</Text>
						</View>
					) : (
						<View style={styles.progressText}>
							<Text
								style={{
									color: "#1269A9",
									fontSize: 14,
									fontWeight: "bold",
								}}
							>
								{stats.earned_points_toward_goal? `${stats.earned_points_toward_goal}` : '0' }
							</Text>
							<Text
								style={{
									color: "#1269A9",
									fontSize: 14,
									fontWeight: "bold",
								}}
							>
								{/* {` ${stats.active_challenge.challenge_info.point_value}`} */}
							</Text>
						</View>
					)}
				</View>
				<ProgressBar
					progress={earned}
					animated
					indeterminate={load}
					indeterminateAnimationDuration={500}
					width={300}
					height={30}
					color="#F7B247"
					// unfilledColor="#f0f0f0"
					// unfilledColor="#1269A9"
					borderWidth={1}
					borderRadius={5}
				/>
				{/* <View style={{ width: `${earned * 90}%` }}></View> */}
			</View>
			{/* {!load && (
				<View
					style={[styles.bikeRow,]}
				>
					<View
						style={[
							{ width: `${wide}%` },
						]}
					></View>
					<View
						style={[
							styles.progress,
							earned <= 0.02
								? { marginLeft: -15 }
								: { marginLeft: -25 },
						]}
					>
						<Icon
							name="bike"
							size={25}
							color="#1269A9"
							// style={[
							// 	styles.bikeIcon,
							// 	earned > 0
							// 		? { left: `${100 * earned - 10}%` }
							// 		: { left: `${100 * earned - 5.5}%` },
							// ]}
						/>
					</View>
				</View>
			)} */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-end",
		// width: "100%",
		height: "100%",
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	progressBar: {
		borderColor: "#F7B247",
	},
	bikeRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	progress: {
		justifyContent: "center",
		alignItems: "center",
		height: 30,
		marginTop: -30,
		width: 30,
	},
	checking: {
		position: "absolute",
		left: 0,
		zIndex: 2,
        width:'95%',
        paddingHorizontal:10
	},
	progressText: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
        width:'100%'
	},
});

export default ProgressBike;
