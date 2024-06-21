import { supabase } from "../../services/supabase/supabase";
import { setRewardStatus } from "../slices/incentiveSlice";

export const getRewardStatus = (userInfo) => async (dispatch) => {
	const { user_id, users_table_id } = userInfo;
	console.log("IN REWARD THUNK ---> getRewardStatus(userInfo)", userInfo);
	try {
		const rewardInfo = await supabase
			.from("reward_lottery_junction")
			.select(
				`
            id,
            users_table_id,
            active_incentive_id,
            tracking_table_id,
            tracking_info:tracking_table_id(
                is_rewarded
            ),
            challenge_info:active_incentive_id(
                reward_photo,
                reward_description,
                reward_claimed
            ),
            claim_started,
            reward_claimed,
            date_claimed
            `
			)
			.match({ users_table_id: users_table_id, reward_claimed: false });
		// .eq("users_table_id", users_table_id)
		// .eq("reward_claimed", false);
		if (rewardInfo.error) {
			console.error(
				"SUPABASE GET REWARD STATUS ERROR!!:",
				rewardInfo.error
			);
		} else {
			console.error(
				"SUPABASE GET REWARD STATUS SUCCESS!!:",
				rewardInfo.status,
				rewardInfo.data
			);
			dispatch(setRewardStatus(rewardInfo.data));
		}
	} catch (error) {
		console.error(
			"REWARD THUNK ERROR ---> getRewardStatus(userInfo)",
			error
		);
	}
};
export const getWinningInfo = (userId) => async (dispatch) => {
	// const { user_id, id } = userInfo;
	console.log("IN REWARD THUNK ---> getWinningInfo(userId)", userId);
	try {
		const rewardInfo = await supabase
			.from("activated_incentives_junction")
			.select(
				`
            id,
            incentive_id,
            reward_photo,
            reward_description,
            reward_claimed,
            incentive_info:incentive_id(
                title,
                description

            )
            `
			)
			.match({ reward_recipient_id: userId, reward_claimed: false });
		// .eq("users_table_id", users_table_id)
		// .eq("reward_claimed", false);
		if (rewardInfo.error) {
			console.error(
				"SUPABASE GET REWARD STATUS ERROR!!:",
				rewardInfo.error
			);
			dispatch(setRewardStatus([]));
		} else {
			console.log(
				"SUPABASE GET REWARD STATUS SUCCESS!!:",
				rewardInfo.status,
				rewardInfo.data
			);
			dispatch(setRewardStatus(rewardInfo.data));
		}
	} catch (error) {
		console.error("REWARD THUNK ERROR ---> getWinningInfo(userId)", error);
	}
};

// {
// 		challenge_id:'',
// 		status:'',
// 		is_claimed:'',
// 		date_claimed:'',
// 		contact:'',
// 	}
