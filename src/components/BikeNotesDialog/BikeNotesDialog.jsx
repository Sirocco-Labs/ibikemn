import {
	Text,
	Card,
	Input,
	Dialog,
	ListItem,
	Avatar,
	Divider,
} from "@rneui/themed";
import {
	View,
	StyleSheet,
	FlatList,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import ScaleButton from "../ScaleButton/ScaleButton";

import AddBikeNote from "../AddBikeNote/AddBikeNote";
import { useState } from "react";

export default function BikeNotesDialog({ myBike }) {
	const [open, setOpen] = useState(false);

	const Item = ({ item }) => {
		return (
			<Text
				style={{ fontSize: 14, marginBottom: 5 }}
			>{`\u2022 ${item}`}</Text>
		);
	};
	return (
		<>
			<View
				style={{
					flex: 1,
					justifyContent: "flex-start",
					alignItems: "center",
					width: "100%",
				}}
			>
				<ScaleButton
                looks={[styles.outlineButton, {width:300}]}
					onPress={() => {
						setOpen(!open);
					}}
				>
					<Text
                    style={{fontWeight:'700', fontSize:18, color:'#1269A9'}}
                    >Notes</Text>
				</ScaleButton>
			</View>
			<Dialog
				isVisible={open}
				onBackdropPress={() => {
					setOpen(false);
				}}
				overlayStyle={styles.container}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : null}
					style={{
						flexGrow: 2,
						justifyContent: "space-around",
						alignItems: "center",
                        width:'100%'
					}}
				>
					<View
						style={{
							width: "100%",
							height: "50%",
						}}
					>
						<Text
							style={{
								fontSize: 22,
								fontWeight: "700",
								marginBottom: 2,
							}}
						>
							{`Notes for ${myBike.bike_info.nickname}`}
						</Text>
						{myBike.bike_info.notes ? (
							<>
								<FlatList
									data={myBike.bike_info.notes}
									renderItem={Item}
									keyExtractor={(item, i) => i}
									style={{
										width: "100%",
										borderWidth: 2,
										borderColor: "#1269A9",
									}}
									contentContainerStyle={{
										width: "100%",
										padding: 10,
									}}
								/>
							</>
						) : (
							<View
								style={{
									width: "100%",
									height: "40%",
									borderWidth: 2,
									borderColor: "#1269A9",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text>No notes yet!</Text>
							</View>
						)}
					</View>

					<AddBikeNote
						notes={myBike.bike_info.notes}
						bike_id={myBike.bike_id}
						user_id={myBike.checked_out_by}
					/>
				</KeyboardAvoidingView>
			</Dialog>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 0,
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "flex-start",
		justifyContent: "center",
		padding: 15,
		width: "95%",
        height:'60%',
        marginBottom:20,
	},
	dialogWrapper: {
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	checkoutSection: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "space-between",
		width: "100%",
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "#fff",
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
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	outlineButton: {
		borderWidth: 2,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	outlineButtonOff: {
		borderWidth: 1.5,
		borderColor: "#C0C0C0",
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
});
