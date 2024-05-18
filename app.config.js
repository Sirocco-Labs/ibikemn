import 'dotenv/config'

export default {
	expo: {
		extra: {
			SUPABASE_URL:
				process.env.NODE_ENV === "production"
					? process.env.SUPABASE_URL
					: process.env.EXPO_PUBLIC_SUPABASE_URL,
			SUPABASE_ANON_KEY:
				process.env.NODE_ENV === "production"
					? process.env.SUPABASE_ANON_KEY
					: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
		},
	},
	// expo: {
	// 	extra: {
	// 		SUPABASE_URL:
	// 			process.env.EXPO_PUBLIC_SUPABASE_URL ||
	// 			process.env.SUPABASE_URL,
	// 		SUPABASE_ANON_KEY:
	// 			process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
	// 			process.env.SUPABASE_ANON_KEY,
	// 	},
	// },
};