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
		<View>
			<Text>Challenge Completed!</Text>
		</View>
	) : (
		<View style={[styles.container]}>
			<Text
				style={{
					fontSize: 13,
					// fontWeight: "bold",
					color: "#1269A9",
					alignSelf: "center",
				}}
			>
				{motivation}
			</Text>
			<View style={[styles.innerContainer]}>
				<View style={styles.checking}>
					{load ? (
						<View style={styles.progressText}>
							<Text
								style={{
									color: "#000",
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
									color: "#000",
									fontSize: 14,
									// fontWeight: "bold",
								}}
							>
								{earned ? `${Math.round(earned * 100)}%` : `Start riding to earn progress`}
							</Text>
						</View>
					)}
				</View>

				<ProgressBar
					progress={earned}
					animated
					indeterminate={load}
					indeterminateAnimationDuration={500}
					width={320}
					height={25}
					color="#F7B247"
					// unfilledColor="#f9f9f9"
					borderWidth={1}
					borderRadius={15}
					style={{ borderColor: "#F7B247" }}
				/>
				{/* <View style={{ width: `${earned * 90}%` }}></View> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-end",
		marginVertical: 5,
	},
	innerContainer: {
		flexDirection: "row",
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
		top: 2.5,
		zIndex: 2,
		width: "70%",
		paddingLeft: 15,
	},
	progressText: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default ProgressBike;

{
	/*

{!load && (
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
			)}
*/
}
