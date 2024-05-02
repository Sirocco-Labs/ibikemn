import { useState } from "react";
import { View, StyleSheet, Dialog, FlatList } from "react-native";
import { Text, Input } from "@rneui/themed";
import ScaleButton from "../ScaleButton/ScaleButton";
import { useDispatch } from "react-redux";
import { addBikeNote } from "../../redux/thunks/private/staffBikeThunk";


export default function AddBikeNote({ notes, bike_id, user_id }) {
    const dispatch = useDispatch()
	const [bikeNotes, setBikeNotes] = useState("");


	const saveNotes = () => {
		let noteArr = notes ? [...notes, bikeNotes] : [bikeNotes];
		const payload = {
			id: bike_id,
			note: noteArr,
            user_id:user_id
		};
		dispatch(addBikeNote(payload));
        setBikeNotes('')
	};

	return (
		<View style={{ width: "100%", marginVertical:10, justifyContent:'center', alignItems:'center'}}>
			<Input
				placeholder="New note"
                value={bikeNotes}
				onChangeText={(text) => {
					setBikeNotes(text);
				}}
			/>
			<ScaleButton
				onPress={saveNotes}
				looks={[styles.solidButton, { width: 200 }]}
                offLooks={[styles.solidButtonOff, {width:200}]}
                disabled={bikeNotes===''}
			>
				<Text
                style={{fontWeight:'700', color:'#fff'}}
                >Add Note</Text>
			</ScaleButton>
		</View>
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
		borderWidth: 1.5,
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
