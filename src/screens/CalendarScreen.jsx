import {
	SafeAreaView,
	View,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { Text, SpeedDial, Dialog, Button, FAB } from "@rneui/themed";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import {WebView} from 'react-native-webview'
import { useEffect, useState } from "react";

export default function CalendarScreen({ close, webRef, handleNavigation}) {
	console.log(handleNavigation);
	const [loading, setLoading] = useState({})

	useEffect(() => {
		setLoading()
	}, [webRef.current]);

	return (
		<>

		{loading ? <View
		style={styles.sectionView}
		>

			<ActivityIndicator animating={true} size={'large'} hidesWhenStopped />
		</View>
		:

			<WebView
				source={{
					uri: "https://www.bikemn.org/all-events/rides-events/",
				}}
				style={{ flex: 1 }}
				ref={webRef}
				onNavigationStateChange={handleNavigation}
			/>}
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
		backgroundColor:'#000'
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

