import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { authReducer } from "../auth/store/auth.reducer";
import { AUTH_SATATE_NAME } from "../auth/store/auth.selector";
import { AuthState } from "../auth/store/auth.state";
import { sharedReducer } from "./shared/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState { 
    [SHARED_STATE_NAME]: SharedState,
    [AUTH_SATATE_NAME]: AuthState,
    router:RouterReducerState
}


export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer,
    [AUTH_SATATE_NAME]: authReducer,
    router:routerReducer
}