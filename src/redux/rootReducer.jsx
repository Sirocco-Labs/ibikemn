import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import distance from './slices/distanceSlice'
import feedback from './slices/feedbackSlice'
import intake from './slices/intakeFormSlice'
import preferences from './slices/preferenceSlice'
import myBike from './slices/private/staffBikeSlice'
import allBikes from './slices/private/allBikesSlice'
import orgBikes from './slices/private/orgBikeSlice'


const rootReducer = combineReducers({
    user,
    distance,
    feedback,
    intake,
    preferences,
    myBike,
    allBikes,
    orgBikes,
    

});

export default rootReducer;