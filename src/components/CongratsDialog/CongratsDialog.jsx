import {
	StyleSheet,
	View,
	// Animated,
	FlatList,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { Text, Divider, Dialog } from "@rneui/themed";
import { useEffect, useState, useCallback, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import Congratulations from "..//Congratulations/Congratulations";
import Confetti from "react-native-simple-confetti";
import ScaleButton from "../ScaleButton/ScaleButton";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

import AnimatedText from "../AnimatedText/AnimatedText";

export default function CongratsDialog({
	actions,
	challengesMet,
	completedMessage,
}) {
	const { completed, setCompleted } = actions;
	const [finished, setFinished] = useState(false);
	const reset = () => {
		setCompleted(false);
		setFinished(false);
	};

	return (
		<>
			<Dialog
				isVisible={completed}
				onBackdropPress={() => {
					reset();
					// setCompleted(false);
				}}
				overlayStyle={{
					borderRadius: 16,
					// flex:1,
					// height: "50%",
					width: "85%",
					padding: 5,
					backgroundColor: "#F7B247",
				}}
				backdropStyle={{ backgroundColor: "transparent" }}
				// backdropStyle={{ backgroundColor: "#F7B247" }}
			>
				<View style={styles.rewardSection}>
					<View style={styles.completedContent}>
						<Congratulations setFinished={setFinished} />
					</View>
					<View style={styles.completedContent}>
						<AnimatedText
							text={`Congrats on completing the "${completedMessage.title}" challenge!`}
						/>
					</View>
					{challengesMet.length > 0 && (
						<View style={styles.cenColAr}>
							{finished ? (
								<ScaleButton
									looks={[styles.solidButton, { width: 150 }]}
									onPress={() => {
										reset();
										// setCompleted(false);
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
							) : (
								<View style={styles.placeholder}></View>
							)}
						</View>
					)}
				</View>
			</Dialog>
			{finished && (
				<View
					style={{
						position: "absolute",
						zIndex: 3,
						elevation: 3,
						height: "100%",
						width: "50%",
					}}
				>
					<View

                    >
						<Confetti
							count={100}
							type="tumble"
							fromCenter={true}
							itemSize={5}
						/>
					</View>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	completedContent: {
		display: "flex",
		flexDirection: "column",
		// flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		// height: "25%",
		padding: 5,
		marginBottom: 10,
	},
	rewardSection: {
		// position: "absolute",
		// zIndex: 3,
		// elevation: 3,
		// display: "flex",
		// flexDirection: "column",
		height: "auto",
		alignItems: "flex-start",
		justifyContent: "space-between",
		// width: "100%",
		// padding: 5,
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},

	rewardText: {
		fontWeight: "700",
		// fontSize: 16,
		color: "#1269A9",
		marginBottom: 5,
		textAlign: "center",
		color: "#fff",
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
		marginVertical: 5,
	},
	placeholder: {
		height: 55,
		width: "100%",
		padding: 2,
		marginVertical: 5,
	},
});
