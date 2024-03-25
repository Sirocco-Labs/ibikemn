import { Alert, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"; // for development only
import {
	setLoginError,
	setLoginSuccess,
	clearLoginFeedback,
} from "../redux/slices/feedbackSlice";
import { fetchDiscoveryAsync } from "expo-auth-session";

export default function LoginScreen() {
	const dispatch = useDispatch();
	const feedback = useSelector((store) => store.feedback.login);
	const loginData = {
		email: "",
		password: "",
	};
	const testData = {
		email: process.env.EXPO_PUBLIC_TEST_EMAIL,
		password: process.env.EXPO_PUBLIC_TEST_PASSWORD,
	};
	const [loginForm, setLoginForm] = useState[loginData];

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
		<View style={styles.container}>
			{/* AUTOFILL TEXT AND CLEAR ASYNC BUTTON ARE FOR DEVELOPMENT ONLY */}
			<Text
				style={styles.boldText}
				onPress={() => {
					setLoginForm(testData);
				}}
			>
				AUTOFILL
			</Text>
			<View style={[styles.verticallySpaced]}>
				<Input
					label="Email"
					leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) =>
						setLoginForm({ ...loginForm, email: text })
					}
					value={loginForm.email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) =>
						setLoginForm({ ...loginForm, password: text })
					}
					value={loginForm.password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View>
			{feedback.error &&
				Alert.alert(
					"Log in error",
					`${feedback.message}`,
					[{ text: "TRY AGAIN", onPress: close }],
					{ cancelable: false }
				)}
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="Log In"
					disabled={feedback.error}
					onPress={() => dispatch(loginUser({ email, password }))}
				/>
			</View>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title="CLEAR ASYNC STORAGE"
					onPress={clearAsyncStorage}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		marginTop: 40,
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
});
