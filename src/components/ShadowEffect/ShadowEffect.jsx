import { Shadow } from "react-native-shadow-2";
import {
	SafeAreaView,
	Modal,
	ScrollView,
	TouchableOpacity,
	View,
	StyleSheet,
	ActivityIndicator,
    Pressable,
} from "react-native";
import { Text, SpeedDial, Dialog, Button, FAB } from "@rneui/themed";
import React, { useState, useRef, useEffect } from "react";

export default function ShadowEffect({ children, style}){
    return (
		<Shadow
			distance={4}
			startColor={"#000"}
			containerViewStyle={{ marginVertical: -20 }}
			radius={10}
		>
			{children}
		</Shadow>
	);
}
