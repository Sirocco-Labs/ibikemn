import "react-native-gesture-handler";

import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button, Text, CheckBox } from "@rneui/themed";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";

import MCIcons from "../MCIcons/MCIcons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/thunks/userThunk";



const PersonalInfo = ({
	page,
	setPage,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { userInfo } = formData;
	console.log(userInfo);
	return (
		<View style={styles.container}>
			<View>
				{/*username*/}
				<View>
					<Input
						label="Username"
						placeholder="Choose a username"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={userInfo.username}
						onChangeText={(text) =>
							handleInputChange("userInfo.username", text)
						}
					/>
				</View>

				<View style={styles.grid}>
					<View style={styles.gridItem}>
						<Input
							label="First Name"
							placeholder="Enter your first name"
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={userInfo.first_name}
							onChangeText={(text) =>
								handleInputChange("userInfo.first_name", text)
							}
						/>
					</View>
					<View style={styles.gridItem}>
						<Input
							label="Last Name"
							placeholder="Enter your last name"
							inputStyle={styles.input}
							labelStyle={styles.label}
							value={userInfo.last_name}
							onChangeText={(text) =>
								handleInputChange("userInfo.last_name", text)
							}
						/>
					</View>
				</View>
				{/* age check */}
				<View style={{ alignItems: "center" }}>
					<View>
						<CheckBox
							checked={userInfo.age}
							onPress={() =>
								handleInputChange("userInfo.age", !userInfo.age)
							}
							iconRight
							title="I am at least 15 years old"
							containerStyle={{ backgroundColor: "transparent" }}
						/>
					</View>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
			/>
		</View>
	);
};

const Addresses = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { homeAddress, workAddress } = formData;
	return (
		<View style={styles.container}>
			<Text>Home Address</Text>
			<View style={styles.grid}>
				<View style={styles.gridItem}>
					<Input
						label="City"
						placeholder="What city do you live in?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={homeAddress.city}
						onChangeText={(text) =>
							handleInputChange("homeAddress.city", text)
						}
					/>
				</View>
				{/* state */}
				<View style={styles.gridItem}>
					<Input
						label="State"
						placeholder=" Which state do you live in?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={homeAddress.state}
						onChangeText={(text) =>
							handleInputChange("homeAddress.state", text)
						}
					/>
				</View>
				{/* zip */}
				<View style={styles.gridItem}>
					<Input
						label="Zip Code"
						placeholder="What's your Zip Code?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={homeAddress.zip}
						onChangeText={(text) =>
							handleInputChange("homeAddress.zip", text)
						}
					/>
				</View>
			</View>
			{/* work_address */}
			<View>
				<Text>Work Address</Text>
			</View>
			<View style={styles.grid}>
				<View style={styles.gridItem}>
					<Input
						label="City"
						placeholder="What city do you work in?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={workAddress.city}
						onChangeText={(text) =>
							handleInputChange("workAddress.city", text)
						}
					/>
				</View>
				{/* state */}
				<View style={styles.gridItem}>
					<Input
						label="State"
						placeholder=" Which state do you work in?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={workAddress.state}
						onChangeText={(text) =>
							handleInputChange("workAddress.state", text)
						}
					/>
				</View>
				{/* zip */}
				<View style={styles.gridItem}>
					<Input
						label="Zip Code"
						placeholder="What's your Zip Code where you work?"
						inputStyle={styles.input}
						labelStyle={styles.label}
						value={workAddress.zip}
						onChangeText={(text) =>
							handleInputChange("workAddress.zip", text)
						}
					/>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

const Screening = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { screening } = formData;
	return (
		<View style={styles.container}>
			{/* home_address */}
			<View>
				{/* city */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* state */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* zip */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

const Demographics = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { demographic } = formData;
	return (
		<View style={styles.container}>
			<View style={styles.grid}>
				<View style={styles.gridItem}>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

const Consent = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { consent } = formData;
	return (
		<View style={styles.container}>
			{/* home_address */}
			<View>
				{/* city */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* state */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* zip */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

const Incentive = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { incentive } = formData;
	return (
		<View style={styles.container}>
			<View>
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* state */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
				{/* zip */}
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
			</View>
			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

const Outreach = ({
	setPage,
	page,
	formData,
	setFormData,
	handleInputChange,
}) => {
	const { outreach } = formData;
	return (
		<View style={styles.container}>
			<View>
				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>

				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>

				<View>
					<Input
						label=""
						placeholder=""
						inputStyle={styles.input}
						labelStyle={styles.label}
					/>
				</View>
			</View>

			<Button
				title={"Next"}
				onPress={() => {
					setPage((page) => (page += 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
			<Button
				title={"Back"}
				onPress={() => {
					setPage((page) => (page -= 1));
				}}
				buttonStyle={{ marginVertical: 40 }}
			/>
		</View>
	);
};

export const ProfileForm = () => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.container}>
					{/* IDENTIFYING DETAILS */}
					<View>
						{/*username*/}
						<View>
							<Input
								label="Username"
								placeholder="Choose a username"
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>

						<View style={styles.grid}>
							{/* first_name */}
							<View style={styles.gridItem}>
								<Input
									label="First Name"
									placeholder="Enter your first name"
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							<View style={styles.gridItem}>
								{/* last_name */}
								<Input
									label="Last Name"
									placeholder="Enter your last name"
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
						</View>
						{/* age check */}
						<View>
							<Input
								label="Age"
								placeholder="Are you older than 15?"
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
					</View>

					{/* ADDRESSES */}
					<View>
						{/* home_address */}
						<View>
							{/* city */}
							<View>
								<Input
									label="City"
									placeholder="What city do you live in?"
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* state */}
							<View>
								<Input
									label="State"
									placeholder=" Which state do you live in?"
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* zip */}
							<View>
								<Input
									label="Zip Code"
									placeholder="What's your Zip Code?"
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
						</View>
						{/* work_address */}
						<View>
							{/* address */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* street */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* city */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* state */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
							{/* zip */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
						</View>
					</View>

					{/* INITIAL SCREENING */}
					<View>
						{/* How did you hear about us*/}
						<View>
							<Input
								label=""
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
						{/* How often do you commute to work by bike each week */}
						<View>
							<Input
								label=""
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
						{/* Self identify confidence with biking */}
						<View>
							<Input
								label=""
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
						{/* Are you en employee of BikeMN? */}
						<View>
							<Input
								label=""
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
						{/* Are you en employee of a partner Org? */}
						<View>
							<Input
								label=""
								placeholder=""
								inputStyle={styles.input}
								labelStyle={styles.label}
							/>
						</View>
					</View>

					{/* CONSENTS */}
					<View>
						{/* Permissions */}
						<View>
							{/* Biometrics  */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>

							{/* Notifications  */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>
						</View>

						{/* Demographics */}
						<View>
							<View>
								{/* consent_to_demographics */}
								<View>
									<Input
										label=""
										placeholder=""
										inputStyle={styles.input}
										labelStyle={styles.label}
									/>
								</View>

								{/* demographics consented */}
								<View>
									{/* ethnicity */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>
									{/* gender identities */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>
									{/*  */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>
								</View>
							</View>
						</View>

						{/* Incentive program */}
						<View>
							{/* consent_to_incentives */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>

							{/* incentives_consented */}
							<View>
								{/* Permission */}
								<View>
									{/* Location  */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>
								</View>
							</View>
						</View>

						{/* External Marketing & Surveys */}
						<View>
							{/* consent_to_surveys_and_marketing */}
							<View>
								<Input
									label=""
									placeholder=""
									inputStyle={styles.input}
									labelStyle={styles.label}
								/>
							</View>

							{/* survey_and_marketing_consented */}
							<View>
								{/* Contact info */}
								<View>
									{/* phone_number */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>

									{/* alternate_email */}
									<View>
										<Input
											label=""
											placeholder=""
											inputStyle={styles.input}
											labelStyle={styles.label}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
			{/* SUBMIT */}
			<View>
				<Button title={"Submit"} buttonStyle={{ marginVertical: 5 }} />
			</View>
		</View>
	);
};

export const UserInfoForm = () => {
	const [page, setPage] = useState(0);
	const inputData = {
		userInfo: {
			username: "",
			first_name: "",
			last_name: "",
			age: false,
		},
		homeAddress: {
			city: "",
			state: "",
			zip: "",
		},
		workAddress: { city: "", state: "", zip: "" },
		screening: {
			how_did_you_hear: "",
			commute_frequency: "",
			bike_confidence: "",
			staff_identity: "",
			admin_identity: "",
		},
		demographic: {},
		consent: {},
		incentive: {},
		outreach: {},
	};

	const [formData, setFormData] = useState(inputData);

	const handleInputChange = (path, value) => {
		setFormData((prevState) => {
			let pathParts = path.split(".");
			let lastPart = pathParts.pop();
			let pathToUpdate;
			let updatedPart;
			let current = { ...prevState };

			pathParts.forEach((part) => {
				current = current[part];
			});

			// Create a copy of the object up to the last part of the path
			updatedPart = { ...current };

			// Update the last part of the path with the new value
			updatedPart[lastPart] = value;

			// Reconstruct the path from the parts, excluding the last part
			pathToUpdate = pathParts.join(".");

			// Update the state with the new object structure
			return { ...prevState, [pathToUpdate]: updatedPart };
		});
	};

	switch (page) {
		case 0:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={PersonalInfo}
				/>
			);
		case 1:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Addresses}
				/>
			);
		case 2:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Screening}
				/>
			);
		case 3:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Demographics}
				/>
			);
		case 4:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Consent}
				/>
			);
		case 5:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Incentive}
				/>
			);
		case 6:
			return (
				<KeyboardAvoidingWrapper
					page={page}
					setPage={setPage}
					formData={formData}
					setFormData={setFormData}
					handleInputChange={handleInputChange}
					component={Outreach}
				/>
			);
		case 7:
			return (
				<View>
					<Text> LOADING... </Text>
					<Button
						title={"Back"}
						onPress={() => {
							setPage((page) => (page -= 1));
						}}
						buttonStyle={{ marginVertical: 40 }}
					/>
				</View>
			);
	}
};

const styles = StyleSheet.create({
	// container: {
	// 	height: "100%",
	// 	width: "100%",
	// 	display: "flex",
	// 	flexDirection: "column",
	// 	backgroundColor: "#fff",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	padding: 20,
	// },
	container: {
		flex: 1,
		justifyContent: "space-around",
		// marginTop: 10,
		// marginBottom:40,
		padding: 15,
		// width: "100%",
		marginTop: 5,
	},
	mainView: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		padding: "15px",
	},
	flexCol: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 5,
		width: "100%",
	},
	flexRow: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	flexItem: {
		width: "auto",
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
		fontSize: 12,
		marginVertical: -2,
	},
	label: {
		fontSize: 13,
		marginBottom: -5,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		width: "100%",
		// borderColor:'lime',
		// borderWidth:3
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
});
