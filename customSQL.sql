CREATE OR REPLACE FUNCTION check_challenge_completion(user_id UUID) RETURNS VOID AS $$
DECLARE recent_ride RECORD;
active_challenge RECORD;
ride_survey RECORD;
BEGIN -- Get the most recent ride data for the user
SELECT * INTO recent_ride
FROM all_rides
WHERE user_id = check_challenge_completion.user_id
ORDER BY ride_start_time DESC
LIMIT 1;
-- Check if the recent ride is not a work commute
IF recent_ride.is_work_commute = FALSE THEN -- Get the survey data for the recent ride
SELECT * INTO ride_survey
FROM ride_survey_junction
WHERE ride_id = recent_ride.id
    AND user_id = check_challenge_completion.user_id;
-- Iterate over each active incentive
FOR active_challenge IN
SELECT acj.id AS active_incentive_id,
    acj.incentive_id,
    acj.start_date,
    acj.end_date,
    i.title,
    i.point_value,
    ic.unit_of_measure,
    ic.incentive_type,
    acj.user_id AS user_id,
    acj.incentive_goal_value AS incentive_goal_value
FROM activated_incentives_junction acj
    INNER JOIN incentives i ON acj.incentive_id = i.id
    INNER JOIN incentive_categories ic ON i.category_id = ic.id
WHERE acj.user_id = check_challenge_completion.user_id
    AND acj.is_active = TRUE LOOP -- Check if the recent ride counts towards any goal of the active incentive
    IF active_challenge.unit_of_measure = 'rides' THEN -- Check if the recent ride counts toward the rides goal based on incentive_type
    IF active_challenge.incentive_type = 'Commutes to work' THEN IF recent_ride.is_work_commute = TRUE THEN IF active_challenge.start_date <= recent_ride.ride_end_time
    AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update or insert incentive progress for commutes to work
INSERT INTO user_incentive_tracking_junction (
        active_incentive_id,
        user_id,
        incentive_goal_value,
        earned_points_toward_goal,
        completion_progress,
        has_been_met
    )
VALUES (
        active_challenge.active_incentive_id,
        active_challenge.user_id,
        active_challenge.incentive_goal_value,
        1,
        100,
        TRUE
    ) ON CONFLICT (active_incentive_id, user_id) DO
UPDATE
SET earned_points_toward_goal = user_incentive_tracking_junction.earned_points_toward_goal + 1,
    completion_progress = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + 1
        ) >= active_challenge.incentive_goal_value THEN 100
        ELSE (
            (
                user_incentive_tracking_junction.earned_points_toward_goal + 1
            ) * 100
        ) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + 1
        ) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END;
END IF;
END IF;
ELSEIF active_challenge.incentive_type = 'Replace VMT - Any'
OR (
    active_challenge.incentive_type = 'Ride in a group'
    AND ride_survey.is_solo = FALSE
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Errands'
    AND ride_survey.destination_type = 'Errands (grocery store, post office, etc)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Recreational Location'
    AND ride_survey.destination_type = 'A place for recreation (local park, landmark, or trail)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Social Location'
    AND ride_survey.destination_type = 'A place for socializing (a restaurant, bar, library)'
)
OR (
    active_challenge.incentive_type = 'Take a Bike Trail'
    AND ride_survey.route_type = 'Bike Trail'
)
OR (
    active_challenge.incentive_type = 'Use a Bike Lane'
    AND ride_survey.route_type = 'Bike Lane'
) THEN IF active_challenge.start_date <= recent_ride.ride_end_time
AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update or insert incentive progress for rides goal
INSERT INTO user_incentive_tracking_junction (
        active_incentive_id,
        user_id,
        incentive_goal_value,
        earned_points_toward_goal,
        completion_progress,
        has_been_met
    )
VALUES (
        active_challenge.active_incentive_id,
        active_challenge.user_id,
        active_challenge.incentive_goal_value,
        1,
        100,
        TRUE
    ) ON CONFLICT (active_incentive_id, user_id) DO
