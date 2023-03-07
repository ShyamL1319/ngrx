import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";
export const AUTH_SATATE_NAME = 'auth';

const getAuthSelector = createFeatureSelector<AuthState>(AUTH_SATATE_NAME);

export const isAuthenticated = createSelector(getAuthSelector, (state) => { 
    return state.user ? true : false;
})
