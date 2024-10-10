import { supabase } from "../../services/supabase/supabase";
import {
	setActiveIncentives,
	setIncentivesHistory,
	setIncentivesProgress,
	setAllPreviousIncentives,
	setIsProgressUpdated,
	setTimeOfProgressUpdate,
} from "../slices/incentiveSlice";

export const getAllPreviousChallenges = (is_public) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> getAllPreviousChallenges(is_public)",
		is_public
	);
	let condition = { is_active: false };
	if (is_public) {
		condition = { is_active: false, is_public: is_public };
	}
	try {
		const challengeHistory = await supabase
			.from("activated_incentives_junction")
			.select(
				`
                id,
                start_date,
                end_date,
                created_at,
				is_public,
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
			.match(condition)
			.order("end_date", { ascending: true });
		if (challengeHistory.error) {
			console.error(
				"SUPABASE GET ALL CHALLENGE HISTORY ERROR",
				challengeHistory.error
			);
		} else {
			console.log(
				"SUPABASE GET ALL CHALLENGE HISTORY SUCCESS",
				challengeHistory.status,
				challengeHistory.data
			);
			dispatch(setAllPreviousIncentives(challengeHistory.data));
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> getAllPreviousChallenges(is_public)",
			error
		);
	}
};
export const getUserIncentiveHistory = (user_id) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> getUserIncentiveHistory(user_id)",
		user_id
	);
	try {
		const challengeHistory = await supabase
			.from("user_incentive_tracking_junction")
			.select(
				`
			id,
			active_incentive_id,
			incentive_goal_value,
			earned_points_toward_goal,
			completion_progress,
			has_been_met,
			date_completed,
			activated_incentives_junction(
					id,
                    is_active,
				incentive_id(
					id,
					title,
					description,
					category: category_id(
						unit_of_measure
					)
			)
			)
			`
			)
			.eq("user_id", user_id)
			.eq("activated_incentives_junction.is_active", false);
		// match({
		// 	user_id: user_id,
		// 	"activated_incentives_junction.is_active": false,
		// });
		if (challengeHistory.error) {
			console.error(
				"SUPABASE GET USER CHALLENGE HISTORY ERROR",
				challengeHistory.error
			);
		} else {
			console.log(
				"SUPABASE GET USER CHALLENGE HISTORY SUCCESS",
				challengeHistory.status,
				challengeHistory.data
			);
			let withoutNulls = challengeHistory.data.filter(
				(item) => item.activated_incentives_junction !== null
			);
			console.log(
				"SUPABASE GET USER CHALLENGE HISTORY WITHOUT NULLS",
				withoutNulls
			);
			dispatch(setIncentivesHistory(withoutNulls));
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> getUserIncentiveHistory(user_id)",
			error
		);
	}
};

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
                created_at,
				promo_video,
				reward_photo,
				reward_description,
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
			// .lte("start_date", new Date().toISOString())
			.match(condition)
			.order("end_date", { ascending: true });

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
				promo_video,
				reward_photo,
				reward_description,
				is_active,
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
			.eq("user_id", user_id)
			// .eq("has_been_met", false)
			.eq("active_challenge.is_active", true)
			.order("id", { ascending: true });

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
			const filteredProgress = getUserProgress.data.filter(
				(row) => row.active_challenge !== null
			);
			console.log(
				"SUPABASE GET USER CHALLENGE PROGRESS SUCCESS! FILTERED PROGRESS: ",
				filteredProgress
			);
			dispatch(setIncentivesProgress(filteredProgress));
			// dispatch(setIncentivesProgress(getUserProgress.data));
			// (FIND ME)
		}
	} catch (error) {
		console.error(
			"INCENTIVE THUNK ERROR ---> getUserIncentiveProgress(user_id)",
			error
		);
	} finally {
		dispatch(setIsProgressUpdated(true));
	}
};
export const checkChallengeCompletion = (userInfo) => async (dispatch) => {
	console.log(
		"IN INCENTIVE THUNK ---> checkChallengeCompletion(userInfo)",
		userInfo
	);
	const { publicUser, user_id, users_table_id } = userInfo;
	dispatch(setIsProgressUpdated(false));
	let proceed = false;

	try {
		let recentRide;
		// Get the most recent ride data for the user

		const findRide = await supabase
			.from("all_rides")
			.select("*")
			.match({ user_id: user_id })
			.order("id", { ascending: false })
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
		let activeChallenges;
		if (publicUser) {
			condition = { is_active: true, is_public: true };
			// Iterate over each active incentive
			activeChallenges = await supabase
				.from("activated_incentives_junction")
				.select(
					`
                id,
                start_date,
                end_date,
                incentive_id,
                incentives: incentive_id(
                    id,
                    title,
                    point_value,
                    category_id,
                    category: category_id(
                        id,
                        unit_of_measure,
                        incentive_type
                    )
                )
                `
				)
				.lte("start_date", recentRide.ride_end_time)
				.gt("end_date", recentRide.ride_end_time)
				// .match(condition)
				.eq("is_active", true)
				.eq("is_public", true)
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
		} else {
			condition = { is_active: true };
			// Iterate over each active incentive
			activeChallenges = await supabase
				.from("activated_incentives_junction")
				.select(
					`
                id,
                start_date,
                end_date,
                incentive_id,
                incentives: incentive_id(
                    id,
                    title,
                    point_value,
                    category_id,
                    category: category_id(
                        id,
                        unit_of_measure,
                        incentive_type
                    )
                )
                `
				)
				.lte("start_date", recentRide.ride_end_time)
				.gt("end_date", recentRide.ride_end_time)
				// .match(condition)
				.eq("is_active", true)
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
		}
		console.log("THIS IS THE CONDITION:", condition);

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
		// FIND ME!!!
		// The first time through there shouldn't be any already tracked challenges.
		// alreadyTracking should be an empty array
		const alreadyTracking = await supabase
			.from("user_incentive_tracking_junction")
			.select(
				`
            id,
            active_incentive_id,
            active_challenge: active_incentive_id(
                id,
                incentive_id,
                incentives:incentive_id(
                    id,
                    category_id,
                    category:category_id(
                        id,
                        incentive_type,
                        unit_of_measure
                    ),
                    point_value
                ),
                is_active,
                start_date,
                end_date
            ),
            user_id,
            incentive_goal_value,
            earned_points_toward_goal,
            completion_progress,
            has_been_met,
            date_completed,
            progress_last_checked


            `
			)
			.in("active_incentive_id", verifyingChallengeIds)
			.eq("user_id", user_id)
			// .eq("has_been_met", false)
			// .lt("completion_progress", 1)
			// FIND ME!!! ^^^^^
			.eq("active_challenge.is_active", true)
			.order("id", { ascending: true });

		if (alreadyTracking.error) {
			console.error(
				"SUPABASE GET USER PROGRESS FROM ACTIVE CHALLENGES ERROR:",
				alreadyTracking.error
			);

			throw alreadyTracking.error;
		} else {
			console.log(
				"SUPABASE GET USER PROGRESS FOR NON COMPLETE ACTIVE CHALLENGES SUCCESS:",
				alreadyTracking.data
			);
			console.log(
				"NUMBER OF NON COMPLETE ACTIVE CHALLENGES ALREADY BEING TRACKED:",
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
		// SHOULD BE SKIPPED ON THE FIRST PASS
		if (alreadyTracking.data.length > 0) {
			// Update existing tracking progress for tracked challenges
			console.log(
				"******** ALREADY TRACKED CHALLENGES",
				alreadyTracking.data
			);
			try {
				// FILTERING FOR ALREADY TRACKED BUT NOT COMPLETE
				const nonCompletedChallenges = alreadyTracking.data.filter(
					(challenge) => challenge.has_been_met === false
				);
				console.log(
					"******** CREATING UPDATE RECORDS FOR ALREADY TRACKED BUT NOT YET COMPLETED CHALLENGES",
					nonCompletedChallenges
				);
				const updateLogData = await updateTrackingProgress(
					nonCompletedChallenges,
					user_id,
					users_table_id,
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
						// FIND ME!!!!!!!!!
					)
			);
			console.log(
				"******** UNTRACKED CHALLENGES",
				untrackedChallenges
			);

			// Create tracking progress for untracked challenges
			// SHOULD BE HELPING TO COVER FOR PROGRESS ON...
			// UNTRACKED BUT NOT COMPLETE CHALLENGES DURING AN UPDATE CYCLE
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
			user_id,
			users_table_id
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
		proceed = true;
		// (FIND ME)
		dispatch(setTimeOfProgressUpdate(now.toISOString()));
		console.log("%$%$PROCEED IN TRY BLOCK", proceed);
	} catch (error) {
		console.error(
			"THUNK ERROR ---> checkChallengeCompletion(userInfo):",
			error.message
		);
	} finally {
		console.log("%$%$PROCEED IN FINALLY BLOCK", proceed);
		if (proceed) {
			dispatch(getUserIncentiveProgress(user_id));
		}
	}
};

const insertTrackingProgress = async (
	activeChallenges,
	user_id,
	recentRide
) => {
	console.log(
		"IN INCENTIVE THUNK ---> insertTrackingProgress(activeChallenges, user_id, recentRide)",
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
				if (recentRide.is_work_commute) {
					if (
						incentiveType === "Replace VMT - Any" ||
						incentiveType === "Commutes to work"
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
				} else {
					if (
						incentiveType === "Replace VMT - Any" ||
						//
						(incentiveType === "Ride in a group" &&
							recentRide.survey.is_solo === false) ||
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
							recentRide.survey.route_type === "Bike trail") ||
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
								"INSERT RECORD FOR RIDE CHALLENGE TYPE ERROR",
								error
							);
						}
					}
				}
			} else if (goalType === "miles" && !recentRide.is_work_commute) {
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
						recentRide.survey.is_solo === false) ||
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
						recentRide.survey.route_type === "Bike trail") ||
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
	alreadyTracking,
	user_id,
	users_table_id,
	recentRide
) => {
	console.log(
		"IN INCENTIVE THUNK ---> updateTrackingProgress(alreadyTracking, user_id, recentRide)",
		alreadyTracking,
		user_id,
		users_table_id,
		recentRide
	);
	console.log("UPDATE RECORDS");

	let successes = [];
	let fails = [];

	try {
		for (let i = 0; i < alreadyTracking.length; i++) {
			let insertValue;
			let trackedChallenge;
			let goalType;
			let incentiveType;
			console.log("AT INDEX", i, "********SUCCESS LOG", successes);
			console.log("NUMBER OF SUCCESSFUL UPDATES:", successes.length);

			console.log("AT INDEX", i, "********FAIL LOG", fails);
			console.log("NUMBER OF FAILED UPDATES:", fails.length);

			trackedChallenge = alreadyTracking[i];
			goalType =
				trackedChallenge.active_challenge.incentives.category
					.unit_of_measure;
			incentiveType =
				trackedChallenge.active_challenge.incentives.category
					.incentive_type;

			// Check if the recent ride counts towards any goal of the active incentive
			if (goalType === "rides") {
				insertValue = trackedChallenge.earned_points_toward_goal + 1;
				console.log(
					" --------> GOAL TYPE",
					goalType,
					"AT INDEX",
					i,
					"RECENT RIDE",
					recentRide,
					" --------> ALREADY TRACKED",
					alreadyTracking,
					" --------> INCENTIVE TYPE",
					incentiveType
				);
				// Check if the recent ride counts toward the rides goal based on incentive_type
				if (recentRide.is_work_commute) {
					if (
						incentiveType === "Replace VMT - Any" ||
						(incentiveType === "Commutes to work" &&
							recentRide.is_work_commute)
					) {
						// insert incentive progress for commutes to work
						try {
							const updateRecord = await supabase
								.from("user_incentive_tracking_junction")
								.update({
									earned_points_toward_goal: insertValue,
								})
								.eq("id", trackedChallenge.id)
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
								"ERROR UPDATING RECORD FOR RIDES TYPE TRACKED CHALLENGE ",
								error
							);
						}
					}
				} else {
					if (
						incentiveType === "Replace VMT - Any" ||
						//
						(incentiveType === "Ride in a group" &&
							recentRide.survey.is_solo === false) ||
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
							recentRide.survey.route_type === "Bike trail") ||
						//
						(incentiveType === "Use a Bike Lane" &&
							recentRide.survey.route_type ===
								"On road infrastructure (a bike lane, cycle track)")
					) {
						try {
							const updateRecord = await supabase
								.from("user_incentive_tracking_junction")
								.update({
									earned_points_toward_goal: insertValue,
								})
								.eq("id", trackedChallenge.id)
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
								"ERROR UPDATING RECORD FOR RIDES TYPE TRACKED CHALLENGE ",
								error
							);
						}
					}
				}
			} else if (goalType === "miles") {
				insertValue =
					trackedChallenge.earned_points_toward_goal +
					recentRide.distance_traveled;
				console.log(
					" --------> GOAL TYPE",
					goalType,
					"AT INDEX",
					i,
					"RECENT RIDE",
					recentRide,
					" --------> ALREADY TRACKED",
					alreadyTracking,
					" --------> INCENTIVE TYPE",
					incentiveType
				);

				// Check if the recent ride counts toward the miles goal based on.incentives.category.incentive_type
				if (!recentRide.is_work_commute) {
					if (
						incentiveType === "Replace VMT - Any" ||
						//
						(incentiveType === "Ride in a group" &&
							recentRide.survey.is_solo === false) ||
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
							recentRide.survey.route_type === "Bike trail") ||
						//
						(incentiveType === "Use a Bike Lane" &&
							recentRide.survey.route_type ===
								"On road infrastructure (a bike lane, cycle track)")
					) {
						try {
							const updateRecord = await supabase
								.from("user_incentive_tracking_junction")
								.update({
									earned_points_toward_goal: insertValue,
								})
								.eq("id", trackedChallenge.id)
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
								"ERROR UPDATING RECORD FOR MILES TYPE TRACKED CHALLENGE ",
								error
							);
						}
					}
				}
			}
		}
	} catch (error) {
		console.error(
			"THUNK ERROR ---> updateTrackingProgress(alreadyTracking, user_id, recentRide)",
			error
		);
	}

	if (fails.length > 0) {
		return { data: successes, error: true, failed_updates: fails };
	} else {
		return {
			data: successes,
			error: false,
			failed_updates: fails,
		};
	}
};

const verifyProgressCompletion = async (
	verifyingChallengeIds,
	user_id,
	users_table_id
) => {
	console.log(
		"IN INCENTIVE THUNK ---> verifyProgressCompletion(verifyingChallengeIds, user_id, users_table_id)"
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
			.match({ user_id: user_id, has_been_met: false });
		// .eq("user_id", user_id);

		// skip where has_been_met is true (FIND ME!!)

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
				completion_progress: progress >= 1 ? 1 : progress,
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
					if (updateProgress.data.has_been_met) {
						const addToPool = await supabase
							.from("reward_lottery_junction")
							.insert({
								users_table_id,
								active_incentive_id:
									tracked.active_incentive_id,
							})
							.select();
						if (addToPool.error) {
							console.error(
								"SUPABASE ADD TO REWARD POOL ERROR!:",
								addToPool.error.message
							);
						} else {
							console.log(
								"SUPABASE ADD TO REWARD POOL SUCCESS!:",
								addToPool.status,
								addToPool.data
							);
						}
					}
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
