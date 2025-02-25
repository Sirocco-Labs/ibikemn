import { Dialog, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScaleButton from "../ScaleButton/ScaleButton";
import { useNavigation } from "@react-navigation/native";

export default function CreateAccountPrompt({ params }) {
	const [open, setOpen] = useState(false);
    const navigation = useNavigation()

	return (
		<View style={styles.centered}>
			<View
				style={{
					padding: 10,
					width: "100%",
				}}
			>
				<View style={styles.sectionView}>
					<Text style={[styles.sectionText, { textAlign: "center" }]}>
						Welcome to iBikeMN!
					</Text>
					<Text style={[styles.mv10, { fontSize: 18 }]}>
						Thanks for joining us in our mission to reduce motor
						vehicle transit. We hope you are as passionate about it
						as we are.
					</Text>
					<Text style={[styles.mv10, { fontSize: 18 }]}>
						To track your stats and participate in challenges, please Sign In or Create an Account!
					</Text>
				</View>
				<ScaleButton
					onPress={() => {
						navigation.navigate('Auth')
					}}
					looks={[styles.solidButton, { width: 300, alignSelf:'center' }]}
				>
					<Text
						style={{
							fontWeight: "700",
							color: "#fff",
							fontSize: 20,
						}}
					>
						Sign In/Create Account
					</Text>
				</ScaleButton>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
		flex: 1,
	},
	wrapper: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		// padding: 5,
		marginBottom: 10,
	},
	dialogContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		marginVertical: 10,
	},
	completedContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		marginVertical: 5,
	},
	rewardSection: {
		// flex: 1,
		height: "auto",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
		// padding: 5,
	},
	expandSectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		// padding: 15,
		marginTop: 25,
		marginVertical: 15,
	},
	sectionViewCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		// padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	cardSection: {
		flex: 1,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-around",
		width: "100%",
		padding: 5,
		// borderRadius: 16,
		marginBottom: 1,
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
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 30,
		color: "#1269A9",
		marginBottom:15
	},
	rewardTitle: {
		fontWeight: "700",
		fontSize: 18,
		color: "#1269A9",
		marginBottom: 15,
	},
	rewardText: {
		fontWeight: "700",
		// fontSize: 16,
		color: "#1269A9",
		marginBottom: 5,
		// textAlign:'center'
	},
	rewardFooter: {
		// fontWeight: "700",
		fontSize: 12,
		color: "#1269A9",
		marginBottom: 5,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
		marginVertical: 5,
	},
	buttonCol: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
});
