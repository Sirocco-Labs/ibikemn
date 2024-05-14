import { Text, ListItem, Icon, Avatar, Divider } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const AllChallengeHistoryItem = ({ item }) => {
	console.log("**PREV", item);

	return (
		<View style={styles.leftColAr}>
			<View style={styles.sectionView}>
				<View style={styles.avatar}>
					<Avatar
						rounded
						icon={{
							type: "material-community",
							name: "trophy-variant",
							size: 20,
							color: "#1269A9",
						}}
						containerStyle={{
							backgroundColor: "#F7B247",
							borderColor: "#1269A9",
							borderWidth: 1.5,
							alignSelf: "flex-start",
						}}
					/>
				</View>

				<View style={styles.centerSection}>
					<Text>{item.info.title}</Text>
					<Text>{item.info.description}</Text>
				</View>
			</View>
			<View style={styles.cenColAr}>
				<View style={styles.sectionView}>
					<View style={styles.startSection}>
						<Text>Goal</Text>
						<Text style={{ marginRight: 10 }}>
							{item.info.point_value <= 1
								? `${
										item.info.point_value
								  } ${item.info.category.unit_of_measure.slice(
										0,
										-1
								  )}`
								: `${item.info.point_value} ${item.info.category.unit_of_measure}`}
						</Text>
					</View>
					<View style={styles.centerSection}>
						<Text
						// style={{textAlign:'center'}}
						>
							Start Date
						</Text>
						<Text>
							{`${new Date(item.start_date).toLocaleDateString(
								"en-US",
								{
									// weekday: "short", // Abbreviated weekday (e.g., Thu)
									month: "short", // Abbreviated month (e.g., Apr)
									day: "numeric", // Day of the month (e.g., 26)
									year: "numeric", // Full year (e.g., 2024)
									timeZone: "America/Chicago", // CST timezone
								}
							)}`}
						</Text>
					</View>
					<View style={styles.endSection}>
						<Text
						// style={{textAlign:'center'}}
						>
							End Date
						</Text>
						<Text>
							{`${new Date(item.end_date).toLocaleDateString(
								"en-US",
								{
									// weekday: "short", // Abbreviated weekday (e.g., Thu)
									month: "short", // Abbreviated month (e.g., Apr)
									day: "numeric", // Day of the month (e.g., 26)
									year: "numeric", // Full year (e.g., 2024)
									timeZone: "America/Chicago", // CST timezone
								}
							)}`}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default AllChallengeHistoryItem;

const styles = StyleSheet.create({
	sectionView: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 0,
		width: "100%",
		marginTop: 5,
	},
	avatar: {
		flexShrink: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		alignSelf: "flex-start",
		width: "10%",
	},
	leftColAr: {
		flex: 1,
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginVertical: 10,
	},
	startSection: {
		flex: 0,
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginHorizontal: 10,
	},
	startSectionRow: {
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	centerSection: {
		flex: 2,
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginHorizontal: 10,
	},
	endSection: {
		flex: 2,
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginHorizontal: 10,
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
		borderTopWidth: 2,
		borderTopColor: "#1269A9",
		marginTop: 8,
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
	bigText: { fontSize: 50 },
	medText: { fontSize: 30 },
	regText: { fontSize: 14 },
	button: {
		display: "flex",
		alignItems: "center",
		border: "1px solid transparent",
		borderRadius: "8px",
		fontSize: 15,
		width: "75%",
		marginTop: "20px",
		marginBottom: "10px",
		padding: "10px",
	},

	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: "100%",
	},
});
