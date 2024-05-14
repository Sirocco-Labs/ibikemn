import { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";


export default function PhotoMediaItem({photo}) {
const {
	id,
	media_url,
	media_format,
	media_title,
	media_caption,
	is_displayed,
	created_at,
} = photo;
return (
	<View>
		<Text>Photo</Text>
	</View>
);

};
