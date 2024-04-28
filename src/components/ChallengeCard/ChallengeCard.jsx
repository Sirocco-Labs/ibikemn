import {
	SafeAreaView,
	StyleSheet,
	View,
	Modal,
	ScrollView,
} from "react-native";
import { Text, SpeedDial, Button, LinearProgress, Card } from "@rneui/themed";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBike from "../ProgressBike/ProgressBike";

export default function ChallengeCard({ item, prog }) {
    const [loading, setLoading] = useState(true);
    const [earned, setEarned] = useState({});
    const is_updated = useSelector(
		(store) => store.incentives.updated
	);
    useEffect(()=>{
        progressValue(item, prog)

    },[prog])

    const progressValue = (item, prog) => {
        let check = prog.find((prog) => prog.active_incentive_id === item.id);
        if(check){
            setEarned(check);
        }
        console.log('CHECK OBJECT',check);

	};


//    console.log('GOAL PROG', prog);


	return (
		earned ? <Card raised containerStyle={{flex:1, width:'100%', flexDirection:'row',justifyContent:'flex-start'}}>
			<View style={styles.cenColBe}>
				{/* -----------ROW-------------- */}
				<View style={styles.splitCol}>
					{/* ------ left side column---- */}

					<View style={styles.splitLeftColCen}>
						<Text>
							{new Date(item.start_date).toLocaleDateString(
								"en-US",
								{
									timeZone: "UTC",
								}
							)}
						</Text>
					</View>
					{/* ------ right side column---- */}
					<View style={styles.splitLeftColCen}>
						<Text>
							{new Date(item.end_date).toLocaleDateString(
								"en-US",
								{
									timeZone: "UTC",
								}
							)}
						</Text>
					</View>
				</View>
				{/* ------------ROW END--------- */}
				<View style={styles.leftColAr}>
					<Text style={{ fontSize: 20 }}>{item.info.title}</Text>
					<Card.Divider />
					<Text>{item.info.description}</Text>
					<Text>{`${item.info.point_value} ${item.info.category.unit_of_measure}`}</Text>
				</View>
				<Card.Divider />
				<Card.Divider />
				<ProgressBike
					earned={earned.completion_progress}
					loading={!is_updated}
                    stats={earned}
				/>
				<Card.Divider />
			</View>

		</Card>
        : <>
        </>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
	},
	keeb: {
		flex: 1,
	},
	scroll: {
		flexGrow: 1,
	},
	innerScroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#fff",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		borderRadius: 16,
		marginVertical: 10,
	},
	splitCol: {
		flexDirection: "row",
		paddingHorizontal: 5,
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: "100%",
	},
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
	},
	splitLeftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "40%",
        marginVertical:10
	},
	splitLeftColCen: {
		justifyContent: "center",
		alignItems: "center",
		width: "40%",
        marginVertical:10
	},
	rightColAr: {
		justifyContent: "space-around",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColAr: {
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
	},
	leftColBe: {
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
	},
	rightColBe: {
		justifyContent: "space-between",
		alignItems: "flex-end",
		width: "100%",
	},
	cenColBe: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	cenRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	mv10: {
		marginVertical: 10,
	},
});



{
	/* <View style={[styles.leftColAr]}>
				<View style={styles.cenRow}>
					<Text>{item.info.title}</Text>
					<Text>
						{new Date(item.start_date).toLocaleDateString("en-US", {
							timeZone: "UTC",
						})}
					</Text>
				</View>

				<Text>{item.info.description}</Text>
				<Text>{`${item.info.point_value} ${item.info.category.unit_of_measure}`}</Text>
				<Text>
					{new Date(item.end_date).toLocaleDateString("en-US", {
						timeZone: "UTC",
					})}
				</Text>
			</View> */
}