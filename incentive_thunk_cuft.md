// export const updateUserIncentiveProgress = (userInfo) => async (dispatch) => {
// 	console.log(
// 		"IN INCENTIVE THUNK ---> updateUserIncentiveProgress(userInfo)",
// 		userInfo
// 	);
// 	const { publicUser, user_id } = userInfo;

// 	try {
// 		const activeIncentives = await findActiveIncentives(userInfo);
// 		const userRide = await findRide(user_id);

// 		if (activeIncentives.error || userRides.error) {
// 			let oops = {
// 				user: userRide.error || "",
// 				active: activeIncentives.error || "",
// 			};
// 			console.log(
// 				" updateUserIncentiveProgress REQUEST ERROR: ",
// 				"User Rides: ",
// 				oops.user,
// 				"Active Incentives: ",
// 				oops.active
// 			);
// 			throw error;
// 		} else {
// 			let yay = {
// 				user: userRide.data || "",
// 				active: activeIncentives.data || "",
// 			};

// 			console.log(
// 				" updateUserIncentiveProgress REQUEST SUCCESS!: ",
// 				"User Rides: ",
// 				yay.user,
// 				"Active Incentives: ",
// 				yay.active
// 			);
// 			const matchedRides = await findRidesInWindow(
// 				activeIncentives.data,
// 				userRide.data
// 			);
// 			console.log(
// 				"updateUserIncentiveProgress matchedRides",
// 				matchedRides
// 			);

// 		}
// 	} catch (error) {
// 		console.log(
// 			"INCENTIVE THUNK ERROR --->  updateUserIncentiveProgress(userInfo)",
// 			error
// 		);
// 	}
// };

// const findRidesInWindow = async (active, ride) => {
// 	let matchedRides = [];
// 	for (let i = 0; i < active.length; i++) {
//         // loop through the active incentives
// 		console.log("Progress -----> matchRides, i", matchedRides, i);

//         let incentive = active[i];

// 		let windowStart = new Date(incentive.start_date);
// 		let windowEnd = new Date(incentive.end_date);
//         let rideTime = new Date(ride.ride_end_time);
//         // structure challenge range and ride end time to use in conditional range check

//         if (
// 			rideTime.getTime() >= windowStart.getTime() &&
// 			rideTime.getTime() < windowEnd.getTime()
// 		) {

// 			console.log("Progress CONDITION MET index:", i);
// 			let match = {
// 				active_incentive_id: incentive.id,
// 				incentive_point_value: incentive.info.point_value,
// 				title: incentive.info.title,
// 				type: incentive.info.category.incentive_type,
// 				unit: incentive.info.category.unit_of_measure,
// 			};
//             //create a new object with the ride and challenge info

// 			matchedRides.push(match);
// 		}

// 	}
//     for(let i=0; i<matchedRides.length; i++){
//         let incentive = matchedRides[i]

//         switch (incentive.unit) {
// 			case "rides":
// 				switch (incentive.type) {
// 					case "Replace VMT - Any":
// 						return;
// 					case "Commutes to work":
// 						return;
// 					case "Ride in a group":
// 						return;
// 					case "Replace VMT for Errands":
// 						return;
// 					case "Replace VMT for Recreational Location":
// 						return;
// 					case "Replace VMT for Social Location":
// 						return;
// 					case "Take a Bike Trail":
// 						return;
// 					case "Use a Bike Lane":
// 						return;
// 				}
// 				return;
// 			case "miles":
// 				switch (incentive.type) {
// 					case "Replace VMT - Any":
// 						return;
// 					case "Ride in a group":
// 						return;
// 					case "Replace VMT for Errands":
// 						return;
// 					case "Replace VMT for Recreational Location":
// 						return;
// 					case "Replace VMT for Social Location":
// 						return;
// 					case "Take a Bike Trail":
// 						return;
// 					case "Use a Bike Lane":
// 						return;
// 				}
// 				return;
// 		}

//     }

// 	return matchedRides;
// };

// const findRide = async (user_id) => {
// 	console.log("IN INCENTIVE THUNK ---> findAllRides(user_id)", user_id);
// 	let response;
// 	try {
// 		const ride = await supabase
// 			.from("all_rides")
// 			.select(
// 				`
//             id,
//             user_id,
//             is_work_commute,
//             distance_traveled,
//             ride_start_time,
//             ride_end_time,
//             ride_survey_junction: id(
//                 is_replace_transit,
//                 is_solo,
//                 destination_type,
//                 route_type
//             )
//             `
// 			)
// 			.eq("user_id", user_id)
// 			.order("ride_end_time", { ascending: false });

