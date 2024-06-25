import App from "./app/App";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import React from "react";
import { InitialLocationPermissionRequest } from "./tasks/RequestLocationPermission";

export default function Root() {
	// InitialLocationPermissionRequest()
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
}
