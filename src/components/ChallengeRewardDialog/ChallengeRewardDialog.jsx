import {
	View,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	StatusBar,
	ScrollView,
} from "react-native";

import { Text, Image, Dialog} from "@rneui/themed";
import ScaleButton from "../ScaleButton/ScaleButton";
import { Video } from "expo-av";
import { useState, useRef, useCallback, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

import VideoMediaItem from "../VideoMediaItem/VideoMediaItem";

export default function ChallengeRewardDialog({ chal, actions }) {
	const { promo_video, reward_photo, reward_description } = chal;
	const {open, setOpen} = actions
	const vidRef = useRef(null);
	const imgRef = useRef(null);
	const [status, setStatus] = useState({});
	const [loading, setLoading] = useState(true);

	const [vidInfo, setVidInfo] = useState({});
	const [fullScreen, setFullScreen] = useState(false);

	const [loadingH, setLoadingH] = useState(
		(Dimensions.get("window").height - 100) / 4
	);

	const changeOrientation = async (event) => {
		let screenStatus = event.fullscreenUpdate;
		console.log("$*V-------> ORIENTATION EVENT", event);
		if (screenStatus === 1) {
			setFullScreen(true);
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);
			console.log("$*V-------> ORIENTATION EVENT", vidRef.current);
		} else {
			setFullScreen(false);
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT
			);
			console.log("$*V-------> ORIENTATION EVENT", vidRef.current);
		}
	};

	const handleStatus = async (playStatus) => {
		if (playStatus.didJustFinish) {
			console.log("$*V--HANDLE STATUS REF ----->", vidRef.current);
			await vidRef.current.setPositionAsync(0);
			await vidRef.current.stopAsync();
		}
		console.log("$*V--HANDLE STATUS ----->", playStatus);
		setStatus(playStatus);
	};
	const handleReady = (details) => {
		console.log("$*V--READY----->", chal.id);
		console.log("$*V--READY DETAILS ----->", details);
		setVidInfo(details);
	};

	useEffect(() => {
		if (imgRef.current) {
			console.log("$*I--UE", imgRef.current);
		}
	}, [imgRef]);

	const vid = { media_url: chal.promo_video };

	return (
		<Dialog
			isVisible={open}
			onBackdropPress={() => {
				setOpen(false);
			}}
			onDismiss={() => {
				setOpen(false);
			}}
			overlayStyle={[styles.dialog]}
		>
			<ScrollView
				contentContainerStyle={[
					{
						justifyContent: "center",
						alignItems: "center",
					},
				]}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
				>
					<View>
						{chal.promo_video && (
							<View
								style={{
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%",
									marginVertical: 10,
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "700",
										marginBottom: 5,
									}}
								>
									Get inspired
								</Text>
								<VideoMediaItem vid={vid} actions={actions} />
							</View>
						)}
					</View>
					<View>
						{chal.reward_photo && (
							<View
								style={{
									// flex: 1,
									justifyContent: "space-between",
									alignItems: "center",
									// marginVertical: 15,
									width: "100%",
								}}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "700",
										marginBottom: 5,
									}}
								>
									Reward details
								</Text>

								<View
									style={[
										styles.videoContainer,
										{
											aspectRatio:
												vidInfo?.naturalSize
													?.orientation === "portrait"
													? 9 / 16
													: 16 / 9,
										},
									]}
								>
									<Image
										source={{ uri: chal.reward_photo }}
										// contentFit="cover"
										resizeMode="contain"
										containerStyle={{ flex: 1 }}
										placeholderStyle={{
											flex: 1,
											backgroundColor: "#fff",
										}}
										transition
										transitionDuration={300}
										PlaceholderContent={
											<View
												style={{
													// display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width:
														Dimensions.get("window")
															.width - 50,
													height: loadingH,
												}}
											>
												<ActivityIndicator
													style={{
														// flex: 1,
														justifyContent:
															"center",
														alignItems: "center",
													}}
													size="large"
												/>
											</View>
										}
									/>
								</View>
								<Text
									style={{
										fontSize: 13,
										fontWeight: "700",
										// alignSelf:'flex-start',
									}}
								>
									{chal.reward_description}
								</Text>
							</View>
						)}
					</View>
				</View>
			</ScrollView>
		</Dialog>
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
	dialog: {
		flex: 0.85,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		borderWidth: 2,
		borderColor: "#F7B247",
		width: "85%",
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
	videoContainer: {
		// flex: 1,
		width: "100%",
		marginBottom: 10,
	},
});
