import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
	Platform,
	Keyboard,
	StyleSheet,
} from "react-native";

export default function KeyboardAvoidingWrapper({ formData, setFormData, setPage, page, handleInputChange,component: Component }) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.flexOne}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

					{/* <Component props={[page, setPage, formData, setFormData]}  /> */}
					<Component setPage={setPage} page={page} formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />

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
});
