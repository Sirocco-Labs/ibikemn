import { View, Image, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";
import { Video } from "expo-av";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoMediaItem from "../VideoMediaItem/VideoMediaItem";
import PhotoMediaItem from "../PhotoMediaItem/PhotoMediaItem";

export default function ResourceMediaSection({ photos, vids }) {
	console.log("$*PHOTOS", photos);
	console.log("$*VIDS", vids);

	return (
		<>
			{vids.map((vid) => (
				<VideoMediaItem key={vid.id} vid={vid} />
			))}
            
			{photos.map((photo) => (
				<PhotoMediaItem key={photo.id} photo={photo} />
			))}
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
		alignItems: "flex-start",
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
});
