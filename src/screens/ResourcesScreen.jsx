import { SafeAreaView, View, StyleSheet, Alert } from "react-native";
import { Text, Icon } from "@rneui/themed";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResourceMedia } from "../redux/thunks/mediaThunk";
import { useFocusEffect } from "@react-navigation/native";
import ResourceMediaSection from "../components/ResourceMediaSection/ResourceMediaSection";

import VideoMediaItem from "../components/VideoMediaItem/VideoMediaItem";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import * as Linking from "expo-linking";

export default function ResourcesScreen() {
	const dispatch = useDispatch();
	const resourceMedia = useSelector((store) => store.media.resources);

	useFocusEffect(
		useCallback(() => {
			dispatch(getResourceMedia());
		}, [dispatch])
	);

	const [vids, setVids] = useState([]);
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		if (resourceMedia.length > 0) {
			const videos = resourceMedia.filter(
				(vid) => vid.is_displayed && vid.media_format === "video"
			);
			const pictures = resourceMedia.filter(
				(pic) => pic.is_displayed && pic.media_format === "photo"
			);
			setVids(videos);
			setPhotos(pictures);
		}
	}, [resourceMedia]);

	return (
		<ScreenWrapper
			background={{ backgroundColor: "#fff" }}
			noScroll={false}
		>
			<View style={styles.sectionView}>
				<View
				style={[styles.leftColAr]}
				>
				<Text style={styles.sectionText}>Educational Resources</Text>

					{vids.map((vid) => (
						<VideoMediaItem vid={vid} key={vid.id} />
					))}
				</View>
			</View>
		</ScreenWrapper>
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
		marginTop: 10,
		backgroundColor: "#fff",
	},
	vidSection: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 10,
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
		aspectRatio: 16 / 9, // Set the aspect ratio for landscape videos
		marginBottom: 10,
	},
	video: {
		flex: 1,
	},
	vidWrap: {
		width: "100%",
		marginTop: 10,
		backgroundColor: "#fff",
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#1269A9",
		marginBottom: 10,
	},
	subsectionText: {
		fontWeight: "700",
		fontSize: 20,
		color: "#1269A9",
		marginVertical: 5,
	},
	buttonText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#fff",
	},
});
