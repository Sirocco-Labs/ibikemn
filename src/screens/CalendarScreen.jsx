import {
	SafeAreaView,
	View,
	StyleSheet,
	ActivityIndicator,
	BackHandler,
} from "react-native";
import { Text, SpeedDial, Dialog, Button, FAB, Icon } from "@rneui/themed";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import { WebView } from "react-native-webview";
import { useEffect, useState, useRef } from "react";
import ScaleButton from "../components/ScaleButton/ScaleButton";

export default function CalendarScreen({
	close,
	handleNavigation,
	webRef,
	goBackWeb,
	tracker,
}) {
	// const { index, routeNames } = navigation.getState();
	// const stackFocused = route.name === routeNames[index] ? true : false;
	// const webRef = useRef();
	console.log("!# TRACKER", tracker);

	return (
		<>
			<WebView
				source={{
					uri: "https://www.bikemn.org/all-events/rides-events/",
				}}
				style={{ flex: 1 }}
				ref={webRef}
				onNavigationStateChange={handleNavigation}
			/>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					paddingVertical: 10,
					marginHorizontal: 20,
					marginBottom: 15,
					// height: 80,
				}}
			>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						// marginHorizontal: 20,
					}}
				>
					<ScaleButton
						looks={[
							{ backgroundColor: "#1269A9" },
							{ width: "100%" },
						]}
						onPress={goBackWeb}
					>
						<Icon
							type="material-community"
							name="arrow-left-thin"
							size={40}
							color={"#F7B247"}
						/>
					</ScaleButton>
					<Text>Back</Text>
				</View>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ScaleButton
						looks={[
							{ backgroundColor: "#1269A9" },
							{ width: "100%" },
						]}
						onPress={close}
					>
						<Icon
							name="close-circle-outline"
							type="material-community"
							color="#F7B247"
							size={40}
						/>
					</ScaleButton>
					<Text>Close</Text>
				</View>

				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						// marginHorizontal: 20,
					}}
				>
					<ScaleButton
						looks={[
							{ backgroundColor: "#1269A9" },
							{ width: "100%" },
						]}
						onPress={() => {
							tracker.canGoForward && webRef.current.goForward();
						}}
						disabled={!tracker.canGoForward}
					>
						<Icon
							type="material-community"
							name="arrow-right-thin"
							size={40}
							color={tracker.canGoForward ? "#F7B247" : "grey"}
						/>
						<Text>Forward</Text>
					</ScaleButton>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	safe: {
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
		backgroundColor: "#F7B247",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "#000",
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
	leftRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	rightRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	cenRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
	mt10: {
		marginTop: 10,
	},
	mr10: {
		marginRight: 10,
	},
	titleText: {
		fontWeight: "bold",
		fontSize: 20,
	},
});