UPDATE
SET earned_points_toward_goal = user_incentive_tracking_junction.earned_points_toward_goal + 1,
    completion_progress = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + 1
        ) >= active_challenge.incentive_goal_value THEN 100
        ELSE (
            (
                user_incentive_tracking_junction.earned_points_toward_goal + 1
            ) * 100
        ) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + 1
        ) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END;
END IF;
END IF;
END IF;
ELSIF active_challenge.unit_of_measure = 'miles' THEN -- Check if the recent ride counts toward the miles goal based on incentive_type
IF active_challenge.incentive_type = 'Replace VMT - Any'
OR (
    active_challenge.incentive_type = 'Ride in a group'
    AND ride_survey.is_solo = FALSE
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Errands'
    AND ride_survey.destination_type = 'Errands (grocery store, post office, etc)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Recreational Location'
    AND ride_survey.destination_type = 'A place for recreation (local park, landmark, or trail)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Social Location'
    AND ride_survey.destination_type = 'A place for socializing (a restaurant, bar, library)'
)
OR (
    active_challenge.incentive_type = 'Take a Bike Trail'
    AND ride_survey.route_type = 'Bike Trail'
)
OR (
    active_challenge.incentive_type = 'Use a Bike Lane'
    AND ride_survey.route_type = 'Bike Lane'
) THEN IF active_challenge.start_date <= recent_ride.ride_end_time
AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update or insert incentive progress for miles goal
INSERT INTO user_incentive_tracking_junction (
        id,
        active_incentive_id,
        user_id,
        incentive_goal_value,
        earned_points_toward_goal,
        completion_progress,
        has_been_met
    )
VALUES (
        DEFAULT,
        active_challenge.active_incentive_id,
        active_challenge.user_id,
        active_challenge.incentive_goal_value,
        recent_ride.distance_traveled,
        100,
        TRUE
    ) ON CONFLICT (active_incentive_id, user_id) DO
UPDATE
SET earned_points_toward_goal = user_incentive_tracking_junction.earned_points_toward_goal + recent_ride.distance_traveled,
    completion_progress = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + recent_ride.distance_traveled
        ) >= active_challenge.incentive_goal_value THEN 100
        ELSE (
            (
                user_incentive_tracking_junction.earned_points_toward_goal + recent_ride.distance_traveled
            ) * 100
        ) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (
            user_incentive_tracking_junction.earned_points_toward_goal + recent_ride.distance_traveled
        ) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END;
END IF;
END IF;
END IF;
END IF;
END LOOP;
END IF;
END;
$$ LANGUAGE plpgsql;


--------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION check_challenge_completion(user_id INTEGER) RETURNS VOID AS $$
DECLARE recent_ride RECORD;
active_challenge RECORD;
ride_survey RECORD;
BEGIN -- Get the most recent ride data for the user
SELECT * INTO recent_ride
FROM all_rides
WHERE user_id = check_challenge_completion.user_id
ORDER BY ride_start_time DESC
LIMIT 1;
-- Check if the recent ride is not a work commute
IF recent_ride.is_work_commute = FALSE THEN -- Get the survey data for the recent ride
SELECT * INTO ride_survey
FROM ride_survey_junction
WHERE ride_id = recent_ride.id
    AND user_id = check_challenge_completion.user_id;
-- Iterate over each active incentive
FOR active_challenge IN
SELECT acj.id AS active_incentive_id,
    acj.incentive_id,
    acj.start_date,
    acj.end_date,
    i.title,
    i.point_value,
    ic.unit_of_measure,
    ic.incentive_type,
    acj.user_id AS user_id,
    acj.incentive_goal_value AS incentive_goal_value
FROM activated_incentives_junction acj
    INNER JOIN incentives i ON acj.incentive_id = i.id
    INNER JOIN incentive_categories ic ON i.category_id = ic.id
WHERE acj.user_id = check_challenge_completion.user_id
    AND acj.is_active = TRUE LOOP -- Check if the recent ride counts towards any goal of the active incentive
    IF active_challenge.unit_of_measure = 'rides' THEN -- Check if the recent ride counts toward the rides goal based on incentive_type
    IF active_challenge.incentive_type = 'Commutes to work' THEN IF recent_ride.is_work_commute = TRUE THEN IF active_challenge.start_date <= recent_ride.ride_end_time
    AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update incentive progress for commutes to work
