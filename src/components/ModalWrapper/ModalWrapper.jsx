import { SafeAreaView, Modal, TouchableOpacity, View } from "react-native";
import { Text, SpeedDial, Dialog, Button, FAB } from "@rneui/themed";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ModalWrapper({
	visible,
	action,
	screen,
	component: Component,
}) {
	const close = ()=>{
		action((prevState) => ({
			...prevState,
			[screen]: false,
		}));

	}
	return (
		<Modal
			transitionDuration={1000}
			animationType="slide"
			// animationType="fade"
			transparent={true}
			visible={visible}
			fullScreen={false}
			statusBarTranslucent={true}
			onRequestClose={close}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#F7B247",
					height: "100%",
					paddingBottom: 60,
					paddingTop: 60,
				}}
			>
				<Text
				style={{fontWeight:'bold', size:30}}
				>{screen}</Text>
				<Component />
				<FAB
					style={{ marginBottom: 30, marginRight: 20 }}
					icon={{ name: "close", color: "#F7B247" }}
					placement="center"
					size="large"
					onPress={close}
					color="#1269A9"
				/>
			</View>
		</Modal>
	);
}
