import { RouterReducerState, RouterState } from "@ngrx/router-store";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RouterStateUrl } from "./custom-serializer";

export const getRouterSatate = createFeatureSelector
    <RouterReducerState<RouterStateUrl>>('router');

export const getCurrentRoute = createSelector(getRouterSatate, (state) => { 
    return state.state;
})