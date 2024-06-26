import {View, StyleSheet, Alert } from "react-native";
import { Text } from "@rneui/themed";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import { useSelector } from "react-redux";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import * as Linking from "expo-linking";

export default function PedalPalsScreen() {
	const user = useSelector((store) => store.user);

	const handleEmail = () => {
		const email = "example@gmail.com";
		const subject = "I'd like to join Pedal Pals";
		const body = `Hi! My name is ${user.first_name} ${user.last_name} and I'd like to join the Pedal Pals program.`;
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
					"Please set up a default email client for you device or send your information directly to ____@bikemn.org.",
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
				// Handle the error as needed
			});
	};

	return (
		<ScreenWrapper
			background={{ backgroundColor: "#fff" }}
			noScroll={false}
		>
			<View style={styles.sectionView}>
				<View style={styles.leftColAr}>
					<Text style={styles.sectionText}>What is Pedal Pals?</Text>
					<Text>
						Pedal Pals is one of BikeMN's newest initiatives! We
						strongly believe in the power of community and want to
						do our part to help grow the cycling community within
						the Twin Cities!
					</Text>
					<Text style={styles.subsectionText}>
						Become a Pedal Pal if you...
					</Text>
					<Text>Want to share your knowledge of bikes</Text>
					<Text>Need a biking companion</Text>
					<Text>...</Text>
					<ScaleButton
						looks={[
							styles.solidButton,
							{ width: 200, marginTop: 10, alignSelf: "center" },
						]}
						onPress={handleEmail}
					>
						<Text style={styles.buttonText}>Join Pedal Pals</Text>
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
		marginTop: 10,
		backgroundColor: "#fff",
	},
	vidSection: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 10,
		backgroundColor: "#fff",
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
		width: "100%",
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
	videoContainer: {
		// flex:1,
		width: "100%",
		aspectRatio: 16 / 9, // Set the aspect ratio for landscape videos
		marginBottom: 10,
	},
	video: {
		flex: 1,
	},
	vidWrap: {
		width: "100%",
		marginTop: 10,
		backgroundColor: "#fff",
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 55,
		padding: 2,
	},
	sectionText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#1269A9",
		marginBottom: 10,
	},
	subsectionText: {
		fontWeight: "700",
		fontSize: 20,
		color: "#1269A9",
		marginVertical: 5,
	},
	buttonText: {
		fontWeight: "700",
		fontSize: 25,
		color: "#fff",
	},
});

