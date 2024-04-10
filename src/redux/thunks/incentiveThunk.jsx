import { getAllUserRides } from "./userRidesThunk";

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

export const getUserIncentiveProgress = (user_id) => async (dispatch) => {};
export const getActiveIncentives = () => async (dispatch) => {};
export const getAllIncentives = () => async (dispatch) => {};
export const updateUserIncentiveProgress = (rideData) => async (dispatch) => {};
