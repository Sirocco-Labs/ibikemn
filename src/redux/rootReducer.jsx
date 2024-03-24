import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import distance from './slices/distanceSlice'






const rootReducer = combineReducers({
    user,
    distance,



    


});

export default rootReducer;