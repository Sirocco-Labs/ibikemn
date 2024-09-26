import { useEffect } from "react";

import { Text, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

export default function AnimatedText({ text }) {
	const opacity = useSharedValue(0); // Start opacity at 0

	// Animated style that will change the opacity
	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value, // Attach shared value to opacity
		};
	});

	useEffect(() => {
		// Animate the opacity to 1 over 4500ms (4.5 seconds)
		opacity.value = withTiming(1, {
			duration: 3500, // Duration of fade-in
		});
	}, []);

	return (
		<Animated.Text style={[styles.text, animatedStyle]}>
			{text}
		</Animated.Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontWeight: "700",
		fontSize: 16,
		color: "#1269A9",
		marginBottom: 5,
		textAlign: "center",
		color: "#ffffff",
	},
});
