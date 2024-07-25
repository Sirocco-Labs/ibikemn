import { useState, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	TouchableOpacity,
	Platform,
} from "react-native";
import { Video } from "expo-av";
import { Text, Icon, Slider } from "@rneui/themed";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoMediaItem({ vid, actions }) {
	const vidRef = useRef(null);
	const [status, setStatus] = useState({});
	const [loading, setLoading] = useState(true);
	const [vidInfo, setVidInfo] = useState({});
	const [fullScreen, setFullScreen] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [orientation, setOrientation] = useState(null);

	const [how, setHow] = useState("");

	const [videoContainerWidth, setVideoContainerWidth] = useState(
		Dimensions.get("window").width
	);
	const {
		id,
		media_url,
		media_format,
		media_title,
		media_caption,
		is_displayed,
		created_at,
	} = vid;

	const { open, setOpen } = actions;

	const handleFullscreenUpdate = async ({ fullscreenUpdate }) => {
		console.log("@#$UPDATE", vidInfo);

		if (vidInfo.naturalSize.orientation === "landscape") {
			if (fullscreenUpdate < 2) {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.LANDSCAPE
				);
				setFullScreen(true);
				if (open) {
					setOpen(false);
				}
			} else if (fullscreenUpdate > 2) {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT_UP
				);
				setFullScreen(false);
				if (open) {
					setOpen(false);
				}
			}
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
		console.log("$*V--READY----->", vid.id);
		console.log("$*V--READY DETAILS ----->", details);
		setVidInfo(details);
	};

	const handleLayout = (event) => {
		console.log("$*V--HANDLE LAYOUT ----->", event);
		const { width } = event.nativeEvent.layout;
		setVideoContainerWidth(width);
	};

	const handlePlayPause = async () => {
		setIsPlaying(!isPlaying);
		if (status.isPlaying) {
			vidRef.current.pauseAsync();
		} else {
			vidRef.current.playAsync();
		}
	};
	const handleMute = () => {
		setIsMuted(!isMuted);
		vidRef.current.setIsMutedAsync(!isMuted);
	};

	const handleFullscreen = () => {
		if (fullScreen) {
			vidRef.current.dismissFullscreenPlayer();
		} else {
			vidRef.current.presentFullscreenPlayer();
		}
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};
	const handleEnd = async () => {
		await vidRef.current.setPositionAsync(0);
		await vidRef.current.stopAsync();
	};

	useEffect(() => {
		if (status.didJustFinish) {
			handleEnd();
		}
	}, [status]);

	return (
		<>
			{media_title && (
				<Text
					style={{
						fontSize: 17,
						marginBottom: 10,
						fontWeight: "700",
					}}
				>
					{media_title}
				</Text>
			)}
			<View
				style={[
					styles.videoContainer,
					{
						aspectRatio:
							vidInfo?.naturalSize?.orientation === "portrait"
								? 9 / 16
								: 16 / 9,
					},
				]}
				onLayout={handleLayout}
			>
				{!status.isLoaded && (
					<View
						style={{
							flex: 1,
						}}
					>
						<ActivityIndicator
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
							}}
							size="large"
						/>
					</View>
				)}
				<Video
					ref={vidRef}
					source={{ uri: media_url }}
					useNativeControls={false}
					onPlaybackStatusUpdate={handleStatus}
					style={[
						loading
							? {
									display: "hidden",
							  }
							: {
									flex: 1,
									width: fullScreen
										? "100%"
										: videoContainerWidth,
									borderRadius: 12,
							  },
					]}
					resizeMode="contain"
					isMuted={false}
					onFullscreenUpdate={handleFullscreenUpdate}
					onReadyForDisplay={handleReady}
					onLoadStart={() => {
						setLoading(true);
					}}
					onLoad={(status) => {
						// console.log("$*V--LOADING", status);

						if (status.isLoaded) {
							setLoading(false);
						}
					}}
				/>
				<View style={styles.controls}>
					<TouchableOpacity onPress={handlePlayPause}>
						<Icon
							type="material-community"
							name={status.isPlaying ? "pause" : "play"}
							size={30}
							color="#fff"
						/>
					</TouchableOpacity>

					<View style={styles.progress}>
						<Text style={styles.time}>
							{status.positionMillis
								? formatTime(
										Math.floor(status.positionMillis / 1000)
								  )
								: `0:00`}
						</Text>
						<Slider
							style={styles.slider}
							minimumValue={0}
							maximumValue={status.durationMillis}
							value={status.positionMillis}
							onValueChange={(value) => {
								vidRef.current.setPositionAsync(value);
							}}
							minimumTrackTintColor="#FFFFFF"
							maximumTrackTintColor="#000000"
							thumbProps={{
								height: 8,
								width: 8,
								color: "#F7B247",
							}}
						/>
						<Text style={styles.time}>
							{status.durationMillis
								? formatTime(
										Math.floor(status.durationMillis / 1000)
								  )
								: `0:00`}
						</Text>
					</View>

					{/* <TouchableOpacity onPress={changeOrientation}> */}
					<TouchableOpacity onPress={handleFullscreen}>
						<Icon
							type="material-community"
							name={fullScreen ? "fullscreen-exit" : "fullscreen"}
							size={30}
							color="#fff"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={handleMute}>
						<Icon
							type="material-community"
							name={isMuted ? "volume-off" : "volume-high"}
							size={30}
							color="#fff"
						/>
					</TouchableOpacity>
				</View>
			</View>
			{media_caption && (
				<Text style={{ alignSelf: "center", marginBottom: 20 }}>
					{media_caption}
				</Text>
			)}
		</>
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
		// flex:1,
		width: "100%",
		marginBottom: 10,
	},
	controls: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 10,
		borderRadius: 12,
		// borderBottomLeftRadius:12,
		// borderBottomRightRadius:12
	},
	progress: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		marginHorizontal: 10,
	},
	time: {
		color: "#fff",
	},
	slider: {
		flex: 1,
		marginHorizontal: 10,
	},
	fullscreenVideoContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		width: "100%",
		height: "100%",
	},
});