// 		if (ride.error) {
// 			console.log("SUPABASE FIND MOST RECENT USER RIDE ERROR! : ", ride.error);
// 			response = { error: ride.error.message };
// 		} else {
// 			console.log(
// 				"SUPABASE FIND MOST RECENT USER RIDE SUCCESS! : ",
// 				ride.data
// 			);
// 			response = { data: ride.data };
// 		}
// 		return response;
// 	} catch (error) {
// 		console.log(
// 			"COMMUTE THUNK ERROR ----> findAllRides(userInfo): ",
// 			error
// 		);
// 	}
// };

// const findActiveIncentives = async (userInfo) => {
// 	let response;

// 	console.log(
// 		"IN INCENTIVE THUNK ---> findActiveIncentives(userInfo)",
// 		userInfo
// 	);
// 	const { user_id, publicUser } = userInfo;

// 	let condition = { is_active: true };

// 	if (publicUser) {
// 		condition = { is_active: true, is_public: true };
// 	}

// 	try {
// 		const getChallenges = await supabase
// 			.from("activated_incentives_junction")
// 			.select(
// 				`
//                 id,
//                 start_date,
//                 end_date,
//                 info: incentive_id(
//                     id,
//                     title,
//                     description,
//                     category: category_id(
//                         id,
//                         incentive_type,
//                         unit_of_measure
//                     ),
//                     point_value
//                 )
//                 `
// 			)
// 			.match(condition);

// 		if (getChallenges.error) {
// 			console.log(
// 				"SUPABASE FIND ACTIVE CHALLENGES ERROR!: ",
// 				getChallenges.error
// 			);
// 			response = { error: getChallenges.error.message };
// 		} else {
// 			console.log(
// 				"SUPABASE FIND ACTIVE CHALLENGES SUCCESS!: ",
// 				getChallenges.status,
// 				getChallenges.data
// 			);
// 			response = { data: getChallenges.data };
// 		}
// 		return response;
// 	} catch (error) {
// 		console.log(
// 			"INCENTIVE THUNK ERROR ---> findActiveIncentives(userInfo)",
// 			error
// 		);
// 	}
// };

// const findIncentiveProgress = async (user_id) => {
// 	console.log(
// 		"IN INCENTIVE THUNK ---> findIncentiveProgress(user_id)",
// 		user_id
// 	);
// 	let response;
// 	try {
// 		const progress = await supabase
// 			.from("user_incentive_tracking_junction")
// 			.select("*")
// 			.eq("user_id", user_id);

// 		if (progress.error) {
// 			console.log("findIncentiveProgress ERROR! : ", progress.error);
// 			response = { error: progress.error.message };
// 		} else {
// 			console.log("findIncentiveProgress SUCCESS! : ", progress.data);
// 			response = { data: progress.data };
// 		}
// 		return response;
// 	} catch (error) {
// 		console.log(
// 			"COMMUTE THUNK ERROR ----> findIncentiveProgress(userInfo): ",
// 			error
// 		);
// 	}
// };

// export const getAllIncentives = () => async (dispatch) => {
// 	console.log("IN INCENTIVE THUNK ---> ()");
// 	try {
// 		const foo = await supabase.from("").select();

// 		if (foo.error) {
// 			console.log("SUPABASE CHALLENGE ERROR!: ", foo.error);
// 		} else {
// 			console.log("SUPABASE CHALLENGE SUCCESS!: ", foo.status, foo.data);
// 			// dispatch()
// 		}
// 	} catch (error) {
// 		console.log("INCENTIVE THUNK ERROR ---> ()", error);
// 	}
// };

