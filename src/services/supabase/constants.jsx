if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
	console.log(
		"From constants.jsx: ",
		"Make sure env variables are established!"
	);
}

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY =
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";
