import {
	SafeAreaView,
	View,
	StyleSheet,
	ScrollView,
	FlatList,
} from "react-native";
import { Text, Button, Card, Input, Dialog } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
	staffGetBikes,
	getMyBike,
	checkoutBike,
	returnBike,
} from "../../redux/thunks/private/staffBikeThunk";

import { HumanDateTime } from "../../util/HumanDateTime/HumanDateTime";
import { clearMyBike } from "../../redux/slices/private/staffBikeSlice";

import ScreenWrapper from "../../components/ScreenWrapper/ScreenWrapper";

export default function BikeListScreen() {
	const dispatch = useDispatch();
	const myBike = useSelector((store) => store.myBike);
	const allBikes = useSelector((store) => store.allBikes);
	const orgBikes = useSelector((store) => store.orgBikes);

	const organizations = useSelector((store) => store.organizations);
	const user = useSelector((store) => store.user);

	const [todayISO, setTodayISO] = useState("");
	const [today, setToday] = useState("");

	const [open, setOpen] = useState(false);
	const [howLong, setHowLong] = useState(1);
	const [checkout, setCheckout] = useState({});
	const [supaReturnDate, setSupaReturnDate] = useState("");

	const inputData = {
		make: "",
		color: "",
		serial_number: "",
		user_id: user.user_id,
	};
	const [bikeForm, setBikeForm] = useState(inputData);

	useEffect(() => {
		// console.log(orgBikes);
		dispatch(staffGetBikes(user.org_id));
		dispatch(getMyBike(user.user_id));
	}, [dispatch]);

	useEffect(() => {
		const now = HumanDateTime();
		const date = new Date();
		const supaDate = date.toISOString();
		setTodayISO(supaDate);
		setToday(now.full);

		// const isoDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString();
	}, []);

	useEffect(() => {
		futureISO();
	}, [howLong]);
	useEffect(() => {
		updatePayload();
	}, [supaReturnDate]);

	const futureISO = () => {
		const currentDate = new Date();
		const futureDate = new Date();
		futureDate.setDate(currentDate.getDate() + 7 * howLong);
		setSupaReturnDate(futureDate.toISOString());
	};
	const updatePayload = () => {
		setCheckout({ ...checkout, return_by: supaReturnDate });
	};

	const handleWeekChange = (step) => {
		switch (step) {
			case "LESS":
				return howLong > 1
					? setHowLong((last) => (last -= 1))
					: setHowLong(1);
			case "MORE":
				return howLong < 4
					? setHowLong((last) => (last += 1))
					: setHowLong(4);
		}
	};

	const resetCheckout = () => {
		setOpen(!open);
		setCheckout({});
		setHowLong(1);
	};

	const handleCheckout = () => {
		dispatch(checkoutBike(checkout));
		resetCheckout();
	};

	const formatForHumans = (iso) => {
		const date = new Date(iso);
		const formattedTime = date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
		return formattedTime;
	};

    const giveBack = () =>{
        dispatch(returnBike(myBike))
    }

	const Item = ({
		id,
		bike_id,
		return_by,
		nickname,
		checked_out_by,
		org_id,
		in_use,
		user_first,
		user_last,
	}) => {
		const is_my_bike = checked_out_by === user.user_id;

		const currentBike = {
			id,
			bike_id,
			return_by: supaReturnDate,
			checked_out_by: user.user_id,
			in_use: true,
			org_id,
			check_out_date: todayISO,
		};

		const takeBike = () => {
			setCheckout(currentBike);
			setOpen(!open);
		};

		if (in_use) {
			if (is_my_bike) {
				return <View></View>;
			} else {
				return (
					<Card
						wrapperStyle={{
							width: 260,
							alignItems: "center",
						}}
						containerStyle={styles.bikeCard}
					>
						<Card.Title> {nickname}</Card.Title>
						<Text>Available On: {formatForHumans(return_by)}</Text>
						<Text></Text>
						<Card.Divider />
						<View>
							<Button
								disabled={in_use}
								title={
									in_use
										? "Not Available"
										: `Use ${nickname}`
									}
								onPress={() => {
									giveBack(bike_id);
								}}
							/>
						</View>
					</Card>
				);
			}
		} else {
			return (
				<Card
					wrapperStyle={styles.bikeWrapper}
					containerStyle={styles.bikeCard}
				>
					<Card.Title>{nickname}</Card.Title>
					<Text> Available </Text>
					<Card.Divider />
					<View>
						<Button
							title={`Use ${nickname}`}
							onPress={takeBike}
						/>
					</View>
				</Card>
			);
		}
	};

	return (
		<ScreenWrapper background={{backgroundColor:'#fff'}}>
			<View style={styles.container}>
				<View style={styles.sectionView}>
					{myBike.bike_id === 0 && (
						<View>
							<Text>Check out a bike </Text>
							<View style={styles.flatList}>
								<FlatList
									data={orgBikes}
									renderItem={({ item }) => (
										<Item
											id={item.id}
											bike_id={item.bike.id}
											nickname={item.bike.nickname}
											return_by={item.return_by}
											user_first={item.user?.first_name}
											user_last={item.user?.last_name}
											org_id={item.org_id}
											in_use={item.in_use}
											check_out_date={item.check_out_date}
										/>
									)}
									keyExtractor={(item) => item.id}
								/>
							</View>
						</View>
					)}
					{myBike.bike_id !== 0 && (
						<View style={styles.sectionView}>
							<Card
								wrapperStyle={styles.bikeWrapper}
								containerStyle={styles.bikeCard}
							>
								<Text
									style={{
										fontSize: 16,
										fontWeight: "bold",
										marginVertical: 10,
									}}
								>
									Return Your Bike by{" "}
									{formatForHumans(myBike.return_by)}
								</Text>
								<Button
									onPress={giveBack}
								>{`Return Bike #${myBike?.bike_id} `}</Button>
							</Card>
						</View>
					)}
				</View>
				<Dialog isVisible={open} onBackdropPress={resetCheckout}>
					<Dialog.Title
						title={`Checking out Bike #${checkout.bike_id}`}
					/>
					<View style={{ alignItems: "center", marginVertical: 5 }}>
						<Text style={{ fontSize: 16, marginBottom: 10 }}>
							How long do you need it?
						</Text>

						<View style={styles.grid}>
							<Button
								title="-"
								disabled={howLong <= 1}
								onPress={() => {
									handleWeekChange("LESS");
								}}
							/>
							<Text>
								{howLong} {howLong === 1 ? "Week" : "Weeks"}
							</Text>
							<Button
								variant="contained"
								title="+"
								disabled={howLong >= 4}
								onPress={() => {
									handleWeekChange("MORE");
								}}
							/>
						</View>
					</View>
					<Button
						buttonStyle={{ marginVertical: 5 }}
						onPress={handleCheckout}
					>
						Reserve Bike
					</Button>
				</Dialog>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-around",
		padding: 10,
		width: "100%",
		height: "100%",
	},
	sectionView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	flatList: {
		flex: 4,
		padding: 5,
		width: "100%",
		marginVertical: 10,
	},
	bikeCard: {
		paddingHorizontal: 2,
		alignItems: "center",
		marginVertical: 10,
	},
	bikeWrapper: {
		width: 260,
		alignItems: "center",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	gridItem: {
		width: "50%",
		padding: 1,
	},
	lastGridItem: {
		width: "100%",
		padding: 1,
	},
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
	leftColAr: {
		justifyContent: "space-around",
		alignItems: "flex-start",
		width: "100%",
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
	mv10: {
		marginVertical: 10,
	},
});

const cruft = [
	{
		/* <View style={styles.sectionView}>
				<Text>Add a bike</Text>
				<View style={styles.grid}>
					<View style={styles.gridItem}>
						<Input placeholder="Make/Model" />
					</View>
					<View style={styles.gridItem}>
						<Input placeholder="color" />
					</View>
					<View style={styles.lastGridItem}>
						<Input placeholder="serial number" />
					</View>
				</View>
			</View> */
	},
	{
		/* <Text>{today}</Text>
				<Text>{todayISO}</Text>
				<Button
					title={"Clear my bike"}
					onPress={() => {
						dispatch(clearMyBike());
					}}
				/> */
	},

	{
		/* <Text style={{ marginBottom: 10 }}>LOOK AT BIKES</Text>
				<Button
					onPress={() => {
						dispatch(staffGetBikes(user.org_id));
					}}
				>
					getBikes
				</Button> */
	},
];
