import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";


export const _authReducer = createReducer(initialState)

export function authReducer(state, action) { 
    return _authReducer(state, action);
}

