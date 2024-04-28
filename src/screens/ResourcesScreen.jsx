import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";

export default function ResourcesScreen() {
	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.sectionView}>
				<View style={styles.leftColAr}>
					<Text>Become a Pedal Pal</Text>
				</View>
			</View>
			<View style={styles.sectionView}>
				<View style={styles.leftColAr}>
					<Text>Bike vids</Text>
				</View>
			</View>
			<View style={styles.sectionView}></View>
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
		padding: 15,
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
});

