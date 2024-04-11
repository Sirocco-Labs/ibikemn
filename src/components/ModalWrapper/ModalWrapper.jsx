import { SafeAreaView, Modal, TouchableOpacity, View } from "react-native";
import { Text, SpeedDial, Dialog, Button, FAB } from "@rneui/themed";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleRideStarted } from "../../redux/slices/commuteSlice";

export default function ModalWrapper({
	visible,
	action,
	startTracking,
	stopTracking,
	header,
	screen,
	component: Component,
}) {
	const dispatch = useDispatch();
	let title = "";
	const handleClose = () => {
		screen ? close() : dispatch(toggleRideStarted());
	};
	const close = () => {
		action((prevState) => ({
			...prevState,
			[screen]: false,
		}));
	};
	if (screen) {
		const first = screen.at(0).toUpperCase();
		const remainder = screen.slice(1, screen.length);
		title = first.concat(remainder);
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
			onRequestClose={handleClose}
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
				<View
					style={{
						alignSelf: "flex-start",
						marginLeft: 15,
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 20,
						}}
					>
						{screen ? `${title}` : `${header}`}
					</Text>
				</View>
				<Component />
				{screen && (
					<FAB
						style={{ marginBottom: 30, marginRight: 20 }}
						icon={{ name: "close", color: "#F7B247" }}
						placement="center"
						size="large"
						onPress={close}
						color="#1269A9"
					/>
				)}
			</View>
		</Modal>
	);
}
