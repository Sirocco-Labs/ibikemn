import {
	Alert,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"; // for development only
import ScaleButton from "../components/ScaleButton/ScaleButton";

import { clearFeedback } from "../redux/slices/feedbackSlice";

import { loginUser } from "../redux/thunks/authThunk";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
	const dispatch = useDispatch();
	const loginFormData = {
		email: "",
		password: "",
	};
	// const testData = {
	// 	email: process.env.EXPO_PUBLIC_TEST_EMAIL,
	// 	password: process.env.EXPO_PUBLIC_TEST_PASSWORD,
	// };
	const [loginData, setLoginData] = useState(loginFormData);
	const feedback = useSelector((store) => store.feedback);

	const showLoginError = (message) => {
		Toast.show({
			type: "error",
			text1: `${message}`,
			text2: "Please try again",
			text2Style: { fontSize: 11, color: "#000" },
			onHide: () => {
				dispatch(clearFeedback({ sliceName: "login", type: "error" }));

				setLoginData(loginFormData);
			},
		});
	};

	useEffect(() => {
		if (feedback.login.error.value) {
			showLoginError(feedback.login.error.message);
		}
	}, [feedback.login]);

	const clearAsyncStorage = async () => {
		try {
			await AsyncStorage.clear();
			console.log("AsyncStorage cleared successfully");
		} catch (error) {
			console.error("Error clearing AsyncStorage:", error);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.flexOne}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<View style={styles.inputContainer}>
						<View style={[styles.verticallySpaced]}>
							<Input
								autoFocus={true}
								label="Email"
								leftIcon={{
									type: "font-awesome",
									name: "envelope",
								}}
								onChangeText={(text) =>
									setLoginData({ ...loginData, email: text })
								}
								value={loginData.email}
								placeholder="email@address.com"
								autoCapitalize={"none"}
								errorStyle={styles.errorStyle}
								labelStyle={styles.labelStyle}
							/>
						</View>
						<View style={styles.verticallySpaced}>
							<Input
								label="Password"
								leftIcon={{
									type: "font-awesome",
									name: "lock",
								}}
								onChangeText={(text) =>
									setLoginData({
										...loginData,
										password: text,
									})
								}
								value={loginData.password}
								secureTextEntry={true}
								placeholder="Password"
								autoCapitalize={"none"}
								errorStyle={styles.errorStyle}
								labelStyle={styles.labelStyle}
							/>
						</View>
					</View>

					<View style={[styles.verticallySpaced, styles.mb20]}>
						<ScaleButton
							onPress={() => dispatch(loginUser(loginData))}
							looks={[styles.solidButton, { width: "auto" }]}
						>
							<Text
								style={{
									fontWeight: "700",
									color: "#fff",
									fontSize: 20,
								}}
							>
								Sign In
							</Text>
						</ScaleButton>
					</View>
					{/* <View style={[styles.verticallySpaced, styles.mt20]}>
								<Button
									title="CLEAR ASYNC STORAGE"
									onPress={clearAsyncStorage}
								/>
							</View> */}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	flexOne: {
		flex: 1,
	},
	inputContainer: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	verticallySpaced: {
		flex: 1,
		paddingTop: 4,
		paddingBottom: 4,
		justifyContent: "center",
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	mb20: {
		marginBottom: 20,
	},
	mt40: {
		marginTop: 40,
	},
	centered: {
		display: "flex",
		alignItems: "center",
	},
	boldText: {
		fontWeight: "bold",
		fontSize: 20,
	},
	mt0: {
		marginTop: 0,
	},
	mb0: {
		marginTop: 0,
	},
	mv0: {
		marginVertical: 0,
	},
	labelStyle: {
		fontSize: 14,
		marginVertical: -10,
	},
	errorStyle: {
		fontSize: 12,
		// marginVertical:3,
		marginTop: 1,
		marginBottom: 13,
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
