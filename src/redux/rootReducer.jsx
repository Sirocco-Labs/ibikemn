import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import distance from './slices/distanceSlice'
import feedback from './slices/feedbackSlice'
import intake from './slices/intakeFormSlice'
import preferences from './slices/preferenceSlice'




const rootReducer = combineReducers({
    user,
    distance,
    feedback,
    intake,
    preferences,
    
});

export default rootReducer;