import React, { useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withDelay,
	Easing,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// Predefined range of colors
const colorRange = [
	"#ffbe0b",
	"#1269A9",
	"#fb5607",
	"#ffe600",
	"#ff006e",
	"#8338ec",
	"#3a86ff",
	"#ff595e",
	"#8ac926",
	"#6a4c93",
	"#3bceac",
	"#7bdff2",
	"#ef233c",
	"#9381ff",
];

// Random utility function to generate random values
const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min)) + min;

// Function to randomly pick a color from the range
const getRandomColor = () => {
	return colorRange[Math.floor(Math.random() * colorRange.length)];
};

// SVG shapes based on the provided data
const ConfettiShape1 = ({ color }) => (
	<Svg
		width="51"
		height="51"
		viewBox="0 0 51 51"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M0.847656 10.9442C0.847656 10.9442 3.09535 20.3431 16.3511 27.4123C29.6068 34.4757 40.7594 31.1871 50.4864 50.7935C50.4864 50.7935 49.5901 31.8667 34.3991 22.8974C19.2042 13.934 6.45225 15.3088 1.68151 0.686035L0.847656 10.9442Z"
			fill={color}
		/>
	</Svg>
);

const ConfettiShape2 = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M15.1519 40.9762C15.1519 40.9762 22.6402 37.277 29.3902 28.8434C32.6832 24.7458 31.9527 8.47625 18.6832 1.11687C18.6832 1.11687 17.1597 -0.793285 11.1715 1.60515C5.17145 3.99578 0.612857 6.10515 0.843326 8.00359C0.843326 8.00359 5.15973 8.89422 8.93317 13.3356C11.3199 16.1442 12.3707 18.5153 14.8707 24.4762C18.9215 34.0934 17.5699 39.777 15.1519 40.9762Z"
			fill={color}
		/>
	</Svg>
);

const ConfettiShape3 = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M0.925265 14.4779C1.13323 18.0899 7.18542 22.6294 7.18542 22.6294C21.3456 21.6499 28.2922 14.6877 31.4865 0.970077C22.0601 4.02763 27.6585 -0.245166 23.1305 5.49865C17.8268 12.2218 9.39162 15.7388 0.925265 14.4779Z"
			fill={color}
		/>
	</Svg>
);
const Star = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.27L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
			fill={color}
		/>
	</Svg>
);

const CrescentMoon = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path
			d="M12 2C10.5 2 9.12 2.95 8.3 4.3C7.3 6.1 7.67 8.39 9.16 10.16C10.65 11.93 13.35 12.31 15.7 11.4C17.9 10.67 19.52 8.59 19.67 6.31C19.74 4.89 18.64 3.69 17.22 3.23C15.8 2.77 14.36 2.68 12.91 3.06C12.4 3.19 11.94 3.45 11.54 3.81C11.09 4.21 10.65 4.59 10.21 4.95C9.6 5.62 9.2 6.48 9.03 7.4C8.8 8.48 8.99 9.52 9.5 10.46C9.99 11.44 10.7 12.39 11.63 13.24C12.66 14.14 13.76 14.81 15.04 14.8C16.36 14.8 17.69 14.35 18.78 13.46C19.84 12.6 20.71 11.47 21.26 10.08C21.85 8.66 21.86 7.19 21.29 5.9C20.72 4.6 19.6 3.55 18.3 3.09C16.8 2.58 15.19 2.37 13.64 2.62C13.22 2.68 12.81 2.77 12.4 2.91C12.27 2.93 12.14 2.94 12 2Z"
			fill={color}
		/>
	</Svg>
);

const Triangle = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path d="M12 2L22 22H2L12 2Z" fill={color} />
	</Svg>
);
const Swirl = ({color}) =>(
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M12 2C8.69 2 6 4.69 6 8C6 9.84 6.6 11.53 7.68 13.05L12 20.07L16.32 13.05C17.4 11.53 18 9.84 18 8C18 4.69 15.31 2 12 2Z" fill={color}/>
</Svg>

)
const Heart = ({color}) =>(
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 4.09 12 5.58C13.09 4.09 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" fill={color}/>
</Svg>

)
const Diamond = ({ color }) => (
	<Svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<Path d="M12 2L22 12L12 22L2 12L12 2Z" fill={color} />
	</Svg>
);

// Random confetti shape with random color from the range
const RandomConfettiShape = () => {
	const shapes = [Swirl, Heart, Diamond, Star, Triangle];
	const ShapeComponent = shapes[getRandomInt(0, shapes.length)];
	const randomColor = getRandomColor(); // Generate a random color from the range
	return <ShapeComponent color={randomColor} />;
};

const Confetti = ({ xPos, delay }) => {
	const translateY = useSharedValue(-getRandomInt(300, 600)); // Start above the screen
	const rotate = useSharedValue(getRandomInt(0, 360)); // Initial rotation angle

	useEffect(() => {
		translateY.value = withDelay(
			delay,
			withRepeat(
				withTiming(height + 50, {
					duration: getRandomInt(3000, 5000),
					easing: Easing.inOut(Easing.ease),
				}),
				-1, // Infinite repetition
				false
			)
		);

		rotate.value = withDelay(
			delay,
			withRepeat(
				withTiming(rotate.value + 360, {
					duration: getRandomInt(500, 1500),
					easing: Easing.linear,
				}),
				-1, // Infinite repetition
				false
			)
		);
	}, [translateY, rotate]);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [
			{ translateY: translateY.value },
			{ rotate: `${rotate.value}deg` },
		],
	}));

	return (
		<Animated.View
			style={[styles.confetti, { left: xPos }, animatedStyles]}
		>
			<RandomConfettiShape />
		</Animated.View>
	);
};

export default function CustomConfetti(params) {
	const confettiCount = 100; // Number of confetti pieces
	const confettiArray = new Array(confettiCount).fill(0);

	return (
		<View style={styles.container}>
			{confettiArray.map((_, index) => (
				<Confetti
					key={index}
					xPos={getRandomInt(0, width)}
					delay={getRandomInt(0, 2000)}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: "hidden",
	},
	confetti: {
		position: "absolute",
		width: 20,
		height: 20,
	},
});
