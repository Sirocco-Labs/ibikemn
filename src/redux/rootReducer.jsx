import { combineReducers } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import distance from './slices/distanceSlice'
// import feedback from './slices/feedbackSlice'
import intake from './slices/intakeFormSlice'
import preferences from './slices/preferenceSlice'
import myBike from './slices/private/staffBikeSlice'
import allBikes from './slices/private/allBikesSlice'
import orgBikes from './slices/private/orgBikeSlice'
import commute from './slices/commuteSlice'
import travelStats from './slices/travelStatsSlice'
import rideSurveys from './slices/rideSurveySlice'


const rootReducer = combineReducers({
    user,
    distance,
    intake,
    preferences,
    myBike,
    allBikes,
    orgBikes,
    commute,
    travelStats,
    rideSurveys


});

export default rootReducer;