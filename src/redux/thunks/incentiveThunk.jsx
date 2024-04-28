import { supabase } from "../../services/supabase/supabase";
import { getAllUserRides } from "./userRidesThunk";

import {
	setActiveIncentives,
	setIncentivesHistory,
	setIncentivesProgress,
	setIsProgressUpdated,
	setTimeOfProgressUpdate,
} from "../slices/incentiveSlice";

// update incentive progress tracking logic
{
	/*

1. Select * from all_rides eq(user_id)
2. Select * from activated_incentives_junction
    (
        JOIN incentives ON activated_incentives_junction
        WHERE activated_incentives_junction.incentive_id = incentives.id
        JOIN incentive_categories ON incentives
        WHERE incentives.category_id = incentive_categories.id
    )
    WHERE activated_incentives_junction.is_active = true
    AND activated_incentives_junction.end_date > now()

    const incentiveJoin = await supabase
 .from('activated_incentives_junction')
 .select(`
    *,
    incentives (
      *,
      incentive_categories (
        *
      )
    )
 `)
 .eq('is_active', true)
 .gt('end_date', new Date().toISOString())

    filter allRides.data where activated_incentives_junction.start_date <= allRides.ride_time <= activated_incentives_junction.end_date
    if  activated_incentives_junction.incentive_id.category_id.incentive_type === miles
        let progress = sum of allRides.data.distance_traveled

        let completion_progress = progress/incentives.point_value

        select * user_incentive_tracking_junction.eq(user_id, incentive_id)
        if error{
            insert into user_incentive_tracking_junction {user_id, incentive_id, completion_progress}
        }else{
            if(completion_progress === user_incentive_tracking_junction.completion_progress){
                update user_incentive_tracking_junction {completion_progress, has_been_met}
            }else{
                update user_incentive_tracking_junction {completion_progress}
            }
        }

        else if  activated_incentives_junction.incentive_id.category_id.incentive_type === rides
        let progress = sum of  allRides.data.length
         let completion_progress = progress/incentives.point_value

        select * user_incentive_tracking_junction.eq(user_id, incentive_id)
        if error{
            insert into user_incentive_tracking_junction {user_id, incentive_id, completion_progress}
        }else{
            if(completion_progress === user_incentive_tracking_junction.completion_progress){
                update user_incentive_tracking_junction {completion_progress, has_been_met}
            }else{
                update user_incentive_tracking_junction {completion_progress}
            }
        }

        else if  activated_incentives_junction.incentive_id.category_id.incentive_type === work_rides
        let progress = count allRides.data.is_work_commute
        let completion_progress = progress/incentives.point_value

        select * user_incentive_tracking_junction.eq(user_id, incentive_id)
        if error{
            insert into user_incentive_tracking_junction {user_id, incentive_id, completion_progress}
        }else{
            if(completion_progress === user_incentive_tracking_junction.completion_progress){
                update user_incentive_tracking_junction {completion_progress, has_been_met}
            }else{
                update user_incentive_tracking_junction {completion_progress}
            }
        }









*/
}
export const getActiveIncentives = (userInfo) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> getActiveIncentives(userInfo)",
		userInfo
	);
	const { user_id, publicUser } = userInfo;

	let condition = { is_active: true };

	if (publicUser) {
		condition = { is_active: true, is_public: true };
	}

	try {
		const getChallenges = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                id,
                start_date,
                end_date,
                info: incentive_id(
                    id,
                    title,
                    description,
                    category: category_id(
                        incentive_type,
                        unit_of_measure
                    ),
                    point_value
                )
                `
			)
			.lte("start_date", new Date().toISOString())
			.match(condition)
			.order("created_at", { ascending: false });

		if (getChallenges.error) {
			console.error(
				"SUPABASE GET ACTIVE PUBLIC CHALLENGES ERROR!: ",
				getChallenges.error
			);
		} else {
			console.log(
				"SUPABASE GET ACTIVE PUBLIC CHALLENGES SUCCESS!: ",
				getChallenges.status,
				getChallenges.data
			);
			dispatch(setActiveIncentives(getChallenges.data));
		}
	} catch (error) {
		console.error(
			"INCENTIVE THUNK ERROR ---> getActiveIncentives(userInfo)",
			error
		);
	}
};

export const getUserIncentiveProgress = (user_id) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> getUserIncentiveProgress(user_id)",
		user_id
	);
	try {
		const getUserProgress = await supabase
			.from("user_incentive_tracking_junction")
			.select(
				`
            id,
            active_incentive_id,
            active_challenge: active_incentive_id(
                id,
                start_date,
                end_date,
                challenge_info:incentive_id(
                    id,
                    title,
                    description,
                    category:category_id(
                        incentive_type,
                        unit_of_measure
                    ),
                    point_value
                )
            ),
            earned_points_toward_goal,
            completion_progress,
            has_been_met,
            date_completed,
            progress_last_checked
            `
			)
			.eq("user_id", user_id);

		if (getUserProgress.error) {
			console.error(
				"SUPABASE GET USER CHALLENGE PROGRESS ERROR!: ",
				getUserProgress.error
			);
		} else {
			console.log(
				"SUPABASE GET USER CHALLENGE PROGRESS SUCCESS!: ",
				getUserProgress.status,
				getUserProgress.data
			);
			dispatch(setIncentivesProgress(getUserProgress.data));
			// (FIND ME)
			dispatch(setIsProgressUpdated(true));
		}
	} catch (error) {
		console.error(
			"INCENTIVE THUNK ERROR ---> getUserIncentiveProgress(user_id)",
			error
		);
	}
};
export const checkChallengeCompletion = (userInfo) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> checkChallengeCompletion(userInfo)",
		userInfo
	);
	const { publicUser, user_id } = userInfo;

	try {
		let recentRide;
		// Get the most recent ride data for the user

		const findRide = await supabase
			.from("all_rides")
			.select("*")
			.match({ user_id: user_id })
			.order("ride_end_time", { ascending: false })
			.limit(1)
			.single();

		if (findRide.error) {
			console.error("recentRide error");
			throw findRide.error;
		} else {
			console.log(
				"SUPABASE GET MOST RECENT RIDE RIDE SUCCESS:",
				findRide.data
			);
			recentRide = findRide.data;
		}
		console.log(
			"This is recentRide after findRide get request:",
			recentRide
		);

		// if it wasn't a work commute:
		if (!recentRide.is_work_commute) {
			const surveyData = await supabase
				.from("ride_survey_junction")
				.select("*")
				.limit(1)
				.single()
				.match({ ride_id: recentRide.id });
			if (surveyData.error) {
				console.error(
					"SUPABASE GET SURVEY DATA ERROR",
					surveyData.error
				);
				throw surveyData.error;
			} else {
				console.log(
					"SUPABASE GET SURVEY DATA SUCCESS",
					surveyData.data
				);
				recentRide = { ...findRide.data, survey: surveyData.data };
				console.log(
					"This is recentRide for a Non Work Commute:",
					recentRide
				);
			}
		}

		if (!recentRide.survey) {
			console.log("recentRide WORK RIDE:", recentRide);
		} else {
			console.log("recentRide NOT A WORK RIDE:", recentRide);
		}

		if (!recentRide) {
			console.log("No recent ride found this is recentRide:", recentRide);
			return;
		}

		let condition;
		if (publicUser) {
			condition = { is_active: true, is_public: true };
		} else {
			condition = { is_active: true };
		}
		console.log("THIS IS THE CONDITION:", condition);
		// Iterate over each active incentive
		const activeChallenges = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                id,
                start_date,
                end_date,
                incentives: incentive_id(
                    id,
                    title,
                    point_value,
                    category: category_id(
                        unit_of_measure,
                        incentive_type
                    )
                )
                `
			)
			.lte("start_date", recentRide.ride_end_time)
			.gt("end_date", recentRide.ride_end_time)
			.match(condition)
			.order("id", { ascending: true });

		if (activeChallenges.error) {
			console.error(
				"SUPABASE GET ACTIVE CHALLENGES ERROR",
				activeChallenges.error
			);
			throw activeChallenges.error;
		} else {
			console.log(
				"SUPABASE GET ACTIVE CHALLENGES SUCCESS",
				activeChallenges.data
			);
			console.log(
				"NUMBER OF CHALLENGES RETURNED FROM REQUEST: ",
				activeChallenges.data.length
			);
			const checkTimes = activeChallenges.data
				.filter(
					(chal) =>
						chal.start_date <= recentRide.ride_end_time &&
						recentRide.ride_end_time < chal.end_date
				)
				.map((chal) => ({
					active_id: chal.id,
					og_id: chal.incentives.id,
					og_info: chal.incentives,
				}));
			console.log(
				"******** RECENT RIDE IS BETWEEN THE ACTIVE CHALLENGES START AND END TIMES FOR THESE:",
				checkTimes
			);
		}

		// const existing = activeChallenges.data.map(
		// 	(chal) => chal.incentives.id
		// );
		// console.log(
		// 	"HERE IS THE ARRAY OF INCENTIVE IDS FOR THE ACTIVE CHALLENGES: ",
		// 	existing
		// );
		const verifyingChallengeIds = activeChallenges.data.map(
			(chal) => chal.id
		);
		console.log(
			"HERE IS THE ARRAY OF IDS FOR ACTIVATED CHALLENGES: ",
			verifyingChallengeIds
		);

		// Check if already tracking progress
		const alreadyTracking = await supabase
			.from("user_incentive_tracking_junction")
			.select("*")
			.in("active_incentive_id", verifyingChallengeIds)
			.match({ user_id: user_id });

		if (alreadyTracking.error) {
			console.error(
				"SUPABASE GET USER PROGRESS FROM ACTIVE CHALLENGES ERROR:",
				alreadyTracking.error
			);

			throw alreadyTracking.error;
		} else {
			console.log(
				"SUPABASE GET USER PROGRESS FROM ACTIVE CHALLENGES SUCCESS:",
				alreadyTracking.data
			);
			console.log(
				"NUMBER OF ACTIVE CHALLENGES ALREADY BEING TRACKED:",
				alreadyTracking.data.length
			);
		}

		let insertLog;
		let verifyLog;
		let updateLog;

		console.log("******** ALREADY TRACKING data", alreadyTracking.data);

		// ------------------------------------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------------------------------------
		// ------------------------------ LET'S GET READY TO RUUUUUUUMMMMMMMBLE ---------------------------------------
		// ------------------------------------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------------------------------------

		if (alreadyTracking.data.length > 0) {
			// Update existing tracking progress for tracked challenges
			console.log(
				"******** CREATING UPDATE RECORDS FOR THESE TRACKED CHALLENGES",
				alreadyTracking.data
			);
			// need to make sure recent ride should update...
			if (recentRide) {
			}
			try {
				const updateLogData = await updateTrackingProgress(
					activeChallenges.data,
					alreadyTracking.data,
					user_id,
					recentRide
				);
				if (updateLogData.error) {
					console.error(
						"LIST OF FAILED UPDATES:",
						updateLogData.failed_updates
					);
					console.log("ALL UPDATE INFO:", updateLogData);
				} else {
					console.log(
						"LIST OF SUCCESSFUL UPDATES:",
						updateLogData.data
					);
					console.log("ALL UPDATE INFO:", updateLogData);
					updateLog = updateLogData;
				}
			} catch (error) {
				console.error("ERROR with updateTrackingProgress");
			}

			// Filter activeChallenges to find challenges that are not already being tracked
			const untrackedChallenges = activeChallenges.data.filter(
				(challenge) =>
					!alreadyTracking.data.some(
						(trackedChallenge) =>
							trackedChallenge.active_incentive_id ===
							challenge.id
					)
			);
			console.log(
				"HERE ARE THE UNTRACKED CHALLENGES",
				untrackedChallenges
			);

			// Create tracking progress for untracked challenges
			if (untrackedChallenges.length > 0) {
				const insertLogData = await insertTrackingProgress(
					untrackedChallenges,
					user_id,
					recentRide
				);

				if (insertLogData.error) {
					console.error(
						"TRY TRACKING PROGRESS FOR UNTRACKED CHALLENGES ERROR",
						insertLogData.error
					);
				} else {
					console.log(
						"TRY TRACKING PROGRESS FOR UNTRACKED CHALLENGES SUCCESS",
						insertLogData
					);

					insertLog = insertLogData;
				}
			}
		} else {
			// No existing tracking progress, create new records for all active challenges

			console.log(
				"******** NOT TRACKING ANY CHALLENGES YET DATA",
				activeChallenges.data,
				user_id,
				recentRide,
				insertTrackingProgress
			);

			const insertLogData = await insertTrackingProgress(
				activeChallenges.data,
				user_id,
				recentRide
			);
			if (insertLogData.error) {
				console.error(
					"SOME INSERTS FAILED FOR UNTRACKED CHALLENGES ERROR",
					insertLogData.failed_inserts
				);
				console.log(
					"THIS IS THE FULL HISTORY OF INSERTS",
					insertLogData
				);
			} else {
				console.log("ALL INSERTS WERE SUCCESSFUL", insertLogData.data);
				console.log(
					"THIS IS THE FULL HISTORY OF INSERTS",
					insertLogData
				);

				insertLog = insertLogData;
			}
		}

		const verifyLogData = await verifyProgressCompletion(
			verifyingChallengeIds,
			user_id
		);
		if (verifyLogData.error) {
			console.error(
				"LIST OF FAILED PROGRESS COMPLETION UPDATES:",
				verifyLogData.failed_updates
			);
			console.log("ALL PROGRESS COMPLETION UPDATES INFO:", verifyLogData);
		} else {
			console.log(
				"LIST OF SUCCESSFUL PROGRESS COMPLETION UPDATES:",
				verifyLogData.data
			);
			console.log("ALL PROGRESS COMPLETION UPDATES INFO:", verifyLogData);
			verifyLog = verifyLogData;
		}

		console.log(
			"INSERT LOG",
			insertLog,
			"UPDATE LOG",
			updateLog,
			"VERIFY LOG",
			verifyLog
		);

		let now = new Date();
		// (FIND ME)
		dispatch(setTimeOfProgressUpdate(now.toISOString()));
		dispatch(getUserIncentiveProgress(user_id));
	} catch (error) {
		console.error(
			"THUNK ERROR ---> checkChallengeCompletion(userInfo):",
			error.message
		);
	}
};

