import { configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';

import {createLogger} from 'redux-logger'

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
	debug:true
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger()

const getMiddlewares = (getDefaultMiddleware) => {
	const defaultMiddlewares = getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	});

	// Check if we're in development mode and if so add redux-logger
	if (process.env.NODE_ENV !== "production") {
		const logger = createLogger();
		return defaultMiddlewares.concat(logger);
	}

	return defaultMiddlewares;
};
const store = configureStore({
	reducer: persistedReducer,
	middleware: getMiddlewares,
	devTools: process.env.NODE_ENV === "development", // Disable Redux DevTools in production
});

let persistor = persistStore(store);

export {store, persistor};