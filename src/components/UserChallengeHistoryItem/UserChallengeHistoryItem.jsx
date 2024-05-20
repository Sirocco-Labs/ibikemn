import { Text, ListItem, Icon, Avatar, Divider } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const UserChallengeHistoryItem = ({ item }) => {
	console.log("**CHAL", item);

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
							color: item.has_been_met ? "#1269A9" : "#E4E5E4",
						}}
						containerStyle={{
							backgroundColor: item.has_been_met
								? "#F7B247"
								: "#7E837E",
							borderColor: item.has_been_met
								? "#1269A9"
								: "#474A48",
							borderWidth: 1.5,
							alignSelf: "flex-start",
						}}
					/>
				</View>

				<View style={styles.centerSection}>
					<Text>
						{item.activated_incentives_junction.incentive_id.title}
					</Text>
					<Text>
						{
							item.activated_incentives_junction.incentive_id
								.description
						}
					</Text>
				</View>
			</View>
			<View style={styles.cenColAr}>
				<View style={styles.sectionView}>
					<View style={styles.startSection}>
						<Text>
							{item.activated_incentives_junction.incentive_id
								.category.unit_of_measure === "rides"
								? `Rides Tracked`
								: `Miles Tracked`}
						</Text>
						<View style={styles.startSectionRow}>
							<Text style={{ marginRight: 10 }}>{`${
								Math.round(
									item.earned_points_toward_goal * 100
								) / 100
							}/${item.incentive_goal_value} ${
								item.activated_incentives_junction.incentive_id
									.category.unit_of_measure
							}`}</Text>
							{/* >{`${Math.round(item.earned_points_toward_goal)}/${item.incentive_goal_value} ${item.activated_incentives_junction.incentive_id.category.unit_of_measure}`}</Text> */}
							{/* <Text>{`${item.completion_progress * 100}%`}</Text> */}
						</View>
					</View>
					<View style={styles.centerSection}>
						<Text
						// style={{textAlign:'center'}}
						>
							Percentage earned
						</Text>
						<Text>{`${Math.round(
							item.completion_progress * 100
						)}%`}</Text>
					</View>
					<View style={styles.endSection}></View>
				</View>
			</View>
		</View>
	);
};

export default UserChallengeHistoryItem;

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
        flexDirection:'row',
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
		flex: 1,
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
        borderTopWidth:2,
        borderTopColor:'#1269A9',
        marginTop:8
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
