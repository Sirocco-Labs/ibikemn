import React from "react";
import {
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

const KeyboardAvoidingScrollView = ({
	children,
	scrollContentContainerStyle = {},
	scrollViewRef,
}) => {
	const headerHeight = useHeaderHeight();

	const renderScrollView = (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				...scrollContentContainerStyle,
			}}
			contentInsetAdjustmentBehavior="never"
			keyboardShouldPersistTaps="handled"
			ref={scrollViewRef}
		>
			{children}
		</ScrollView>
	);

	if (Platform.OS === "android") return renderScrollView;

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="padding"
			keyboardVerticalOffset={headerHeight}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				{renderScrollView}
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingScrollView;
