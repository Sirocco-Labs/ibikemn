import { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Text } from "@rneui/themed";
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoMediaItem({ vid }) {
	const vidRef = useRef(null);
	const [status, setStatus] = useState({});
	const [loading, setLoading] = useState(true);
	const [vidInfo, setVidInfo] = useState({});
	const [fullScreen, setFullScreen] = useState(false);
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

	const changeOrientation = async (event) => {
		let screenStatus = event.fullscreenUpdate;
		console.log("$*V-------> ORIENTATION EVENT", event);
		if (screenStatus === 1) {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);
		} else {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.DEFAULT
			);
		}
        setFullScreen(!fullScreen);
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
		// // setStatus(status)
		// console.log("$*V--DETAILS ----->", details.naturalSize.orientation);

		// console.log("$*V--DEET BUFFER ----->", details.status.isBuffering);
	};
	const handleLayout = (event) => {
		console.log("$*V--HANDLE LAYOUT ----->", event);
		const { width } = event.nativeEvent.layout;
		setVideoContainerWidth(width);
	};

	return (
		<>
			<Text style={{ alignSelf: "flex-start", marginBottom: 10 }}>
				{media_title}
			</Text>
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
							borderWidth: 2,
							borderColor: "#1269A9",
							borderRadius: 5,
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
					useNativeControls
					onPlaybackStatusUpdate={handleStatus}
					style={[
						loading
							? {
									// flex: 1,
									// width: fullScreen
									// 	? "100%"
									// 	: videoContainerWidth,
									display: "hidden",
									// // alignSelf: "stretch",
									// marginVertical: 15,
									// // marginHorizontal: 15,
									// padding: 25,
							  }
							: {
									flex: 1,
									width: fullScreen
										? "100%"
										: videoContainerWidth,
									// // alignSelf: "stretch",
									// marginVertical: 15,
									// // marginHorizontal: 15,
									// padding: 25,
							  },
					]}
					// orientation='landscape'
					resizeMode="contain"
					isMuted={false}
					onFullscreenUpdate={changeOrientation}
					onReadyForDisplay={handleReady}
					onLoadStart={() => {
						setLoading(true);
					}}
					onLoad={(status) => {
						console.log("$*V--LOADING", status);

						if (status.isLoaded) {
							setLoading(false);
						}
					}}
				/>
			</View>
			<Text style={{ alignSelf: "flex-start", marginBottom: 10 }}>
				{media_caption}
			</Text>
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
});
