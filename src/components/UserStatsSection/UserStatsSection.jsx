import { Text, ListItem, Icon, Avatar, Divider } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function UserStatsSection({ survey, travelStats }) {
	console.log(survey);

	return (
		<>
			<ListItem
				containerStyle={{
					width: "100%",
					padding: 5,
				}}
			>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "bike",
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
					<ListItem.Title>Total Rides</ListItem.Title>
					<ListItem.Subtitle>
						{travelStats.rides_total}
					</ListItem.Subtitle>
				</ListItem.Content>
				<Avatar
					rounded
					icon={{
						type: "material",
						name: "mode-of-travel",
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
					<ListItem.Title>Total Miles</ListItem.Title>
					<ListItem.Subtitle>
						{travelStats.miles_total
							? parseFloat(travelStats.miles_total?.toFixed(2))
							: 0}{" "}
						mi
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
			<Divider
				width={2}
				color="#F7B247"
				style={{ width: "100%", marginVertical: 10 }}
				insetType="middle"
			/>

			<ListItem
				containerStyle={{
					width: "100%",
					padding: 3,
				}}
			>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "bike",
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
					<ListItem.Title>Work Rides</ListItem.Title>
					<ListItem.Subtitle>
						{travelStats.commute_rides_total}
					</ListItem.Subtitle>
				</ListItem.Content>
				<Avatar
					rounded
					icon={{
						type: "material",
						name: "mode-of-travel",
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
					<ListItem.Title>Miles to Work</ListItem.Title>
					<ListItem.Subtitle>
						{travelStats.commute_miles_total
							? parseFloat(
									travelStats.commute_miles_total?.toFixed(2)
							  )
							: 0}{" "}
						mi
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
			<Divider
				width={2}
				color="#F7B247"
				style={{ width: "100%", marginVertical: 10 }}
				insetType="middle"
			/>

			<ListItem
				containerStyle={{
					width: "100%",
					padding: 3,
				}}
			>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "account",
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
					<ListItem.Title>Solo Rides</ListItem.Title>
					<ListItem.Subtitle>
						{survey.is_solo ? survey.is_solo.solo : null}
					</ListItem.Subtitle>
				</ListItem.Content>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "account-group",
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
					<ListItem.Title>Group Rides</ListItem.Title>
					<ListItem.Subtitle>
						{survey.is_solo ? survey.is_solo.group : null}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
			<Divider
				width={2}
				color="#F7B247"
				style={{ width: "100%", marginVertical: 10 }}
				insetType="middle"
			/>

			<ListItem
				containerStyle={{
					width: "100%",
					padding: 3,
				}}
			>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "map-marker",
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
					<ListItem.Title>Destination</ListItem.Title>
					<ListItem.Subtitle>
						{survey.destination_type
							? survey.destination_type.value
							: null}
					</ListItem.Subtitle>
				</ListItem.Content>
				<Avatar
					rounded
					icon={{
						type: "material-community",
						name: "road-variant",
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
					<ListItem.Title>Route</ListItem.Title>
					<ListItem.Subtitle>
						{survey.route_type ? survey.route_type.value : null}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
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
		alignItems: "flex-start",
		padding: 20,
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	expandSectionView: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
		// padding: 15,
		marginVertical: 10,
	},
	sectionViewCenter: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		width: "100%",
		// padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	cardSection: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "space-around",
		width: "100%",
		// padding: 5,
		// borderRadius: 16,
		marginVertical: 10,
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
		alignItems: "flex-start",
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
		alignItems: "flex-start",
		width: "100%",
	},
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
});
