import {
	SafeAreaView,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	Platform,
} from "react-native";
import { Text, Button, Card, Input, Dialog } from "@rneui/themed";

import ScaleButton from "../ScaleButton/ScaleButton";

export default function BikeCheckoutDialogContent({
	howLong,
	handleWeekChange,
	handleCheckout,
	checkout,
}) {
	return (
		<>
			<View style={styles.cenColBe}>
				<Text style={[styles.mv10, styles.title]}>
					{`How long will you need ${checkout.nickname}?`}
				</Text>

				<View style={styles.grid}>
					<View style={[{ borderRadius: 12, overflow: "hidden" }]}>
						<ScaleButton>
							<Button
								type="outline"
								raised
								disabled={howLong <= 1}
								onPress={() => {
									handleWeekChange("LESS");
								}}
								icon={{
									title: "less",
									name: "minus",
									type: "material-community",
									size: 30,
									color: howLong <= 1 ? "grey" : "#1269A9",
								}}
								iconContainerStyle={{
									width: 35,
									// borderRadius: 12,
									overflow: "hidden",
								}}
								buttonStyle={[styles.button]}
								containerStyle={{
									borderRadius: 12,
								}}
							/>
						</ScaleButton>
					</View>

					<Text style={styles.title}>
						{howLong} {howLong === 1 ? "Week " : "Weeks"}
					</Text>
					<View style={{ borderRadius: 12, overflow: "hidden" }}>
						<ScaleButton>
							<Button
								raised
								type="outline"
								disabled={howLong >= 4}
								onPress={() => {
									handleWeekChange("MORE");
								}}
								icon={{
									name: "plus",
									type: "material-community",
									size: 30,
									color: howLong >= 4 ? "grey" : "#1269A9",
								}}
								iconContainerStyle={{
									width: 35,
									borderRadius: 12,
								}}
								buttonStyle={[styles.button]}
								containerStyle={{
									borderRadius: 12,
								}}
							/>
						</ScaleButton>
					</View>
				</View>
			</View>
			<View style={styles.cenColBe}>
				<ScaleButton>
					<Button
						raised
						onPress={handleCheckout}
						titleStyle={{ fontWeight: "700" }}
						buttonStyle={{
							backgroundColor: "#1269A9",
							borderRadius: 12,
							height: 55,
						}}
						containerStyle={{
							width: 200,
							borderRadius: 12,
						}}
					>
						{`Reserve ${checkout.nickname}`}
					</Button>
				</ScaleButton>
			</View>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "flex-start",
		justifyContent: "space-around",
		padding: 5,
		width: "100%",
		height: "40%",
	},
	dialogWrapper: {
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	singleBike: {
		flex: 0,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	flatList: {
		flex: 4,
		padding: 5,
		width: "100%",
		marginVertical: 10,
	},
	bikeCard: {
		flex: 1,
		paddingHorizontal: 2,
		alignItems: "center",
		marginVertical: 10,
		width: "100%",
	},
	bikeWrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 20,
		paddingHorizontal: 20,
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	lastGridItem: {
		width: "100%",
		padding: 1,
	},
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
	title: {
		fontSize: 18,
	},
	button: {
		borderRadius: 12,
		height: 45,
		padding: 2,
		fontWeight: "700",
		borderWidth: 1.5,
	},
});
