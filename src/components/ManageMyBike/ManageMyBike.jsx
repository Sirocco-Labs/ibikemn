import {
	View,
	StyleSheet,
} from "react-native";
import {
	Text,
	ListItem,
	Avatar,
	Divider,
} from "@rneui/themed";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import {
    getMyBike,
	returnBike,
} from "../../redux/thunks/private/staffBikeThunk";


import ScaleButton from '../ScaleButton/ScaleButton';
import BikeNotesDialog from "../BikeNotesDialog/BikeNotesDialog";

export default function ManageMyBike({myBike}) {

    const dispatch = useDispatch()
    const formatForHumans = (iso) => {
		const date = new Date(iso);
		const formattedTime = date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
		return formattedTime;
	};
    const giveBack = () => {
		dispatch(returnBike(myBike));
	};

    useEffect(()=>{
        dispatch(getMyBike(myBike.checked_out_by))
    }, [dispatch])

	return (
		<>
			<View style={styles.singleBike}>
				<ListItem
					containerStyle={{
						width: "100%",
						padding: 2,
					}}
				>
					<Avatar
						rounded
						icon={{
							type: "material-community",
							name: "bike-fast",
							size: 20,
							color: "#1269A9",
						}}
						containerStyle={{
							backgroundColor: "#F7B247",
							borderColor: "#1269A9",
							borderWidth: 1.5,
						}}
					/>
					<ListItem.Content style={{ alignItems: "flex-start" }}>
						<ListItem.Title>{`${myBike.bike_info.nickname}`}</ListItem.Title>
						<ListItem.Subtitle>
							{`Return by ${formatForHumans(myBike.return_by)}`}
						</ListItem.Subtitle>
					</ListItem.Content>

					<ScaleButton
						looks={[styles.solidButton, { width: 120 }]}
						onPress={giveBack}
					>
						<Text
							style={{
								fontWeight: "700",
								color: "#fff",
							}}
						>
							{`Return`}
						</Text>
					</ScaleButton>
				</ListItem>
				<Divider
					width={2}
					color="#F7B247"
					style={{ width: "100%", marginTop: 10 }}
					insetType="middle"
				/>
			</View>

            <BikeNotesDialog myBike={myBike}/>

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