const bulkAction = async (
	activeChallenges,
	user_id,
	recentRide,
	functionToChange
) => {
	console.log(
		"IN INCENTIVE THUNK ---> bulkAction(activeChallenges, user_id, recentRide, functionToChange)",
		activeChallenges,
		user_id,
		recentRide,
		functionToChange
	);
	console.log("STARTING BULK ACTION FOR PROGRESS RECORDS");

	let successLog = [];
	let failLog = [];

	try {
		for (let i = 0; i < activeChallenges.length; i++) {
			console.log("AT INDEX", i, "********SUCCESS LOG", successLog);
			console.log("NUMBER OF SUCCESSFUL INSERTS:", successLog.length);

			console.log("AT INDEX", i, "********FAIL LOG", failLog);
			console.log("NUMBER OF FAILED INSERTS:", failLog.length);

			const activeChallenge = activeChallenges[i];
			let goalType = activeChallenge.incentives.category.unit_of_measure;
			let incentiveType =
				activeChallenge.incentives.category.incentive_type;

			console.log(
				"AT INDEX",
				i,
				"********SHOULD BE TRUE",
				activeChallenge.start_date <= recentRide.ride_end_time &&
					activeChallenge.end_date > recentRide.ride_end_time
					? "true"
					: "false"
			);

			// Check if the recent ride counts towards any goal of the active incentive
			if (goalType === "rides") {
				// Check if the recent ride counts toward the rides goal based on incentive_type

				if (
					incentiveType === "Commutes to work" &&
					recentRide.is_work_commute
				) {
					if (
						activeChallenge.start_date <=
							recentRide.ride_end_time &&
						activeChallenge.end_date > recentRide.ride_end_time
					) {
						// insert incentive progress for commutes to work
						try {
							const changingAction = await functionToChange(
								activeChallenge,
								user_id,
								recentRide,
								goalType
							);
							if (changingAction.error) {
								console.error(
									"CHANGING ACTION ERROR:",
									changingAction.message
								);
								failLog.push({
									status: "ERROR",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							} else {
								console.log(
									"CHANGING ACTION SUCCESS:",
									changingAction.data
								);

								successLog.push({
									status: "SUCCESS",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							}
						} catch (error) {
							console.error(
								"WORk changingAction-rides try catch block ERROR:",
								error
							);
						}
					}
				} else if (incentiveType === "Replace VMT - Any") {
					if (
						activeChallenge.start_date <=
							recentRide.ride_end_time &&
						activeChallenge.end_date > recentRide.ride_end_time
					) {
						// insert incentive progress for rides goal
						try {
							const changingAction = await functionToChange(
								activeChallenge,
								user_id,
								recentRide,
								goalType
							);
							if (changingAction.error) {
								console.error(
									"CHANGING ACTION ERROR:",
									changingAction.message
								);
								failLog.push({
									status: "ERROR",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							} else {
								console.log(
									"CHANGING ACTION SUCCESS:",
									changingAction.data
								);

								successLog.push({
									status: "SUCCESS",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							}
						} catch (error) {
							console.error(
								"NOT WORk changingAction-rides try catch block ERROR:",
								error
							);
						}
					}
				} else if (
					(incentiveType === "Ride in a group" &&
						!recentRide.survey.is_solo) ||
					(incentiveType === "Replace VMT for Errands" &&
						recentRide.survey.destination_type ===
							"Errands (grocery store, post office, etc)") ||
					(incentiveType ===
						"Replace VMT for Recreational Location" &&
						recentRide.survey.destination_type ===
							"A place for recreation (local park, landmark, or trail)") ||
					(incentiveType === "Replace VMT for Social Location" &&
						recentRide.survey.destination_type ===
							"A place for socializing (a restaurant, bar, library)") ||
					(incentiveType === "Take a Bike Trail" &&
						recentRide.survey.route_type === "Bike Trail") ||
					(incentiveType === "Use a Bike Lane" &&
						recentRide.survey.route_type === "Bike Lane")
				) {
					if (
						activeChallenge.start_date <=
							recentRide.ride_end_time &&
						activeChallenge.end_date > recentRide.ride_end_time
					) {
						// insert incentive progress for rides goal
						try {
							const changingAction = await functionToChange(
								activeChallenge,
								user_id,
								recentRide,
								goalType
							);
							if (changingAction.error) {
								console.error(
									"CHANGING ACTION ERROR:",
									changingAction.message
								);
								failLog.push({
									status: "ERROR",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							} else {
								console.log(
									"CHANGING ACTION SUCCESS:",
									changingAction.data
								);

								successLog.push({
									status: "SUCCESS",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							}
						} catch (error) {
							console.error(
								"NOT WORk changingAction-rides try catch block ERROR:",
								error
							);
						}
					}
				}
			} else if (goalType === "miles") {
				// Check if the recent ride counts toward the miles goal based on.incentives.category.incentive_type
				if (
					incentiveType === "Replace VMT - Any" ||
					(incentiveType === "Ride in a group" &&
						!recentRide.survey.is_solo) ||
					(incentiveType === "Replace VMT for Errands" &&
						recentRide.survey.destination_type ===
							"Errands (grocery store, post office, etc)") ||
					(incentiveType ===
						"Replace VMT for Recreational Location" &&
						recentRide.survey.destination_type ===
							"A place for recreation (local park, landmark, or trail)") ||
					(incentiveType === "Replace VMT for Social Location" &&
						recentRide.survey.destination_type ===
							"A place for socializing (a restaurant, bar, library)") ||
					(incentiveType === "Take a Bike Trail" &&
						recentRide.survey.route_type === "Bike Trail") ||
					(incentiveType === "Use a Bike Lane" &&
						recentRide.survey.route_type === "Bike Lane")
				) {
					if (
						activeChallenge.start_date <=
							recentRide.ride_end_time &&
						activeChallenge.end_date > recentRide.ride_end_time
					) {
						// Update or insert incentive progress for miles goal
						try {
							const changingAction = await functionToChange(
								activeChallenge,
								user_id,
								recentRide,
								goalType
							);
							if (changingAction.error) {
								console.error(
									"CHANGING ACTION ERROR:",
									changingAction.message
								);
								failLog.push({
									status: "ERROR",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							} else {
								console.log(
									"CHANGING ACTION SUCCESS:",
									changingAction.data
								);

								successLog.push({
									status: "SUCCESS",
									info: {
										data: changingAction.data,
										error: changingAction.message,
									},
								});
							}
						} catch (error) {
							console.error(
								"changingAction-miles try catch block ERROR:",
								error
							);
						}
					}
				}
			}
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> bulkAction(activeChallenges, user_id, recentRide, functionToChange):",
			error
		);
	}
	if (failLog.length > 0) {
		return { data: successLog, error: true, failed_inserts: failLog };
	} else {
		return { data: successLog, error: false, failed_inserts: failLog };
	}
};

const determineCourseOfAction = async (
	activeChallenges,
	alreadyTracking,
	user_id,
	recentRide
) => {
	console.log(
		"IN INCENTIVE THUNK ---> determineCourseOfAction(activeChallenges, alreadyTracking, user_id, recentRide, goalType)",
		activeChallenges,
		user_id,
		recentRide
	);

	const incentiveCategories = await supabase
		.from("incentive_categories")
		.select("*")
		.order("id", { ascending: true });
	let processControl = {};
	let qualifyingEvidence;
	let shouldUpdateRecord;
	let shouldInsertRecord;

	if (recentRide.survey) {
		console.log("THIS RIDE WAS NOT TO WORK");
		processControl = { ride_to_work: false, ride: { ...recentRide } };
	} else {
		processControl = { ride_to_work: true, ride: { ...recentRide } };
	}

	if (!processControl.ride_to_work) {
		// check if recent ride meets the criteria for an update of already tracking
		// if recentRide.survey..... has values from incentiveCategories.data
		//
		//  let qualifyingChallenges = filter activeChallenges based on those incentives.category.id
		//  if alreadyTracking has active_incentive_id from qualifyingChallenges
		//  shouldUPdate = true
		// let challengesToUpdate = filter alreadyTracking by qualifyingChallenges
		//
		//  THEN
		//  for challenge of challengesToUpdate{
		// const updateRecord = await supabase
		// 			.from("user_incentive_tracking_junction")
		// 			.update({
		// 				earned_points_toward_goal: insertValue,
		// 			})
		// 			.eq("id", existingProgress.row_id)
		// 			.select();
		// }
        // else
        //
        //
        //
        //
        //
        //
        //
	}else{

    }

	try {
	} catch (error) {}

	try {
	} catch (error) {}
};

const insertTrackingProgress = async (
	activeChallenges,
	user_id,
	recentRide
) => {
	console.log(
		"IN INCENTIVE THUNK ---> insertTrackingProgress(activeChallenges, user_id, recentRide, goalType)",
		activeChallenges,
		user_id,
		recentRide
	);
	console.log("InsertingTrackingProgressRecords");

	let successLog = [];
	let failLog = [];

	try {
		for (let i = 0; i < activeChallenges.length; i++) {
			let insertValue;
			let activeChallenge;
			let goalType;
			let incentiveType;
			console.log("AT INDEX", i, "********SUCCESS LOG", successLog);
			console.log("NUMBER OF SUCCESSFUL INSERTS:", successLog.length);

			console.log("AT INDEX", i, "********FAIL LOG", failLog);
			console.log("NUMBER OF FAILED INSERTS:", failLog.length);

			activeChallenge = activeChallenges[i];
			goalType = activeChallenge.incentives.category.unit_of_measure;
			incentiveType = activeChallenge.incentives.category.incentive_type;

			// console.log(
			// 	"AT INDEX",
			// 	i,
			// 	"RECENT RIDE",
			// 	recentRide,
			// 	" --------> ACTIVE CHALLENGE",
			// 	activeChallenge,
			// 	" --------> INCENTIVE TYPE",
			// 	incentiveType,
			// 	" --------> GOAL TYPE",
			// 	goalType
			// );

			// Check if the recent ride counts towards any goal of the active incentive
			if (goalType === "rides") {
				insertValue = 1;
				console.log(
					" --------> GOAL TYPE",
					goalType,
					"AT INDEX",
					i,
					"RECENT RIDE",
					recentRide,
					" --------> ACTIVE CHALLENGE",
					activeChallenge,
					" --------> INCENTIVE TYPE",
					incentiveType
				);
				// Check if the recent ride counts toward the rides goal based on incentive_type
				if (
					(incentiveType === "Commutes to work" &&
						recentRide.is_work_commute) ||
					//
					incentiveType === "Replace VMT - Any" ||
					//
					(incentiveType === "Ride in a group" &&
						!recentRide.survey.is_solo) ||
					//
					(incentiveType === "Replace VMT for Errands" &&
						recentRide.survey.destination_type ===
							"Errands (grocery store, post office, etc)") ||
					//
					(incentiveType ===
						"Replace VMT for Recreational Location" &&
						recentRide.survey.destination_type ===
							"A place for recreation (local park, landmark, or trail)") ||
					//
					(incentiveType === "Replace VMT for Social Location" &&
						recentRide.survey.destination_type ===
							"A place for socializing (a restaurant, bar, library)") ||
					//
					(incentiveType === "Take a Bike Trail" &&
						recentRide.survey.route_type === "Bike Trail") ||
					//
					(incentiveType === "Use a Bike Lane" &&
						recentRide.survey.route_type ===
							"On road infrastructure (a bike lane, cycle track)")
				) {
					// insert incentive progress for commutes to work
					try {
						const createRecord = await supabase
							.from("user_incentive_tracking_junction")
							.insert({
								active_incentive_id: activeChallenge.id,
								user_id: user_id,
								incentive_goal_value:
									activeChallenge.incentives.point_value,
								earned_points_toward_goal: insertValue,
							})
							.select()
							.limit(1)
							.single();

						if (createRecord.error) {
							console.error(
								"SUPABASE InsertingTrackingProgressRecords ERROR:",
								createRecord.status,
								createRecord.error.message
							);

							failLog.push({
								data: createRecord.data
									? createRecord.data
									: "NONE",
								error: true,
								message: createRecord.error.message,
							});
						} else {
							console.log(
								"SUPABASE InsertingTrackingProgressRecords success!",
								createRecord.status,
								createRecord.data
							);
							successLog.push({
								data: createRecord.data,
								error: false,
								message: createRecord.error
									? createRecord.error.message
									: "NONE",
							});
						}
					} catch (error) {
						console.error(
							"INSERT RECORD FOR RIDE CHALLENGE TYPE ERROR",
							error
						);
					}
				}
			} else if (goalType === "miles") {
				insertValue = recentRide.distance_traveled;
				console.log(
					" --------> GOAL TYPE",
					goalType,
					"AT INDEX",
					i,
					"RECENT RIDE",
					recentRide,
					" --------> ACTIVE CHALLENGE",
					activeChallenge,
					" --------> INCENTIVE TYPE",
					incentiveType
				);

				// Check if the recent ride counts toward the miles goal based on.incentives.category.incentive_type
				if (
					incentiveType === "Replace VMT - Any" ||
					//
					(incentiveType === "Ride in a group" &&
						!recentRide.survey.is_solo) ||
					//
					(incentiveType === "Replace VMT for Errands" &&
						recentRide.survey.destination_type ===
							"Errands (grocery store, post office, etc)") ||
					//
					(incentiveType ===
						"Replace VMT for Recreational Location" &&
						recentRide.survey.destination_type ===
							"A place for recreation (local park, landmark, or trail)") ||
					//
					(incentiveType === "Replace VMT for Social Location" &&
						recentRide.survey.destination_type ===
							"A place for socializing (a restaurant, bar, library)") ||
					//
					(incentiveType === "Take a Bike Trail" &&
						recentRide.survey.route_type === "Bike Trail") ||
					//
					(incentiveType === "Use a Bike Lane" &&
						recentRide.survey.route_type ===
							"On road infrastructure (a bike lane, cycle track)")
				) {
					try {
						const createRecord = await supabase
							.from("user_incentive_tracking_junction")
							.insert({
								active_incentive_id: activeChallenge.id,
								user_id: user_id,
								incentive_goal_value:
									activeChallenge.incentives.point_value,
								earned_points_toward_goal: insertValue,
							})
							.select("*")
							.limit(1)
							.single();

						if (createRecord.error) {
							console.error(
								"SUPABASE InsertingTrackingProgressRecords ERROR:",
								createRecord.status,
								createRecord.error.message
							);

							failLog.push({
								data: createRecord.data
									? createRecord.data
									: "NONE",
								error: true,
								message: createRecord.error.message,
							});
						} else {
							console.log(
								"SUPABASE InsertingTrackingProgressRecords success!",
								createRecord.status,
								createRecord.data
							);
							successLog.push({
								data: createRecord.data,
								error: false,
								message: createRecord.error
									? createRecord.error.message
									: "NONE",
							});
						}
					} catch (error) {
						console.error(
							"INSERT RECORD FOR MILES CHALLENGE TYPE ERROR",
							error
						);
					}
				}
			}
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> insertTrackingProgress(activeChallenges, user_id, recentRide)",
			error
		);
	}

	// try {
	// 	const createRecord = await supabase
	// 		.from("user_incentive_tracking_junction")
	// 		.insert({
	// 			active_incentive_id: activeChallenge.id,
	// 			user_id: user_id,
	// 			incentive_goal_value: activeChallenge.incentives.point_value,
	// 			earned_points_toward_goal: insertValue,
	// 		})
	// 		.select("*")
	// 		.single();

	// 	if (createRecord.error) {
	// 		console.error(
	// 			"SUPABASE InsertingTrackingProgressRecords ERROR:",
	// 			createRecord.status,
	// 			createRecord.error.message
	// 		);

	// 		return {
	// 			data: createRecord.data ? createRecord.data : "NONE",
	// 			error: true,
	// 			message: createRecord.error.message,
	// 		};
	// 	} else {
	// 		console.log(
	// 			"SUPABASE InsertingTrackingProgressRecords success!",
	// 			createRecord.status,
	// 			createRecord.data
	// 		);
	// 		return {
	// 			data: createRecord.data,
	// 			error: false,
	// 			message: createRecord.error
	// 				? createRecord.error.message
	// 				: "NONE",
	// 		};
	// 	}
	// } catch (error) {
	// console.error(
	// 	"THUNK ERROR ---> insertTrackingProgress(activeChallenge, user_id, recentRide, goalType)",
	// 	error
	// );
	// }
	if (failLog.length > 0) {
		return { data: successLog, error: true, failed_inserts: failLog };
	} else {
		return {
			data: successLog,
			error: false,
			failed_inserts: failLog,
		};
	}
};

const updateTrackingProgress = async (
	activeChallenges,
	alreadyTracking,
	user_id,
	recentRide
) => {
	console.log(
		"IN INCENTIVE THUNK ---> updateTrackingProgress(activeChallenges, alreadyTracking, user_id, recentRide)",
		activeChallenges,
		alreadyTracking,
		user_id,
		recentRide
	);

	let successes = [];
	let fails = [];

	try {
		for (let i = 0; i < alreadyTracking.length; i++) {
			console.log(
				"At index:",
				i,
				"of",
				alreadyTracking.length,
				"|  --> SUCCESS LOG: ",
				successes,
				"   --> FAIL LOG: ",
				fails
			);
			let insertValue;
			let trackedChallenge = alreadyTracking[i];
			const activeChallenge = activeChallenges.find(
				(challenge) =>
					challenge.id === trackedChallenge.active_incentive_id
			);
			let goalType = activeChallenge.incentives.category.unit_of_measure;
			let existingProgress = {
				row_id: trackedChallenge.id,
				progress: trackedChallenge.earned_points_toward_goal,
			};
			if (goalType === "miles") {
				insertValue =
					existingProgress.progress + recentRide.distance_traveled;
			}
			if (goalType === "rides") {
				insertValue = existingProgress.progress + 1;
			}
			console.log(
				"UpdatingTrackingProgressRecords",
				"--- Already earned",
				existingProgress.progress,
				"---------- Value to update to:",
				insertValue
			);

			try {
				const updateRecord = await supabase
					.from("user_incentive_tracking_junction")
					.update({
						earned_points_toward_goal: insertValue,
					})
					.eq("id", existingProgress.row_id)
					.select();

				if (updateRecord.error) {
					console.error(
						"SUPABASE UpdatingTrackingProgressRecords ERROR:",
						updateRecord.error
					);

					fails.push({
						status: "ERROR",
						info: {
							data: !updateRecord.data
								? "NONE"
								: updateRecord.data,
							error: updateRecord.error,
						},
					});
				} else {
					console.log(
						" SUPABASE UpdatingTrackingProgressRecords SUCCESS!",
						updateRecord.data
					);
					successes.push({
						status: "SUCCESS",
						info: {
							data: updateRecord.data,
							error: !updateRecord.error
								? "NONE"
								: updateRecord.error,
						},
					});
				}
			} catch (error) {
				console.error(
					"THUNK ERROR ---> updateTrackingProgress(activeChallenge,user_id,existingProgress,recentRide,goalType)",
					error
				);
			}
		}
		if (fails.length > 0) {
			return { data: successes, error: true, failed_updates: fails };
		} else {
			return { data: successes, error: false, failed_updates: fails };
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> updateTrackingProgress(activeChallenge,user_id,existingProgress,recentRide,goalType)",
			error
		);
	}

	// for (const trackedChallenge of alreadyTracking.data) {
	// 	const correspondingChallenge = activeChallenges.data.find(
	// 		(challenge) => challenge.id === trackedChallenge.active_incentive_id
	// 	);

	// 	try {
	// 		const updateResults = await updateTrackingProgress(
	// 			correspondingChallenge,
	// 			user_id,
	// 			existingProgress,
	// 			recentRide,
	// 			goalType
	// 		);
	// 		if (updateResults.error) {
	// 			console.log(
	// 				"UPDATE PROGRESS RESULTS DATA",
	// 				updateResults.error
	// 			);
	// 			updateLog.push({
	// 				status: "ERROR",
	// 				info: {
	// 					data: updateResults.data,
	// 					error: updateResults.error,
	// 				},
	// 			});
	// 		} else {
	// 			console.log("UPDATE PROGRESS RESULTS DATA", updateResults.data);
	// 			updateLog.push({
	// 				status: "SUCCESS",
	// 				info: {
	// 					data: updateResults.data,
	// 					error: updateResults.error,
	// 				},
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.log("Update existing tracking progress ERROR", error);
	// 	}
	// }
};

const verifyProgressCompletion = async (verifyingChallengeIds, user_id) => {
	console.log(
		"IN INCENTIVE THUNK ---> verifyProgressCompletion(verifyingChallengeIds, user_id)"
	);
	console.log(
		"VerifyingProgressCompletion of tracked challenges with active_challenge_id",
		verifyingChallengeIds,
		"for user_id",
		user_id
	);

	let progressSuccesses = [];
	let progressFails = [];

	try {
		// find tracked active challenges
		const trackedChallenges = await supabase
			.from("user_incentive_tracking_junction")
			.select("*")
			.in("active_incentive_id", verifyingChallengeIds)
			.eq("user_id", user_id);

		let tracked = trackedChallenges.data;

		console.log(
			"********tracked challenged for VerifyingProgressCompletion",
			tracked
		);

		// iterate over the tracked active challenges and update the completion_progress and has_been_met values
		for (let i = 0; i < tracked.length; i++) {
			console.log(
				"At index:",
				i,
				"of",
				tracked.length,
				"|  --> SUCCESS LOG: ",
				progressSuccesses,
				"   --> FAIL LOG: ",
				progressFails
			);
			let now = new Date();
			let challenge = tracked[i];
			let goal = challenge.incentive_goal_value;
			let earned = challenge.earned_points_toward_goal;
			let progress = earned / goal;
			let updateObject = {
				completion_progress: progress,
				has_been_met: progress >= 1 ? true : false,
				progress_last_checked: now.toISOString(),
				date_completed: progress >= 1 ? now.toISOString() : null,
			};
			try {
				console.log("VERIFYING updateObject", updateObject);
				const updateProgress = await supabase
					.from("user_incentive_tracking_junction")
					.update(updateObject)
					.eq("id", challenge.id)
					.select();

				if (updateProgress.error) {
					console.error(
						"SUPABASE VerifyingProgressCompletion ERROR!",
						updateProgress.error.message
					);
					progressFails.push({
						status: "ERROR",
						info: {
							data: updateProgress.data
								? updateProgress.data
								: "NONE",
							error: updateProgress.error,
						},
					});
				} else {
					console.log(
						"SUPABASE VerifyingProgressCompletion SUCCESS!",
						updateProgress.status,
						updateProgress.data
					);
					progressSuccesses.push({
						status: "SUCCESS",
						info: {
							data: updateProgress.data,
							error: updateProgress.error
								? updateProgress.error
								: "NONE",
						},
					});
				}
			} catch (error) {
				console.error(
					" SUPABASE VerifyingProgressCompletion try catch block ERROR",
					error
				);
			}
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> updateProgressCompletion(verifyingChallengeIds, user_id)",
			error
		);
	}
	if (progressFails.length > 0) {
		return {
			data: progressSuccesses,
			error: true,
			failed_updates: progressFails,
		};
	} else {
		return {
			data: progressSuccesses,
			error: false,
			failed_updates: progressFails,
		};
	}
};
