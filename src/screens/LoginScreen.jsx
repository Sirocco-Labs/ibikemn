import { Alert, StyleSheet, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"; // for development only
import ScaleButton from "../components/ScaleButton/ScaleButton";

import {
	setLoginError,
	setLoginSuccess,
	clearLoginFeedback,
} from "../redux/slices/feedbackSlice";

import { loginUser } from "../redux/thunks/authThunk";

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

	const close = () => {
		dispatch(clearLoginFeedback());
	};

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
					{/* AUTOFILL TEXT AND CLEAR ASYNC BUTTON ARE FOR DEVELOPMENT ONLY */}
					<Text
						style={styles.boldText}
						// onPress={() => {
						// 	setLoginData(testData);
						// }}
					>
						AUTOFILL
					</Text>
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
							leftIcon={{ type: "font-awesome", name: "lock" }}
							onChangeText={(text) =>
								setLoginData({ ...loginData, password: text })
							}
							value={loginData.password}
							secureTextEntry={true}
							placeholder="Password"
							autoCapitalize={"none"}
							errorStyle={styles.errorStyle}
							labelStyle={styles.labelStyle}
						/>
					</View>
					{/* {feedback.error &&
						Alert.alert(
							"Log in error",
							`${feedback.message}`,
							[{ text: "TRY AGAIN", onPress: close }],
							{ cancelable: false }
						)} */}
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<ScaleButton
							onPress={() => dispatch(loginUser(loginData))}
							looks={[styles.solidButton, { width: 'auto' }]}
						>
							<Text style={{ fontWeight: "700", color: "#fff", fontSize:20 }}>
								Sign In
							</Text>
						</ScaleButton>
						{/* <Button
							title="Log In"
							// disabled={feedback.error}
						/> */}
					</View>
					<View style={[styles.verticallySpaced, styles.mt20]}>
						<Button
							title="CLEAR ASYNC STORAGE"
							onPress={clearAsyncStorage}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	flexOne: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "space-around",
		// marginTop: 10,
		// marginBottom:40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
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
