import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text, Icon, Input} from "@rneui/themed";
import { logoutUser } from "../redux/thunks/authThunk";
import { useDispatch } from "react-redux";
import { clearUserData } from "../redux/slices/userSlice";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import { useState } from "react";

export default function UserAccountScreen() {
	const dispatch = useDispatch();
	const [expanded, setExpanded] = useState(false);
	const clearUserThenLogout = () => {
		dispatch(clearUserData());
		dispatch(logoutUser());
	};

	const bugData = {
		title:'',
		summary:'',
		steps:'',
		expected:''
	}
	const [bugForm, setBugForm] = useState(bugData)

	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }}>
			<View style={styles.sectionView}>
				<View style={styles.contentSection}>
					<ScaleButton
						looks={[styles.solidButtonSection, { width: 350 }]}
						onPress={() => {
							console.log("Weeeeee");
						}}
					>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<Text style={styles.buttonSectionText}>
								Contact BikeMN
							</Text>
						</View>
					</ScaleButton>

					<ScaleButton
						looks={[
							styles.solidButtonSection,
							{ width: 350, justifyContent: "flex-start" },
						]}
						onPress={() => setExpanded(!expanded)}
					>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								width: "90%",
								marginHorizontal: 15,
							}}
						>
							<Text style={[styles.buttonSectionText]}>
								Report A Bug
							</Text>
							<Icon
								name={expanded ? "chevron-down" : "chevron-up"}
								type="material-community"
								size={25}
								// style={{ marginLeft: 50 }}
								color="#fff"
							/>
						</View>
					</ScaleButton>
					{expanded && (
						<View style={styles.leftColAr}>
							<Text style={styles.sectionText}>Instructions</Text>
							<View style={{ marginVertical: 10 }}>
								<Text>
									Please fill out the form before submitting
									the bug report
								</Text>
							</View>
							<View style={{ marginVertical: 10, width: "100%" }}>
								<Input
									label="Provide a brief and descriptive title for the bug"
									placeholder="Ex: App crashes when I press the... "
									value={bugForm.title}
									onChangeText={(text) =>
										setBugForm({
											...bugForm,
											title: text,
										})
									}
								/>
								{/* <Input
									label="Write a short summary of the bug. Include what you were trying to do and what went wrong."
									placeholder="Summary"
									multiline
									numberOfLines={5}
									value={bugForm.summary}
									onChangeText={(text) =>
										setBugForm({
											...bugForm,
											summary: text,
										})
									}
									inputStyle={{
										height: 125,
										width: "100%",
										borderWidth: 1,
										borderColor: "lightgrey",
										padding: 5,
									}}
								/> */}
								<Input
									label="List the exact steps needed to reproduce the bug. Be detailed and specific."
									placeholder="1. Pressed the... "
									multiline
									numberOfLines={5}
									value={bugForm.summary}
									onChangeText={(text) =>
										setBugForm({
											...bugForm,
											summary: text,
										})
									}
									inputStyle={{
										height: 125,
										width: "100%",
										borderWidth: 1,
										borderColor: "lightgrey",
										padding: 5,
									}}
								/>
								<Input
									label="What did you expect to happen?"
									placeholder="Pressing the button should have..."
									value={bugForm.expected}
									onChangeText={(text) =>
										setBugForm({
											...bugForm,
											expected: text,
										})
									}
									inputStyle={{
										padding: 5,
									}}
								/>
								<Input
									label="What actually happened?"
									placeholder="Pressing the button..."
									value={bugForm.expected}
									onChangeText={(text) =>
										setBugForm({
											...bugForm,
											expected: text,
										})
									}
									inputStyle={{
										padding: 5,
									}}
								/>
							</View>
						</View>
					)}
				</View>
				<View style={styles.contentSection}>
					<ScaleButton
						looks={[styles.solidButton, { width: 250 }]}
						onPress={clearUserThenLogout}
					>
						<Icon
							name="logout"
							type="material-community"
							size={25}
							style={{ marginRight: 5 }}
							// onPress={() => alert("This is a button!")}
							color="#fff"
						/>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "700",
								color: "#fff",
							}}
						>
							Log Out
						</Text>
					</ScaleButton>
				</View>
			</View>
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
		marginVertical: 10,
	},
	contentSection: {
		// flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginVertical: 10,
	},
	expandWrapper: {
		// flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginVertical: 10,
		borderWidth: 2,
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
		// width: "100%",
		// paddingHorizontal: 5,
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
	solidButton: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	solidButtonSection: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
		marginVertical: 10,
	},
	buttonSectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#fff",
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#1269A9",
	},
});
