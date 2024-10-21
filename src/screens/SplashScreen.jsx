import { SafeAreaView, View, StyleSheet, Image, StatusBar } from "react-native";
import { Text } from "@rneui/themed";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";

export default function SplashScreen() {
	const splash = require("../assets/splash.png");
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#1269A9" />
			<View style={styles.flex1}>
				<Image
					source={splash}
					style={{
						flex: 1,
						resizeMode: "contain",
						// position: "absolute",
					}}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	flex1: {
		flex: 1,
		backgroundColor: "#FFE7C1",
		alignItems: "center",
		justifyContent: "center",
	},
});
