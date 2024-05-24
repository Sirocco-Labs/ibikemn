import TouchableScale from "react-native-touchable-scale";
import { View, Pressable, StyleSheet, Animated } from "react-native";
import { Easing } from "react-native-reanimated";
import { useRef, useState } from "react";

export default function ScaleButton({
	onPress,
	looks,
	children,
	disabled,
	offLooks,
}) {
	console.log('!# LOOKS', looks);
	console.log('!# OFF LOOKS', offLooks);
	const scale = useRef(new Animated.Value(0)).current;

	const handlePressIn = () => {
		scale.setValue(0);
		Animated.timing(scale, {
			toValue: 1,
			duration: 100,
			easing: Easing.in(Easing.ease),
			useNativeDriver: true,
		}).start(() => {
			onPress();
		});
	};
	const rippleStyle = {
		transform: [
			{
				scale: scale.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 2],
				}),
			},
		],
		opacity: scale.interpolate({
			inputRange: [0, 1],
			outputRange: [0.5, 0],
		}),
	};

	return disabled ? (
		<View
			style={[
				{ justifyContent: "center", alignItems: "center" },
				offLooks,
			]}
		>
			{children}
		</View>
	) : (
		<TouchableScale
			style={[
				{
					justifyContent: "center",
					alignItems: "center",
					overflow: "hidden",
					position: "relative",
				},
				looks,
				// rippleStyle
			]}
			onPress={() => {
				handlePressIn();
			}}
			pressInTension={1}
			pressOutTension={100}
			pressInFriction={100}
			pressOutFriction={100}
			activeScale={0.95}
		>
			<Animated.View
				style={[
					looks[0].backgroundColor
						? styles.ripple
						: styles.outlineRipple,
					rippleStyle,
				]}
			/>
			{children}
		</TouchableScale>
	);
}

const styles = StyleSheet.create({
	ripple: {
		position: "absolute",
		width: 100,
		height: 100,
		backgroundColor: "rgba(255, 255, 255,0.5)",
		borderRadius: 100,
		// top: "50%",
		// left: "50%",
		// marginLeft: -50,
		// marginTop: -50,
	},
	outlineRipple: {
		position: "absolute",
		width: 100,
		height: 100,
		backgroundColor: "rgba(18, 106, 169, 0.5)",
		borderRadius: 50,
		top: "50%",
		left: "50%",
		marginLeft: -50,
		marginTop: -50,
	},
});
