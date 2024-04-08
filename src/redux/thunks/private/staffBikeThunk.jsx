import { supabase } from "../../../services/supabase/supabase";
import { setOrgBikes } from "../../slices/private/orgBikeSlice";
import { clearMyBike, setMyBike } from "../../slices/private/staffBikeSlice";

export const getAllBikes = () => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> getAllBikes(): ", bikeData);
	try {
		const selectAllBikes = await supabase
			.from("bike_registration_junction")
			.select("*");

		if (selectAllBikes.error) {
			console.log(
				"SUPABASE SELECT ALL BIKES ERROR!: ",
				selectAllBikes.error
			);
		} else {
			console.log(
				"SUPABASE SELECT ALL BIKES SUCCESS!: ",
				selectAllBikes.data
			);
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> getAllBikes(bikeData): ", error);
	}
};

export const adminGetBikesInUse = () => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> adminGetBikesInUse(): ");
	try {
		const getBikesInUse = await supabase
			.from("bike_registration_junction")
			.select("*");

		if (getBikesInUse.error) {
			console.log(
				"SUPABASE ADMIN SELECT ALL ORG BIKES ERROR!: ",
				getBikesInUse.error
			);
		} else {
			console.log(
				"SUPABASE ADMIN SELECT ALL ORG BIKES SUCCESS!: ",
				getBikesInUse.data
			);
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> adminGetBikesInUse(): ", error);
	}
};
export const staffGetBikes = (org_id) => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> staffGetBikes(org_id): ", org_id);
	try {
		const staffGetFreeBikes = await supabase
			.from("bike_registration_junction")
			.select("*")
			.eq("org_id", org_id)
			.order("in_use", { descending: true })
			.order("id", { ascending: true });
		if (staffGetFreeBikes.error) {
			console.log(
				"SUPABASE STAFF GET ORG BIKES ERROR!: ",
				staffGetFreeBikes.error
			);
		} else {
			console.log(
				"SUPABASE STAFF GET ORG BIKES SUCCESS!: ",
				staffGetFreeBikes.data
			);
			const orgBikes = staffGetFreeBikes.data;
			dispatch(setOrgBikes(orgBikes));
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> staffGetFreeBikes(org_id): ", error);
	}
};

export const getMyBike = (user_id) => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> getMyBike(user_id): ", user_id);
	try {
		const selectMyBike = await supabase
			.from("bike_registration_junction")
			.select("*")
			.eq("checked_out_by", user_id)
			.single();
		if (selectMyBike.error) {
			console.log("SUPABASE SELECT MY BIKE ERROR!: ", selectMyBike.error);
            dispatch(clearMyBike())
		} else {
			console.log(
				"SUPABASE SELECT MY BIKE SUCCESS!: ",
				selectMyBike.data
			);
			const myBike = selectMyBike.data;
			dispatch(setMyBike(myBike));
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> getMyBike(user_id): ", error);
	}
};

export const addToBigBikeList = (bikeData) => async (dispatch) => {
	console.log(
		"IN STAFF BIKE THUNK ----> addToBigBikeList(bikeData): ",
		bikeData
	);
	try {
		const bikeInsert = await supabase.from("bikes").insert(bikeData);

		if (bikeInsert.error) {
			console.log(
				"SUPABASE INSERT TO BIG BIKE LIST ERROR!: ",
				bikeInsert.error
			);
		} else {
			console.log(
				"SUPABASE INSERT TO BIG BIKE LIST SUCCESS!: ",
				bikeInsert.data
			);
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> addToBigBikeList(bikeData): ", error);
	}
};

export const checkoutBike = (bikeData) => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> checkoutBike(bikeData): ", bikeData);
	const { checked_out_by, in_use, check_out_date, return_by, bike_id, id } =
		bikeData;
	const updateData = { checked_out_by, in_use, check_out_date, return_by };
	try {
		const reserveBike = await supabase
			.from("bike_registration_junction")
			.update(updateData)
			.match({ id: id });

		if (reserveBike.error) {
			console.log("SUPABASE CHECKOUT BIKE ERROR!: ", reserveBike.error);
		} else {
			console.log("SUPABASE CHECKOUT BIKE SUCCESS!: ", reserveBike.data);
			dispatch(getMyBike(checked_out_by));
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> checkoutBike(bikeData): ", error);
	}
};

export const returnBike = (bikeData) => async (dispatch) => {
	console.log("IN STAFF BIKE THUNK ----> returnBike(bikeData): ", bikeData);
    const{bike_id, org_id} = bikeData
	try {
		const returnBike = await supabase
			.from("bike_registration_junction")
			.update({
				checked_out_by: null,
				in_use: false,
				check_out_date: null,
				return_by: null,
			})
			.match({ bike_id: bike_id });

		if (returnBike.error) {
			console.log("SUPABASE RETURN BIKE ERROR!: ", returnBike.error);
		} else {
			console.log("SUPABASE RETURN BIKE SUCCESS!: ", returnBike.data);
            dispatch(clearMyBike());
            dispatch(staffGetBikes(org_id))
		}
	} catch (error) {
		console.log("BIKE THUNK ERROR --> returnBike(bikeData): ", error);
	}
};
