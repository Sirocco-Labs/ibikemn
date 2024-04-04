import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button, Text, CheckBox } from "@rneui/themed";
import KeyboardAvoidingScrollView from "../KeyboardAvoidingScrollView/KeyboardAvoidingScrollView";

import MCIcons from "../MCIcons/MCIcons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {finishProfile} from '../../redux/thunks/userThunk'

export default function IntakeFormSubmit({ navigation, route }) {
	const dispatch = useDispatch();

	const intake = useSelector((store) => store.intake);
	const user = useSelector((store) => store.user);
	const { index, routeNames } = navigation.getState();
	const tabFocused = route.name === routeNames[index] ? true : false;

	const [loading, setLoading] = useState(false);

const inputData = {
	userInfo: { username: "", first_name: "", last_name: "", age: false },
	homeAddress: { city: "", state: "", zip: "" },
	workAddress: { city: "", state: "", zip: "" },
	screening: {
		how_did_you_hear: 0,
		commute_frequency: 0,
		bike_confidence: 0,
		staff_identity: null,
		org_identity: 0,
		admin_identity: null,
	},
	demographics: {
		age:0,
		gender_identity:''
	},
	consents: {
		follow_up:null,
		marketing:null,
		incentive:null,
		location_tracking:null,
		biometrics:null,
		notifications:null,
	},
}

	const editData = {
		username: false,
		first_name: false,
		last_name: false,
		home_city: false,
		home_state: false,
		home_zip: false,
		work_city: false,
		work_state: false,
		work_zip: false,
	};
	const [edit, setEdit] = useState(editData);

	const [formData, setFormData] = useState(inputData);

	useEffect(() => {
		setFormData(intake);
		if (
			tabFocused &&
			loading
		) {
			Alert.alert(
				"Success",
				"Welcome to iBikeMN! We hope you enjoy all this app has to offer."
			);
			setLoading(false);
		}
	}, [intake]);
	// setFormData({ ...formData, : text });

	const handleSubmit =  () =>{
		const profileData = { ...formData, id: user.id, user_id:user.user_id };
		console.log(profileData);
		dispatch(finishProfile(profileData))
		dispatch(clearIntakeSlice());
	}

	return (
		<KeyboardAvoidingScrollView>
			<View style={styles.flexOne}>
				<View style={styles.section}>
					<Text style={styles.fieldTitle}>User Info</Text>
					<View>
						<Input
							disabled={!edit.username}
							label="Username"
							placeholder=""
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={formData.userInfo.username}
						/>
					</View>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<Input
								disabled={!edit.first_name}
								label="First Name"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.userInfo.first_name}
							/>
						</View>

						<View style={styles.gridItem}>
							<Input
								disabled={!edit.last_name}
								label="Last Name"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.userInfo.last_name}
							/>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<Text style={styles.fieldTitle}>Home Address</Text>

					<View>
						<Input
							disabled={!edit.home_city}
							label="City"
							placeholder=""
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={formData.homeAddress.city}
						/>
					</View>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<Input
								disabled={!edit.home_state}
								label="State"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.homeAddress.state}
							/>
						</View>

						<View style={styles.gridItem}>
							<Input
								disabled={!edit.home_zip}
								label="Zip"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.homeAddress.zip}
							/>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<Text style={styles.fieldTitle}>Work Address</Text>

					<View>
						<Input
							disabled={!edit.work_city}
							label="City"
							placeholder=""
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={formData.workAddress.city}
						/>
					</View>
					<View style={styles.grid}>
						<View style={styles.gridItem}>
							<Input
								disabled={!edit.work_state}
								label="State"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.workAddress.state}
							/>
						</View>

						<View style={styles.gridItem}>
							<Input
								disabled={!edit.work_zip}
								label="Zip"
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
								value={formData.workAddress.zip}
							/>
						</View>
					</View>
				</View>

				<View style={[styles.grid, styles.mb15]}>
					<Button
						title={"Back"}
						icon={{ name: "arrow-left", color: "white" }}
						onPress={() => {
							navigation.jumpTo("Consents");
						}}
						buttonStyle={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-evenly",
							alignItems: "center",
							width: 110,
						}}
						titleStyle={{
							marginRight: 15,
						}}
					/>
					<Button
						title={"Submit"}
						icon={{ name: "send", color: "white" }}
						iconRight={true}
						onPress={() => {
							handleSubmit()
							// navigation.jumpTo("User");
						}}
						buttonStyle={{
							display: "flex",
							flexDirection: "row-reverse",
							justifyContent: "space-evenly",
							alignItems: "center",
							width: 110,
						}}
						titleStyle={{
							marginLeft: 15,
							marginRight: 5,
						}}
					/>
				</View>
			</View>
		</KeyboardAvoidingScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
		// width: "100%",
		backgroundColor: "#fff",
	},
	input: {
		fontSize: 12,
		marginVertical: -2,
	},
	label: {
		fontSize: 13,
		marginBottom: -5,
	},
	switchLine: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff3d6",
		padding: 10,
	},
	switchRight: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "auto",
		paddingHorizontal: 10,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:3
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	flexOne: {
		flex: 1,
		backgroundColor: "#fff",
	},
	nextBtn: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 100,
	},
	backBtn: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: 100,
	},
	ml10: {
		marginLeft: 10,
	},
	ml15: {
		marginLeft: 15,
	},
	mr15: {
		marginRight: 15,
	},
	mb15: {
		marginBottom: 15,
	},
	mt15: {
		marginTop: 15,
	},
	section: {
		paddingHorizontal: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	sectionTitle: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
	},
	fieldTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginBottom: 15,
	},
});
