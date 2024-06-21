import {
	Alert,
	StyleSheet,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";

import { Button, Input, Text, Icon } from "@rneui/themed";

import { emailSignUp } from "../redux/thunks/authThunk";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import ScaleButton from "../components/ScaleButton/ScaleButton";

function RegisterScreen() {
	const dispatch = useDispatch();
	// const feedback = useSelector((store) => store.feedback.registration);

	const [loading, setLoading] = useState(false);
	const verify = { main: false, check: false };
	const noError = {
		email: false,
		password: false,
		checkPassword: false,
	};
	const formData = {
		email: "",
		password: "",
		checkPassword: "",
	};
	// const testData = {
	// 	email: process.env.EXPO_PUBLIC_TEST_EMAIL,
	// 	password: process.env.EXPO_PUBLIC_TEST_PASSWORD,
	// };

	const [show, setShow] = useState(verify);
	const [error, setError] = useState(noError);
	const [regData, setRegData] = useState(formData);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.flexOne}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<View style={styles.verticallySpaced}>
						<Input
							label="Email"
							onChangeText={(text) => {
								setRegData({ ...regData, email: text });
							}}
							value={regData.email}
							placeholder="email@address.com"
							autoCapitalize={"none"}
							required={true}
							autoFocus={true}
							onBlur={() => {
								regData.email !== ""
									? setError({ ...error, email: false })
									: setError({ ...error, email: true });
							}}
							errorMessage={
								error.email && "This is a required field"
							}
							errorStyle={styles.errorStyle}
							labelStyle={styles.labelStyle}
						/>
						<View style={styles.verticallySpaced}>
							<Input
								label="Password"
								rightIcon={{
									type: "font-awesome",
									name: show.main ? "eye" : "eye-slash",
									onPress: () => {
										setShow({ ...show, main: !show.main });
									},
								}}
								onChangeText={(text) => {
									setRegData({ ...regData, password: text });
								}}
								value={regData.password}
								secureTextEntry={!show.main}
								placeholder="Password"
								autoCapitalize={"none"}
								onBlur={() => {
									regData.password !== regData.checkPassword
										? setError({ ...error, password: true })
										: setError({
												...error,
												password: false,
										  });
								}}
								errorMessage={
									error.password
										? "These passwords do not match"
										: ""
								}
								errorStyle={styles.errorStyle}
								labelStyle={styles.labelStyle}
							/>

							<Input
								label="Verify password"
								rightIcon={{
									type: "font-awesome",
									name: show.check ? "eye" : "eye-slash",
									onPress: () => {
										setShow({
											...show,
											check: !show.check,
										});
									},
								}}
								onChangeText={(text) => {
									setRegData({
										...regData,
										checkPassword: text,
									});
								}}
								onBlur={() => {
									regData.password !== regData.checkPassword
										? setError({ ...error, password: true })
										: setError({
												...error,
												password: false,
										  });
								}}
								value={regData.checkPassword}
								secureTextEntry={!show.check}
								placeholder="Password"
								autoCapitalize={"none"}
								errorMessage={
									error.password
										? "These passwords do not match"
										: ""
								}
								errorStyle={styles.errorStyle}
								labelStyle={styles.labelStyle}
							/>
						</View>
					</View>
					<View style={[styles.verticallySpaced]}>
						<ScaleButton
							onPress={() => {
								dispatch(emailSignUp(regData));
								setRegData(formData);
								setError(noError);
							}}
							looks={[styles.solidButton, { width: "auto" }]}
						>
							<Text
								style={{
									fontWeight: "700",
									color: "#fff",
									fontSize: 20,
								}}
							>
								Create Account
							</Text>
						</ScaleButton>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

export default RegisterScreen;

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
	flexRow: {
		display: "flex",
		alignItems: "flex-end",
		justifyContent: "center",
		alignSelf: "stretch",
	},
	verticallySpaced: {
		marginVertical: 20,
		paddingTop: 4,
		paddingBottom: 4,
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
	ml10: {
		marginLeft: 10,
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
		fontSize: 18,
		color:'#000'
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
