import {
	SafeAreaView,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Keyboard,
	ScrollView,
	findNodeHandle,
	Alert,
} from "react-native";
import { Text, Icon, Input } from "@rneui/themed";
import { logoutUser } from "../redux/thunks/authThunk";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../redux/slices/userSlice";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import { useState, useRef } from "react";
import KeyboardAvoidingScrollView from "../components/KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";
import * as Linking from "expo-linking";
import { useHeaderHeight } from "@react-navigation/elements";

export default function UserAccountScreen() {
	const dispatch = useDispatch();
	const headerHeight = useHeaderHeight();
	const [expanded, setExpanded] = useState(false);

	const clearUserThenLogout = () => {
		dispatch(clearUserData());
		dispatch(logoutUser());
	};
	const user = useSelector((store) => {
		store.user;
	});

	const scrollView = useRef(null);
	const target = useRef(null);

	const bugData = {
		title: "",
		steps: "",
		expected: "",
		actual: "",
	};
	const [bugForm, setBugForm] = useState(bugData);

	const handleExpand = () => {
		setExpanded(!expanded);
		const scrollViewNode = findNodeHandle(scrollView.current);
		const targetNode = findNodeHandle(target.current);

		if (targetNode) {
			target.current.measureLayout(
				scrollViewNode,
				() => {
					scrollView.current.scrollTo({
						y: headerHeight,
						animated: true,
					});
				},
				(error) => {
					console.error(error);
				}
			);
		}
	};

	const sendBugReport = () => {
		const email = "dev@siroccolabs.com";
		const subject = `iBikeMN Bug: ${bugForm.title}`;
		const steps = `${bugForm.steps}`;
		const expected = `${bugForm.expected}`;
		const actual = `${bugForm.actual}`;
		const body = `
		${subject}\n\nSubmitted by:\n${user.first_name} ${user.first_name} | ${user.username} | ${user.user_id}\n\nSteps:\n${steps}\n\nExpected outcome:\n${expected}\n\nActual outcome:\n${actual}\n`;

		const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
		Linking.canOpenURL("mailto:")
			.then((supported) => {
				if (supported) {
					Linking.openURL(mailtoLink);
				}
			})
			.catch((error) => {
				Alert.alert(
					"No Default Email Client",
					"Please set up a default email client for your device or send the report directly to dev@siroccolabs.com.",
					[
						{
							text: "OK",
						},
					],
					{ cancelable: false }
				);
				console.error(
					"Error checking if email client is supported:",
					error
				);
			});
	};

	const sendContactEmail = () => {
		const email = "ibikemn@bikemn.org";
		const mailtoLink = `mailto:${email}`;
		Linking.canOpenURL("mailto:")
			.then((supported) => {
				if (supported) {
					Linking.openURL(mailtoLink);
				}
			})
			.catch((error) => {
				Alert.alert(
					"No Default Email Client",
					"Please set up a default email client for your device or send your email directly to ibikemn@bikemn.org.",
					[
						{
							text: "OK",
						},
					],
					{ cancelable: false }
				);
				console.error(
					"Error checking if email client is supported:",
					error
				);
			});
	};

	return (
		<KeyboardAvoidingScrollView scrollViewRef={scrollView}>
			<View style={styles.sectionView}>
				<View style={styles.sectionView}>
					<View style={styles.contentSection}>
						<ScaleButton
							looks={[styles.solidButtonSection, { width: 350 }]}
							onPress={sendContactEmail}
						>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text style={styles.buttonSectionText}>
									Contact BikeMN
								</Text>
								<Icon
									name="email"
									type="material-community"
									size={25}
									style={{ marginLeft: 10 }}
									color="#fff"
								/>
							</View>
						</ScaleButton>
						<ScaleButton
							looks={[
								styles.solidButtonSection,
								{ width: 350, justifyContent: "flex-start" },
							]}
							onPress={() => {
								handleExpand();
							}}
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
									name={
										expanded ? "chevron-down" : "chevron-up"
									}
									type="material-community"
									size={25}
									// style={{ marginLeft: 50 }}
									color="#fff"
								/>
							</View>
						</ScaleButton>
					</View>

					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.expandWrapper}>
							{expanded && (
								<View ref={target} style={styles.leftColAr}>
									<Text style={styles.sectionText}>
										Instructions
									</Text>
									<View
										style={{
											marginVertical: 5,
										}}
									>
										<Text
											style={{
												lineHeight: 20,
												paddingHorizontal: 5,
											}}
										>
											Please enter the necessary
											information in the fields below.
											When you press the submit button you
											will be redirected to your email
											client where you will need to send
											the report.
										</Text>
									</View>
									<View style={styles.leftColAr}>
										<View
											style={{
												width: "100%",
											}}
										>
											<Input
												label="Provide a brief and descriptive title for the issue"
												placeholder="App crashes when I press the... "
												value={bugForm.title}
												onChangeText={(text) =>
													setBugForm({
														...bugForm,
														title: text,
													})
												}
												labelStyle={styles.labelStyle}
											/>
										</View>

										<View
											style={{
												width: "100%",
											}}
										>
											<Input
												label="List the exact steps needed to reproduce the bug. Please, do your best to be detailed and specific."
												placeholder={`1. Navigated to the events screen \n2. Pressed on the...`}
												multiline
												numberOfLines={10}
												value={bugForm.steps}
												onChangeText={(text) =>
													setBugForm({
														...bugForm,
														steps: text,
													})
												}
												style={{
													height: 125,
													borderWidth: 1,
													borderColor: "grey",
													padding: 5,
													marginTop: 5,
												}}
												labelStyle={styles.labelStyle}
											/>
										</View>

										<View
											style={{
												width: "100%",
											}}
										>
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
												labelStyle={styles.labelStyle}
											/>
										</View>

										<View
											style={{
												width: "100%",
											}}
										>
											<Input
												label="What actually happened?"
												placeholder="Pressing the button..."
												value={bugForm.actual}
												onChangeText={(text) =>
													setBugForm({
														...bugForm,
														actual: text,
													})
												}
												inputStyle={{
													padding: 5,
												}}
												labelStyle={styles.labelStyle}
											/>
										</View>
										<View
											style={{
												marginVertical: 2,
												// width: "100%",
												alignSelf: "center",
											}}
										>
											<ScaleButton
												looks={[
													styles.solidButton,
													{ width: 150 },
												]}
												onPress={sendBugReport}
											>
												<Text
													style={{
														fontSize: 20,
														fontWeight: "700",
														color: "#fff",
													}}
												>
													Submit
												</Text>
												{/* <Icon
													name="send"
													type="material-community"
													size={25}
													style={{ marginLeft: 10 }}
													color="#fff"
												/> */}
											</ScaleButton>
										</View>
									</View>
								</View>
							)}
						</View>
					</TouchableWithoutFeedback>
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
		</KeyboardAvoidingScrollView>
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
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		// borderWidth: 2,
		// borderColor: "magenta",
	},
	expandWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: "50%",
		paddingHorizontal: 10,
		// borderWidth: 2,
		// borderColor: "lime",
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
	labelStyle: {
		color: "#000",
		lineHeight: 20,
	},
});