{
	/*
    	// for (const trackedChallenge of alreadyTracking.data) {
			// 	const correspondingChallenge = activeChallenges.data.find(
			// 		(challenge) =>
			// 			challenge.id === trackedChallenge.active_incentive_id
			// 	);

			// 	let goalType =
			// 		correspondingChallenge.incentives.category.unit_of_measure;
			// 	let existingProgress = {
			// 		row_id: trackedChallenge.id,
			// 		progress: trackedChallenge.earned_points_toward_goal,
			// 	};
			// 	try {
			// 		const updateResults = await updateTrackingProgress(
			// 			correspondingChallenge,
			// 			user_id,
			// 			existingProgress,
			// 			recentRide,
			// 			goalType
			// 		);
			// 		if (updateResults.error) {
			//             console.log('UPDATE PROGRESS RESULTS DATA', updateResults.error);
			// 			updateLog.push({
			//                 status: "ERROR",
			// 				info: {
			//                     data: updateResults.data,
			// 					error: updateResults.error,
			// 				},
			// 			});
			// 		} else {
			//             console.log('UPDATE PROGRESS RESULTS DATA', updateResults.data);
			// 			updateLog.push({
			// 				status: "SUCCESS",
			// 				info: {
			// 					data: updateResults.data,
			// 					error: updateResults.error,
			// 				},
			// 			});
			// 		}
			// 	} catch (error) {
			// 		console.log(
			// 			"Update existing tracking progress ERROR",
			// 			error
			// 		);
			// 	}
			// }








//  bulkAction LOGIC


    // for (let i = 0; i < activeChallenges.data.length; i++) {
		// 	const activeChallenge = activeChallenges.data[i];
        //     let goalType = '';

		// 	// Check if the recent ride counts towards any goal of the active incentive
		// 	if (activeChallenge.unit_of_measure === "rides") {
		// 		// Check if the recent ride counts toward the rides goal based on incentive_type
        //         goalType = 'rides'

		// 		if (
		// 			activeChallenge.incentives.category.incentive_type ===
		// 				"Commutes to work" &&
		// 			recentRide.is_work_commute
		// 		) {
		// 			if (
		// 				activeChallenge.start_date <=
		// 					recentRide.ride_end_time &&
		// 				activeChallenge.end_date > recentRide.ride_end_time
		// 			) {
		// 				// Update or insert incentive progress for commutes to work
		// 				const { data, error } = await supabase
		// 					.from("user_incentive_tracking_junction")
		// 					.upsert(
		// 						{
		// 							active_incentive_id: activeChallenge.id,
		// 							user_id: activeChallenge.user_id,
		// 							incentive_goal_value:
		// 								activeChallenge.incentive_goal_value,
		// 							earned_points_toward_goal: 1,
		// 							completion_progress: 100,
		// 							has_been_met: true,
		// 						},
		// 						{
		// 							onConflict: [
		// 								"active_incentive_id",
		// 								"user_id",
		// 							],
		// 							returning: "minimal", // Change to 'representation' if you want to get the updated record
		// 						}
		// 					);

		// 				if (error) {
		// 					throw error;
		// 				}
		// 			}
		// 		} else if (
		// 			activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT - Any" ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Ride in a group" &&
		// 				!recentRide.survey.is_solo) ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Errands" &&
		// 				recentRide.survey.destination_type ===
		// 					"Errands (grocery store, post office, etc)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Recreational Location" &&
		// 				recentRide.survey.destination_type ===
		// 					"A place for recreation (local park, landmark, or trail)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Social Location" &&
		// 				recentRide.survey.destination_type ===
		// 					"A place for socializing (a restaurant, bar, library)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Take a Bike Trail" &&
		// 				recentRide.survey.route_type === "Bike Trail") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Use a Bike Lane" &&
		// 				recentRide.survey.route_type === "Bike Lane")
		// 		) {
		// 			if (
		// 				activeChallenge.start_date <=
		// 					recentRide.ride_end_time &&
		// 				activeChallenge.end_date > recentRide.ride_end_time
		// 			) {
		// 				// Update or insert incentive progress for rides goal
		// 				const { data, error } = await supabase
		// 					.from("user_incentive_tracking_junction")
		// 					.upsert(
		// 						{
		// 							active_incentive_id: activeChallenge.id,
		// 							user_id: activeChallenge.user_id,
		// 							incentive_goal_value:
		// 								activeChallenge.incentives.point_value,
		// 							earned_points_toward_goal: 1,
		// 							completion_progress: 100,
		// 							has_been_met: true,
		// 						},
		// 						{
		// 							onConflict: [
		// 								"active_incentive_id",
		// 								"user_id",
		// 							],
		// 							returning: "minimal", // Change to 'representation' if you want to get the updated record
		// 						}
		// 					);

		// 				if (error) {
		// 					throw error;
		// 				}
		// 			}
		// 		}
		// 	} else if (activeChallenge.unit_of_measure === "miles") {
		// 		// Check if the recent ride counts toward the miles goal based on.incentives.category.incentive_type
        //         goalType = "miles";
		// 		if (
		// 			activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT - Any" ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Ride in a group" &&
		// 				!recentRide.survey.is_solo) ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Errands" &&
		// 				recentRide.survey.destination_type ===
		// 					"Errands (grocery store, post office, etc)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Recreational Location" &&
		// 				recentRide.survey.destination_type ===
		// 					"A place for recreation (local park, landmark, or trail)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Replace VMT for Social Location" &&
		// 				recentRide.survey.destination_type ===
		// 					"A place for socializing (a restaurant, bar, library)") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Take a Bike Trail" &&
		// 				recentRide.survey.route_type === "Bike Trail") ||
		// 			(activeChallenge.incentives.category.incentive_type ===
		// 				"Use a Bike Lane" &&
		// 				recentRide.survey.route_type === "Bike Lane")
		// 		) {
		// 			if (
		// 				activeChallenge.start_date <=
		// 					recentRide.ride_end_time &&
		// 				activeChallenge.end_date > recentRide.ride_end_time
		// 			) {
		// 				// Update or insert incentive progress for miles goal
		// 				const { data, error } = await supabase
		// 					.from("user_incentive_tracking_junction")
		// 					.upsert(
		// 						{
		// 							active_incentive_id: activeChallenge.id,
		// 							user_id: activeChallenge.user_id,
		// 							incentive_goal_value:
		// 								activeChallenge.incentive_goal_value,
		// 							earned_points_toward_goal:
		// 								recentRide.distance_traveled,
		// 							completion_progress: 100,
		// 							has_been_met: true,
		// 						},
		// 						{
		// 							onConflict: [
		// 								"active_incentive_id",
		// 								"user_id",
		// 							],
		// 							returning: "minimal", // Change to 'representation' if you want to get the updated record
		// 						}
		// 					);

		// 				if (error) {
		// 					throw error;
		// 				}
		// 			}
		// 		}
		// 	}

		// if (alreadyTracking.data.length > 0) {
		// 	// modify activeChallenges or use alreadyTracking to pass into bulkAction()
		// 	// use recentRide data to update the existing records with the data from the recentRide based on activeChallenge.unit_of_measure and activeChallenge.incentives.category.incentive_type
		// 	// bulkAction(activeChallenges.data, user_id, recentRide.data, updateTrackingProgress)
		// } else {
		// 	// use recentRide data to create the first row/instance of tracking user progress for qualifying challenges based on activeChallenge.unit_of_measure and activeChallenge.incentives.category.incentive_type
		// 	// bulkAction(activeChallenges.data, user_id, recentRide.data, insertTrackingProgress)
		// }

		// ------------------------------   CALL bulkAction() TO UPDATE   ----------------------------------
		// -------------------------------------------------------------------------------------------------

		// if (alreadyTracking.data.length > 0) {
		// 	// Filter activeChallenges to find challenges that are not already being tracked
		// 	const untrackedChallenges = activeChallenges.data.filter(
		// 		(challenge) =>
		// 			!alreadyTracking.data.some(
		// 				(trackedChallenge) =>
		// 					trackedChallenge.active_incentive_id ===
		// 					challenge.id
		// 			)
		// 	);

		// 	// Update existing tracking progress for tracked challenges
		// 	for (const trackedChallenge of alreadyTracking.data) {
		// 		const correspondingChallenge = activeChallenges.data.find(
		// 			(challenge) =>
		// 				challenge.id ===
		// 				trackedChallenge.active_incentive_id
		// 		);
		// 		await bulkAction(
		// 			[correspondingChallenge],
		// 			user_id,
		// 			recentRide,
		// 			updateTrackingProgress
		// 		);
		// 	}

		// 	// Create tracking progress for untracked challenges
		// 	await bulkAction(
		// 		untrackedChallenges,
		// 		user_id,
		// 		recentRide,
		// 		insertTrackingProgress
		// 	);
		// } else {
		// 	// No existing tracking progress, create new records for all active challenges
		// 	await bulkAction(
		// 		activeChallenges.data,
		// 		user_id,
		// 		recentRide,
		// 		insertTrackingProgress
		// 	);
		// }





















// } */
}
