import { supabase } from "../../services/supabase/supabase";
import { setUserTravelStats } from "../slices/travelStatsSlice";

export const getAllUserRides = (user_id) => async (dispatch) => {
	console.log("IN COMMUTE THUNK ----> getAllUserRides(user_id): ", user_id);

	try {
		const allUserRides = await supabase
			.from("all_rides")
			.select("*")
			.eq("user_id", user_id);
		if (allUserRides.error) {
			console.log(
				"SUPABASE GET ALL USER RIDES ERROR! : ",
				allUserRides.error
			);
		} else {
			console.log(
				"SUPABASE GET ALL USER RIDES SUCCESS! : ",
				allUserRides.data
			);
			// setAllRides(allUserRides.data)
		}
	} catch (error) {
		console.log(
			"COMMUTE THUNK ERROR ----> getAllUserRides(user_id): ",
			error
		);
	}
};

export const getUserTravelStats = (user_id) => async (dispatch) => {
	console.log("IN COMMUTE THUNK --> getUserTravelStats(user_id): ", user_id);
	try {
		const travelStats = await supabase
			.from("travel_stats_junction")
			.select("*")
			.eq("user_id", user_id)
			.single();
		if (travelStats.error) {
			console.log(
				"SUPABASE GET ALL USER TRAVEL STATS ERROR! : ",
				travelStats.error
			);
		} else {
			console.log(
				"SUPABASE GET ALL USER TRAVEL STATS SUCCESS! : ",
				travelStats.data
			);
			dispatch(setUserTravelStats(travelStats.data))
		}
	} catch (error) {
		console.log(
			"COMMUTE THUNK ERROR ----> getUserTravelStats(user_id): ",
			error
		);
	}
};
export const addToAllRides = (rideData) => async (dispatch) => {
	console.log("IN COMMUTE THUNK ----> addToAllRides(rideData): ", rideData);
	// const {user_id, distance_traveled, is_work_commute} = rideData

	try {
		const insertRide = await supabase.from("all_rides").insert(rideData);
		if (insertRide.error) {
			console.log("SUPABASE INSERT RIDE ERROR! : ", insertRide.error);
		} else {
			console.log("SUPABASE INSERT RIDE SUCCESS! : ", insertRide.status);
			dispatch(updateTravelStats(rideData))
		}
	} catch (error) {
		console.log(
			"COMMUTE THUNK ERROR ----> addToAllRides(rideData): ",
			error
		);
	}
};

export const updateTravelStats = (rideData) => async (dispatch) => {
	console.log("IN COMMUTE THUNK --> updateTravelStats(rideData): ", rideData);

	const { user_id, distance_traveled, is_work_commute } = rideData;
	try {
		const travelStats = await supabase
			.from("travel_stats_junction")
			.select("*")
			.eq("user_id", user_id)
			.single();
		if (travelStats.error) {
			if (is_work_commute) {
				let workRideData = {
					user_id,
					miles_total: distance_traveled,
					rides_total: 1,
					commute_miles_total: distance_traveled,
					commute_rides_total: 1,
				};
				try {
					const firstWorkRide = await supabase
						.from("travel_stats_junction")
						.insert(workRideData);
					if (firstWorkRide.error) {
						console.log(
							"SUPABASE TRAVEL STATS INSERT ERROR! :",
							firstWorkRide.error
						);
					} else {
						console.log(
							"SUPABASE TRAVEL STATS INSERT SUCCESS! :",
							firstWorkRide.status
						);
					}
				} catch (error) {
					console.log("THUNK INSERT TRAVEL STATS ERROR", error);
				}
			} else {
				let firstInsert = {
					user_id,
					miles_total: distance_traveled,
					rides_total: 1,
				};
				try {
					const firstFunRide = await supabase
						.from("travel_stats_junction")
						.insert(firstInsert);
					if (firstFunRide.error) {
						console.log(
							"SUPABASE TRAVEL STATS INSERT ERROR! :",
							firstFunRide.error
						);
					} else {
						console.log(
							"SUPABASE TRAVEL STATS INSERT SUCCESS! :",
							firstFunRide.status
						);
					}
				} catch (error) {
					console.log("THUNK INSERT TRAVEL STATS ERROR", error);
				}
			}
		} else {
			if (is_work_commute) {
				let updater = { ...travelStats.data };
				let miles_total = (updater.miles_total += distance_traveled);
				let rides_total = (updater.rides_total += 1);
				let commute_miles_total = (updater.commute_miles_total +=
					distance_traveled);
				let commute_rides_total = (updater.commute_rides_total += 1);

				let workRideData = {
					rides_total,
					miles_total,
					commute_miles_total,
					commute_rides_total,
				};
				try {
					const updateWorkTravelStats = await supabase
						.from("travel_stats_junction")
						.update(workRideData)
						.eq("id", updater.id);
					if (updateWorkTravelStats.error) {
						console.log(
							"SUPABASE UPDATE WORK TRAVEL STATS ERROR",
							updateWorkTravelStats.error,
							"updater",
							updater
						);
					} else {
						console.log(
							"SUPABASE UPDATE WORK TRAVEL STATS SUCCESS",
							updateWorkTravelStats.status
						);
					}
				} catch (error) {
					console.log("THUNK UPDATE TRAVEL STATS ERROR", error);
				}
			} else {
				let updater = { ...travelStats.data };
				let miles_total = (updater.miles_total += distance_traveled);
				let rides_total = (updater.rides_total += 1);

				try {
					const updateTravelStats = await supabase
						.from("travel_stats_junction")
						.update({ miles_total, rides_total })
						.eq("id", updater.id);
					if (updateTravelStats.error) {
						console.log(
							"SUPABASE UPDATE FUN TRAVEL STATS ERROR",
							updateTravelStats.error, 'updater', updater
						);
					} else {
						console.log(
							"SUPABASE UPDATE FUN TRAVEL STATS SUCCESS",
							updateTravelStats.status
						);
					}
				} catch (error) {
					console.log("THUNK UPDATE TRAVEL STATS ERROR", error);
				}
			}
		}
		dispatch(getUserTravelStats(user_id));
	} catch (error) {
		console.log(
			"COMMUTE THUNK ERROR ----> updateTravelStats(rideData): ",
			error
		);
	}

};
