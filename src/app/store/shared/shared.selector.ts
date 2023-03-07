import { createFeatureSelector, createSelector } from "@ngrx/store"
import { SharedState } from "./shared.state"

export const SHARED_STATE_NAME = 'shared'


const getSharedSelector = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedSelector, (state) => { 
    return state.showLoading;
})


export const getErrorMessage = createSelector(getSharedSelector, (state) => { 
    return state.errorMessage;
})
