import TouchableScale from "react-native-touchable-scale";
import { View } from "react-native";

export default function ScaleButton({onPress, looks, children, disabled, offLooks}) {
    return disabled ? (
		<View
			style={[
				{ justifyContent: "center", alignItems: "center" },
				offLooks,
			]}
			// onPress={onPress}
			// pressInTension={1}
			// pressOutTension={100}
			// pressInFriction={100}
			// pressOutFriction={10}
			// activeScale={0.9}
		>
			{children}
		</View>
	) : (
		<TouchableScale
			style={[{ justifyContent: "center", alignItems: "center" }, looks]}
			onPress={onPress}
			pressInTension={1}
			pressOutTension={100}
			pressInFriction={100}
			pressOutFriction={10}
			activeScale={0.9}
		>
			{children}
		</TouchableScale>
	);

}