UPDATE user_incentive_tracking_junction
SET earned_points_toward_goal = earned_points_toward_goal + 1,
    completion_progress = CASE
        WHEN (earned_points_toward_goal + 1) >= active_challenge.incentive_goal_value THEN 100
        ELSE ((earned_points_toward_goal + 1) * 100) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (earned_points_toward_goal + 1) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END
WHERE id = active_challenge.active_incentive_id
    AND user_id = active_challenge.user_id;
END IF;
END IF;
ELSEIF active_challenge.incentive_type = 'Replace VMT - Any'
OR (
    active_challenge.incentive_type = 'Ride in a group'
    AND ride_survey.is_solo = FALSE
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Errands'
    AND ride_survey.destination_type = 'Errands (grocery store, post office, etc)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Recreational Location'
    AND ride_survey.destination_type = 'A place for recreation (local park, landmark, or trail)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Social Location'
    AND ride_survey.destination_type = 'A place for socializing (a restaurant, bar, library)'
)
OR (
    active_challenge.incentive_type = 'Take a Bike Trail'
    AND ride_survey.route_type = 'Bike Trail'
)
OR (
    active_challenge.incentive_type = 'Use a Bike Lane'
    AND ride_survey.route_type = 'Bike Lane'
) THEN IF active_challenge.start_date <= recent_ride.ride_end_time
AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update incentive progress for rides goal
UPDATE user_incentive_tracking_junction
SET earned_points_toward_goal = earned_points_toward_goal + 1,
    completion_progress = CASE
        WHEN (earned_points_toward_goal + 1) >= active_challenge.incentive_goal_value THEN 100
        ELSE ((earned_points_toward_goal + 1) * 100) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (earned_points_toward_goal + 1) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END
WHERE id = active_challenge.active_incentive_id
    AND user_id = active_challenge.user_id;
END IF;
END IF;
END IF;
ELSIF active_challenge.unit_of_measure = 'miles' THEN -- Check if the recent ride counts toward the miles goal based on incentive_type
IF active_challenge.incentive_type = 'Replace VMT - Any'
OR (
    active_challenge.incentive_type = 'Ride in a group'
    AND ride_survey.is_solo = FALSE
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Errands'
    AND ride_survey.destination_type = 'Errands (grocery store, post office, etc)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Recreational Location'
    AND ride_survey.destination_type = 'A place for recreation (local park, landmark, or trail)'
)
OR (
    active_challenge.incentive_type = 'Replace VMT for Social Location'
    AND ride_survey.destination_type = 'A place for socializing (a restaurant, bar, library)'
)
OR (
    active_challenge.incentive_type = 'Take a Bike Trail'
    AND ride_survey.route_type = 'Bike Trail'
)
OR (
    active_challenge.incentive_type = 'Use a Bike Lane'
    AND ride_survey.route_type = 'Bike Lane'
) THEN IF active_challenge.start_date <= recent_ride.ride_end_time
AND active_challenge.end_date > recent_ride.ride_end_time THEN -- Update incentive progress for miles goal
UPDATE user_incentive_tracking_junction
SET earned_points_toward_goal = earned_points_toward_goal + recent_ride.distance_traveled / 1609.34,
    completion_progress = CASE
        WHEN (
            earned_points_toward_goal + recent_ride.distance_traveled / 1609.34
        ) >= active_challenge.incentive_goal_value THEN 100
        ELSE (
            (
                earned_points_toward_goal + recent_ride.distance_traveled / 1609.34
            ) * 100
        ) / active_challenge.incentive_goal_value
    END,
    has_been_met = CASE
        WHEN (
            earned_points_toward_goal + recent_ride.distance_traveled / 1609.34
        ) >= active_challenge.incentive_goal_value THEN TRUE
        ELSE FALSE
    END
WHERE id = active_challenge.active_incentive_id
    AND user_id = active_challenge.user_id;
END IF;
END IF;
END IF;
END IF;
END LOOP;
END IF;
END;
$$ LANGUAGE plpgsql;