import {
	View,
	StyleSheet,
} from "react-native";
import {
	Dialog,
} from "@rneui/themed";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
	checkoutBike,
	returnBike,
} from "../../redux/thunks/private/staffBikeThunk";

import { HumanDateTime } from "../../util/HumanDateTime/HumanDateTime";


import BikeCheckoutDialogContent from "../../components/BikeCheckoutDialogContent/BikeCheckoutDialogContent";

import BikeCheckoutItem from "../../components/BikeCheckoutItem/BikeCheckoutItem";

export default function AvailableBikeList({orgBikes, user, myBike}) {
    const dispatch = useDispatch()

    const [todayISO, setTodayISO] = useState("");
	const [today, setToday] = useState("");

	const [open, setOpen] = useState(false);
	const [howLong, setHowLong] = useState(1);
	const [checkout, setCheckout] = useState({});
	const [supaReturnDate, setSupaReturnDate] = useState("");

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

	const giveBack = () => {
		dispatch(returnBike(myBike));
	};


	return (
		<>
			<View style={styles.checkoutSection}>
				{orgBikes.map((bike) => (
					<BikeCheckoutItem
						key={bike.id}
						topBike={bike}
						appUser={user}
						giveBack={giveBack}
						checkoutAction={{ checkout, setCheckout }}
						openAction={{ open, setOpen }}
						formatForHumans={formatForHumans}
						supaReturnDate={supaReturnDate}
						myBike={myBike}
						bikeUser={
							bike.user ? bike.user : { checked_out_by: null }
						}
					/>
				))}
			</View>

			<Dialog
				isVisible={open}
				onBackdropPress={resetCheckout}
				overlayStyle={styles.container}
			>
				<BikeCheckoutDialogContent
					howLong={howLong}
					handleWeekChange={handleWeekChange}
					handleCheckout={handleCheckout}
					checkout={checkout}
				/>
			</Dialog>
		</>
	);
}
const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#fff",
		alignItems: "flex-start",
		justifyContent: "space-around",
		padding: 5,
		width: "100%",
		height: "40%",
	},
	dialogWrapper: {
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		padding: 15,
		backgroundColor: "#fff",
		marginVertical: 10,
	},
	checkoutSection: {
		flex: 1,
		alignItems: "flex-end",
		justifyContent: "space-between",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 10,
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
	singleBike: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		backgroundColor: "#fff",
	},
	flatList: {
		flex: 4,
		padding: 5,
		width: "100%",
		marginVertical: 10,
	},
	bikeCard: {
		flex: 1,
		paddingHorizontal: 2,
		alignItems: "center",
		marginVertical: 10,
		width: "100%",
	},
	bikeWrapper: {
		flex: 1,
		width: "100%",
		alignItems: "center",
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		marginVertical: 20,
		paddingHorizontal: 20,
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
	title: {
		fontSize: 18,
	},
	solidButton: {
		backgroundColor: "#1269A9",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	solidButtonOff: {
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	outlineButton: {
		borderWidth: 1.5,
		borderColor: "#1269A9",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
	outlineButtonOff: {
		borderWidth: 1.5,
		borderColor: "#C0C0C0",
		backgroundColor: "#E5E4E2",
		borderRadius: 12,
		height: 45,
		padding: 2,
	},
});
