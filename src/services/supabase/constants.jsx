// if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_URL) {
// 	console.error(
// 		"From constants.jsx: ",
// 		"Make sure env variables are established!",
// 	);
// }

if(process.env.NODE_ENV === "development"){
	console.warn(process.env.NODE_ENV);
}

export const SUPABASE_URL =
	process.env.NODE_ENV === "development"
		? process.env.EXPO_PUBLIC_SUPABASE_URL
		: process.env.EXPO_PUBLIC_PROD_SUPABASE_URL;

export const SUPABASE_ANON_KEY =
	process.env.NODE_ENV === "development"
		? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
		: process.env.EXPO_PUBLIC_PROD_SUPABASE_ANON_KEY;
