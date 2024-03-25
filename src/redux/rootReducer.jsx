import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import distance from './slices/distanceSlice'
import feedback from './slices/feedbackSlice'





const rootReducer = combineReducers({
    user,
    distance,
    feedback,




});

export default rootReducer;