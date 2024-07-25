import {
	View,
	StyleSheet,
	Alert,
	useWindowDimensions,
	ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { Text } from "@rneui/themed";

import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";
import { useSelector } from "react-redux";
import ScaleButton from "../components/ScaleButton/ScaleButton";
import * as Linking from "expo-linking";
import { useState, useEffect, useRef } from "react";

export default function PedalPalsScreen() {
	const user = useSelector((store) => store.user);

	const volRef = useRef(null);
	const reqRef = useRef(null);
	const { width } = useWindowDimensions();

	const expander = {
		vol: false,
		req: false,
	};
	const [expanded, setExpanded] = useState(expander);

	const [loader, setLoader] = useState(true);

	// const handleEmail = () => {
	// 	const email = "example@gmail.com";
	// 	const subject = "I'd like to join Pedal Pals";
	// 	const body = `Hi! My name is ${user.first_name} ${user.last_name} and I'd like to join the Pedal Pals program.`;
	// 	const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
	// 	Linking.canOpenURL("mailto:")
	// 		.then((supported) => {
	// 			if (supported) {
	// 				Linking.openURL(mailtoLink);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			Alert.alert(
	// 				"No Default Email Client",
	// 				"Please set up a default email client for you device or send your information directly to ____@bikemn.org.",
	// 				[
	// 					{
	// 						text: "OK",
	// 					},
	// 				],
	// 				{ cancelable: false }
	// 			);
	// 			console.error(
	// 				"Error checking if email client is supported:",
	// 				error
	// 			);
	// 			// Handle the error as needed
	// 		});
	// };

	return (
		<ScreenWrapper background={{ backgroundColor: "#fff" }} noScroll={true}>
			<View style={styles.sectionView}>
				<View style={styles.leftColAr}>
					{!expanded.req && !expanded.vol && (
						<View>
							<Text style={styles.sectionText}>
								What is Pedal Pals?
							</Text>
							<Text>
								Pedal Pals is one of BikeMN's newest
								initiatives! We strongly believe in the power of
								community and want to do our part to help grow
								the cycling community within the Twin Cities!
							</Text>
						</View>
					)}
					{!expanded.req && (
						<View style={{ marginVertical: 25 }}>
							{!expanded.req && !expanded.vol && (
								<View>
									<Text style={styles.subsectionText}>
										Become a Pedal Pal if you want...
									</Text>
									<Text>A biking companion</Text>
									<Text>To support beginner commuters</Text>
									<Text>
										To share your knowledge of bike fits,
										gear, and maintenance
									</Text>
									<Text>
										To share tips on navigating dress code
										while bike commuting
									</Text>
									<Text>
										To build community with other bikers in
										your area
									</Text>
									<Text>...</Text>
								</View>
							)}
							<ScaleButton
								looks={[
									styles.solidButton,
									{
										width: width - 40,
										marginTop: 10,
										alignSelf: "center",
									},
								]}
								onPress={() => {
									setExpanded({
										...expanded,
										vol: !expanded.vol,
									});
								}}
							>
								<Text style={styles.buttonText}>
									{expanded.vol
										? `Close`
										: `Become A Pedal Pal`}
								</Text>
							</ScaleButton>
						</View>
					)}

					{!expanded.vol && (
						<View>
							{!expanded.req && !expanded.vol && (
								<View>
									<Text style={styles.subsectionText}>
										Request a Pedal Pal if you want...
									</Text>
									<Text>A biking companion</Text>
									<Text>Advice on gear</Text>
									<Text>Help finding routes</Text>
									<Text>To practice your commute</Text>
									<Text>
										To build confidence riding on the street
									</Text>
									<Text>
										To build community with other bikers in
										your area
									</Text>
									<Text>...</Text>
								</View>
							)}

							<ScaleButton
								looks={[
									styles.solidButton,
									{
										width: width - 40,
										marginTop: 10,
										alignSelf: "center",
									},
								]}
								onPress={() => {
									setExpanded({
										...expanded,
										req: !expanded.req,
									});
								}}
							>
								<Text style={styles.buttonText}>
									{expanded.req
										? `Close`
										: `Request A Pedal Pal`}
								</Text>
							</ScaleButton>
						</View>
					)}
				</View>
				{expanded.vol && (
					<>
						{loader && (
							<ActivityIndicator
								style={{
									flex: 1,
								}}
								size="large"
							/>
						)}
						<WebView
							source={{
								uri: "https://forms.gle/rcP42gFsZAGqTodA6",
							}}
							style={{ width, marginVertical: 20 }}
							ref={volRef}
							onLoadStart={() => {
								setLoader(true);
							}}
							onLoad={() => {
								setLoader(false);
							}}
						/>
					</>
				)}
				{expanded.req && (
					<>
						{loader && (
							<ActivityIndicator
								style={{
									flex: 1,
								}}
								size="large"
							/>
						)}
						<WebView
							source={{
								uri: "https://docs.google.com/forms/d/e/1FAIpQLSew_xVwif8or7lQ77OuuG1sIHDKzW_K5ZyY9LUrixeGcqiPaw/viewform",
							}}
							style={{ width, marginVertical: 20 }}
							ref={reqRef}
							onLoadStart={() => {
								setLoader(true);
							}}
							onLoad={() => {
								setLoader(false);
							}}
						/>
					</>
				)}
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
