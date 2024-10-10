import React, { useRef, useState, useEffect } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";
const AnimatedStroke = Animated.createAnimatedComponent(Path);

const AnimatedPath = ({ d, progress }) => {
	const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
	const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
	const [length, setLength] = useState(0);
	const ref = useRef(null);


	const animatedBGProps = useAnimatedProps(() => ({
		// strokeDashoffset: length - length * progress.value,
		fillOpacity: progress.value,
	}));

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length * (Easing.in(Easing.ease(progress.value)))
		// fillOpacity: progress.value,
	}));
	// const animatedProps = useAnimatedProps(() => ({
	// 	strokeDashoffset: length - length * Easing.inOut(Easing.ease(progress.value)),
	// }));
    const handleLayout = () => {
		if (ref.current) {
			const pathLength = ref.current.getTotalLength();
			setLength(pathLength);
		}
	}

	return (
		<>
			<AnimatedStroke
				animatedProps={animatedBGProps}
				d={d}
				stroke={"white"}
				// stroke={"#1269A9"}
				strokeWidth={1.5}
				// fill={"white"}
				strokeDasharray={length}
				strokeLinecap={"round"}
			/>
			<AnimatedStroke
				animatedProps={animatedProps}
				onLayout={handleLayout}
				ref={ref}
				d={d}
				// stroke={"white"}
				stroke={"#F7B247"}
				strokeWidth={2}
				strokeDasharray={length}
				strokeLinecap={"round"}
			/>
		</>
	);
};

export default AnimatedPath;
