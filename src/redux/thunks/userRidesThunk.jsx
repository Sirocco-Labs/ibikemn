import { supabase } from "../../services/supabase/supabase";

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

	// SELECT * FROM travel_stats_junction.eq(user_id)
	// setTravelStats(getCommuteData.data)
	try {
		const travelStats = await supabase
			.from("travel_stats_junction")
			.select("*")
			.eq("user_id", user_id)
			.single();
            ;
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
			// setUserTravelStats(travelStats.data)
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
        // INSERT INTO all_rides(rideData)
        const insertRide = await supabase.from('all_rides').insert(rideData)
        if (insertRide.error) {
            console.log(
				"SUPABASE INSERT RIDE ERROR! : ",
				insertRide.error
			);

        } else {
            console.log("SUPABASE INSERT RIDE SUCCESS! : ", insertRide.status);

            // dispatch(updateTravelStats(rideData))
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

	const {user_id, distance_traveled, is_work_commute} = rideData
	try {
		// SELECT * FROM travel_stats_junction
		const travelStats = await supabase
			.from("travel_stats_junction")
			.select("*")
			.eq("user_id", user_id)
            .single()
            ;

		if (travelStats.error) {
			if (is_work_commute) {
				let workRideData = {
					user_id,
					miles_total: distance_traveled,
					rides_total: 1,
					commute_miles_total: distance_traveled,
					commute_rides_total: 1,
				};
				("INSERT INTO travel_stats_junction(workRideData)");

			} else {

				let firstInsert = {
					user_id,
					miles_total: distance_traveled,
					rides_total: 1,
				};

				("INSERT INTO travel_stats_junction(firstInsert)");
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
					user_id,
					miles_total,
					commute_miles_total,
					commute_rides_total,
				};

				("UPDATE travel_stats_junction(workRideData).match(user_id)");

			} else {
				let updater = { ...select.data };
				let miles_total = (updater.miles_total += distance_traveled);
				let rides_total = (updater.rides_total += 1);

				(" UPDATE travel_stats_junction({miles_total, rides_total}).match(user_id)");
			}
		}
		dispatch(getUserTravelStats(user_id));
	} catch (error) {
        console.log(
			"COMMUTE THUNK ERROR ----> updateTravelStats(user_id): ",
			error
		);

    }

	//
};
