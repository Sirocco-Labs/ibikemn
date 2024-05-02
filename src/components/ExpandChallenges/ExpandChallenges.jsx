import TouchableScale from "react-native-touchable-scale";
import { ListItem, Icon, View } from "@rneui/themed";
import { useEffect, useState } from "react";
import ChallengeCard from "../ChallengeCard/ChallengeCard";

export default function ExpandChallenges({ progress, active }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<ListItem.Accordion
			Component={TouchableScale}
			friction={1000}
			tension={20}
			activeScale={0.97}
			onPress={() => setExpanded(!expanded)}
			animation={{
				duration: 100,
				easing: "linear",
			}}
			content={
				<>
					<Icon
						name="trophy-variant"
						type="material-community"
						color={"#F7B247"}
						style={{
                            marginRight: 10,
						}}
					/>
                        <ListItem.Content>
                            <ListItem.Title
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    // marginHorizontal: 25,
                                }}
                            >
                                Active Challenge Progress
                            </ListItem.Title>
                        </ListItem.Content>
				</>
			}
			isExpanded={expanded}
			containerStyle={{
				width: "100%",
				backgroundColor: "#1269A9",
				borderRadius: 12,
			}}
			icon={
				<Icon
					name={"chevron-down"}
					type="material-community"
					color={"#fff"}
				/>
			}
		>
			{progress &&
				active.map((chal) => (
					<ListItem
						key={chal.id}
						Component={() => (
							<ChallengeCard item={chal} prog={progress} />
						)}
					></ListItem>
				))}
		</ListItem.Accordion>
	);
}
