import {
	Alert,
	StyleSheet,
	View,
	ScrollView,
} from "react-native";

import { Button, Input, Text, Icon } from "react-native-elements";

import { emailSignUp } from "../redux/thunks/authThunk";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

function RegisterScreen() {
	const dispatch = useDispatch();
    const feedback = useSelector((store)=>store.feedback.registration)

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
	const testData = {
		email: process.env.EXPO_PUBLIC_TEST_EMAIL,
		password: process.env.EXPO_PUBLIC_TEST_PASSWORD,
	};

	const [show, setShow] = useState(verify);
	const [error, setError] = useState(noError);
	const [regData, setRegData] = useState(formData);


	return (
		<View style={styles.container}>
			<ScrollView>
				<Text
					onPress={() => {
						setRegData(testData);
					}}
				>
					Fill
				</Text>
				<View style={[styles.verticallySpaced]}>
					<Input
						style={styles.ml10}
						label="Email"
						leftIcon={{ type: "font-awesome", name: "envelope" }}
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
						errorMessage={error.email && "This is a required field"}
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						style={styles.ml10}
						label="Password"
						leftIcon={{ type: "font-awesome", name: "lock" }}
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
								: setError({ ...error, password: false });
						}}
						errorMessage={
							error.password ? "These passwords do not match" : ""
						}
					/>
				</View>
				<View style={styles.verticallySpaced}>
					<Input
						style={styles.ml10}
						label="Verify password"
						leftIcon={{ type: "font-awesome", name: "lock" }}
						rightIcon={{
							type: "font-awesome",
							name: show.check ? "eye" : "eye-slash",
							onPress: () => {
								setShow({ ...show, check: !show.check });
							},
						}}
						onChangeText={(text) => {
							setRegData({ ...regData, checkPassword: text });
						}}
						onBlur={() => {
							regData.password !== regData.checkPassword
								? setError({ ...error, password: true })
								: setError({ ...error, password: false });
						}}
						value={regData.checkPassword}
						secureTextEntry={!show.check}
						placeholder="Password"
						autoCapitalize={"none"}
						errorMessage={
							error.password ? "These passwords do not match" : ""
						}
					/>
				</View>

				<View style={styles.mb20}>
					<Button
						title="Register"
						disabled={feedback.error}
						onPress={() => {
							dispatch(emailSignUp(regData)),
								setRegData(formData);
							setError(noError);
						}}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
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
});
