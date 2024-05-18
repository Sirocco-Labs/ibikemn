import Constants from "expo-constants";

if (
	!Constants?.expoConfig?.extra?.SUPABASE_URL ||
	!Constants?.expoConfig?.extra?.SUPABASE_ANON_KEY
) {
	console.error(
		"From constants.jsx: ",
		"Make sure env variables are established!"
	);
}
// if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_URL) {
// 	console.error(
// 		"From constants.jsx: ",
// 		"Make sure env variables are established!"
// 	);
// }

export const SUPABASE_URL = Constants?.expoConfig?.extra?.SUPABASE_URL;
// process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY =
	Constants?.expoConfig?.extra?.SUPABASE_ANON_KEY;
// process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
