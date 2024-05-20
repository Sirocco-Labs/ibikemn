import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ProgressBike = ({ earned, loading, stats, unit, motivation }) => {
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

	return earned >= 1 ? (
		<View style={styles.completed}>
			<Text style={{ color: "#1269A9" }}>Challenge Completed!</Text>
		</View>
	) : (
		<View style={[styles.container]}>
			<View style={[styles.innerContainer]}>
				<View style={styles.checking}>
					{load ? (
						<View style={styles.progressText}>
							<Text
								style={{
									color: "#000",
									fontSize: 14,
								}}
							>
								Checking for updates...
							</Text>
						</View>
					) : (
						<View style={styles.progressText}>
							<Text
								style={{
									color: "#000",
									fontSize: 13,
								}}
							>
								{earned
									? `${Math.round(earned * 100)}%`
									: `Hit the road to track rides for this challenge!`}
							</Text>
						</View>
					)}
				</View>

				<ProgressBar
					progress={earned}
					animated
					indeterminate={load}
					indeterminateAnimationDuration={500}
					width={310}
					height={20}
					color="#F7B247"
					// unfilledColor="#f9f9f9"
					borderWidth={1}
					borderRadius={15}
					style={{ borderColor: "#F7B247" }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginVertical: 5,
	},
	innerContainer: {
		// flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		// width: "100%",
		marginVertical: 10,
		// borderWidth: 1,
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
		top: 1,
		zIndex: 2,
		width: "100%",
		paddingLeft: 15,
	},
	progressText: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	completed: {
		justifyContent: "center",
		alignItems: "center",
		width:'100%'
	},
});

export default ProgressBike;
