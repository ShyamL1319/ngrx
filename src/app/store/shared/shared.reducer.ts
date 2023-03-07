import { createReducer, on } from "@ngrx/store";
import { setErrosMessage, setLoading } from "./shared.actions";
import { initialState } from "./shared.state";

const _sharedReducer = createReducer(initialState,
    on(setLoading, (state, action) => { 
        return {
            ...state,
            showLoading : action.status
        }
    }),
    on(setErrosMessage, (state, action) => { 
        return {
            ...state,
            errorMessage:action.message,
        }
    })
)

export function sharedReducer(state, action) { 
    return _sharedReducer(state, action);
}