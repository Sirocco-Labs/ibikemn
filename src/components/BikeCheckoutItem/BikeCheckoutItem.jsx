import { Text, ListItem, Icon, Avatar, Divider, View } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ScaleButton from "../ScaleButton/ScaleButton";

export default function BikeCheckoutItem({
	topBike,
	appUser,
	myBike,
	giveBack,
	// takeBike,
	checkoutAction,
	openAction,
	formatForHumans,
	supaReturnDate,
	todayISO,
    bikeUser
}) {
	const { id, bike, check_out_date, return_by, user, org_id, in_use } =
		topBike;

	const { bike_id, nickname } = bike;
    const { first_name, last_name, checked_out_by } = bikeUser;

	console.log(topBike);
	console.log(
		id,
		bike_id,
		return_by,
		nickname,
		// checked_out_by,
		org_id,
		in_use
	);
	user ? console.log(user) : console.log("Nouser!");

	const { checkout, setCheckout } = checkoutAction;

	const { open, setOpen } = openAction;

	const currentBike = {
		id,
		bike_id,
		return_by: supaReturnDate,
		checked_out_by: appUser.user_id,
		in_use: true,
		org_id,
		check_out_date: todayISO,
		nickname,
	};

	const takeBike = () => {
		console.log("CURRENT BIKE", currentBike);
		console.log("CHECKOUT IN ITEM", checkout);
		setCheckout(currentBike);
		setOpen(!open);
	};
	const [isMine, setIsMine] = useState(checked_out_by === appUser.user_id);

	// const isMine = checked_out_by === appUser.user_id

	console.log("myBike", myBike);

	const Item = ({
		id,
		bike_id,
		return_by,
		nickname,
		checked_out_by,
		org_id,
		in_use,
		user_first,
		user_last,
	}) => {
		const is_my_bike = checked_out_by === appUser.user_id;

		const currentBike = {
			id,
			bike_id,
			return_by: supaReturnDate,
			checked_out_by: appUser.user_id,
			in_use: true,
			org_id,
			check_out_date: todayISO,
			nickname,
		};

		const takeBike = () => {
			console.log("CURRENT BIKE", currentBike);
			setCheckout(currentBike);
			setOpen(!open);
		};

		if (in_use) {
			if (is_my_bike) {
				return <View></View>;
			} else {
				return (
					<></>
					// <Card
					// 	wrapperStyle={{
					// 		width: 260,
					// 		alignItems: "center",
					// 	}}
					// 	containerStyle={styles.bikeCard}
					// >
					// 	<Card.Title> {nickname}</Card.Title>
					// 	<Text>Available On: {formatForHumans(return_by)}</Text>
					// 	<Card.Divider />
					// 	<View>
					// 		<ScaleButton
					// 			looks={styles.solidButton}
					// 			offLooks={styles.button}
					// 			disabled={in_use}
					// 			onPress={() => {
					// 				giveBack(bike_id);
					// 			}}
					// 		>
					// 			<Text>
					// 				{in_use
					// 					? "Not Available"
					// 					: `Use ${nickname}`}
					// 			</Text>
					// 		</ScaleButton>
					// 	</View>
					// </Card>
				);
			}
		} else {
			return (
				<></>
				// <Card
				// 	wrapperStyle={styles.bikeWrapper}
				// 	containerStyle={styles.bikeCard}
				// >
				// 	<Card.Title>{nickname}</Card.Title>
				// 	<Text> Available </Text>
				// 	<Card.Divider />
				// 	<View>
				// 		<ScaleButton
				// 			looks={[styles.solidButton, { width: 250 }]}
				// 			onPress={takeBike}
				// 		>
				// 			<Text
				// 				style={{
				// 					fontWeight: "700",
				// 					color: "#fff",
				// 				}}
				// 			>{`Use ${nickname}`}</Text>
				// 		</ScaleButton>
				// 	</View>
				// </Card>
			);
		}
	};

	if (in_use) {
		if (checked_out_by === appUser.user_id) {
			return (
				<>
                <Text>weeee</Text>
					{/* <Text>Weeeee</Text>
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
								name: in_use ? "cancel" : `bike`,
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
							<ListItem.Title>{nickname}</ListItem.Title>
							<ListItem.Subtitle>{`Available on ${formatForHumans(
								return_by
							)}`}</ListItem.Subtitle>
						</ListItem.Content>
						<ScaleButton
							looks={styles.solidButton}
							offLooks={styles.solidButtonOff}
							disabled={in_use}
							onPress={() => {
								giveBack(bike_id);
							}}
						>
							<Text>{in_use ? "Not Available" : `Reserve`}</Text>
						</ScaleButton>
					</ListItem>
					<Divider
						width={2}
						color="#F7B247"
						style={{ width: "100%", marginBottom: 10 }}
						insetType="middle"
					/> */}
				</>
			);
		} else {
			return (
				<>
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
								name: in_use ? "cancel" : `check`,
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
							<ListItem.Title>{nickname}</ListItem.Title>
							<ListItem.Subtitle>{`Available on ${formatForHumans(
								return_by
							)}`}</ListItem.Subtitle>
						</ListItem.Content>

						{!in_use && (
							<ScaleButton
								looks={[styles.solidButton, { width: 120 }]}
								offLooks={[
									styles.solidButtonOff,
									{ width: 120 },
								]}
								disabled={in_use}
								onPress={() => {
									giveBack(bike_id);
								}}
							>
								<Text>
									{in_use ? "Not Available" : `Reserve`}
								</Text>
							</ScaleButton>
						)}
					</ListItem>
					<Divider
						width={2}
						color="#F7B247"
						style={{ width: "100%", marginBottom: 10 }}
						insetType="middle"
					/>
				</>
			);
		}
	} else {
		return (
			<>
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
							name: "check",
							size: 20,
							color: "#1269A9",
						}}
						containerStyle={{
							backgroundColor: "#F7B247",
							borderColor: "#1269A9",
							borderWidth: 1.5,
						}}
					/>
					<ListItem.Content
						style={{
							flex: 1,
							alignItems: "flex-start",
						}}
					>
						<ListItem.Title>{nickname}</ListItem.Title>
						<ListItem.Subtitle>Available</ListItem.Subtitle>
					</ListItem.Content>
					<ScaleButton
						looks={[styles.solidButton, { width: 150 }]}
						onPress={takeBike}
					>
						<Text
							style={{
								fontWeight: "700",
								color: "#fff",
							}}
						>
							Reserve
						</Text>
					</ScaleButton>
				</ListItem>
				<Divider
					width={2}
					color="#F7B247"
					style={{ width: "100%", marginBottom: 10 }}
					insetType="middle"
				/>
			</>
		);
	}
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
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
	outlineButtonOff: {
		borderWidth: 1.5,
		borderColor: "#C0C0C0",
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 40,
		padding: 2,
	},
});
