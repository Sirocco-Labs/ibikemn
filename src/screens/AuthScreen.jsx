import { Button } from "@rneui/themed";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { View, Platform } from "react-native";
// import * as AppleAuthentication from "expo-apple-authentication";

// import {
// 	GoogleSignin,
// 	GoogleSigninButton,
// 	statusCodes,
// } from "@react-native-google-signin/google-signin";

import { supabase } from "../services/supabase/supabase";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url) => {
	const { params, errorCode } = QueryParams.getQueryParams(url);

	if (errorCode) {
		throw new Error(errorCode);
	}
	const { access_token, refresh_token } = params;

	if (!access_token) {
		return;
	}
	const { data, error } = await supabase.auth.seSession({
		access_token,
		refresh_token,
	});

	if (error) {
		throw error;
	}
	return data.session;
};

const oAuthSignIn = async () => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: "",
		options: {
			redirectTo,
			skipBrowserRedirect: true,
		},
	});
	if (error) throw error;

	const res = await WebBrowser.openAuthSessionAsync(
		data?.url ?? "",
		redirectTo
	);

	if (res.type === "success") {
		const { url } = res;
		await createSessionFromUrl(url);
	}
};

const sendMagicLink = async () => {
	const { error } = await supabase.auth.signInWithOtp({
		email: "example@email.com",
		options: {
			emailRedirectTo: redirectTo,
		},
	});

	if (error) throw error;
	// Email sent.
};

// const appleSignIn = async () => {
//     try {
// 		const credential = await AppleAuthentication.signInAsync({
// 			requestedScopes: [
// 				AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
// 				AppleAuthentication.AppleAuthenticationScope.EMAIL,
// 			],
// 		});
// 		// Sign in via Supabase Auth.
// 		if (credential.identityToken) {
// 			const {
// 				error,
// 				data: { user },
// 			} = await supabase.auth.signInWithIdToken({
// 				provider: "apple",
// 				token: credential.identityToken,
// 			});
// 			console.log(JSON.stringify({ error, user }, null, 2));
// 			if (!error) {
// 				// User is signed in.
// 			}
// 		} else {
// 			throw new Error("No identityToken.");
// 		}
// 	} catch (e) {
// 		if (e.code === "ERR_REQUEST_CANCELED") {
// 			// handle that the user canceled the sign-in flow
// 		} else {
// 			// handle other errors
// 		}
// 	}

// }

// const googleSignIn = async () =>{
//     try {
//           await GoogleSignin.hasPlayServices()
//           const userInfo = await GoogleSignin.signIn()
//           if (userInfo.idToken) {
//             const { data, error } = await supabase.auth.signInWithIdToken({
//               provider: 'google',
//               token: userInfo.idToken,
//             })
//             console.log(error, data)
//           } else {
//             throw new Error('no ID token present!')
//           }
//         } catch (error) {
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//           } else {
//             // some other error happened
//           }
//         }

// }


export default function AuthScreen() {
    // const [os, setOS] =  useState(null);
    // useEffect(()=>{
    //     if(Platform.OS === 'ios'){
    //         setOS(Platform.OS)
    //     }
    // },[os])


	const url = Linking.useURL();
	if (url) {
		createSessionFromUrl(url);
	}

	return (
		<View>
			<Button
            buttonStyle={{marginVertical:10}}
            title={"oAuth"} onPress={oAuthSignIn} />
			<Button title={"Magic Link"} onPress={sendMagicLink} />
			{/* {os && <Button title={"Sign In With Apple"} onPress={appleSignIn} />}
			<Button title={"Sign In With Google"} onPress={googleSignIn} /> */}
		</View>
	);
}
