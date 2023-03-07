import { createReducer, on } from "@ngrx/store";
import { loginStart, loginSucess, signupSuccess } from "./auth.actions";
import { initialState } from "./auth.state";


export const _authReducer = createReducer(initialState,
    on(loginStart, (state, action) => { 
        return {
            ...state,
            email: action.email,
            password: action.password
        }
    }),
    on(loginSucess, (state, action) => {
        return {
            ...state,
            user:action.user
        }
    }),
    on(signupSuccess, (state, action) => { 
        return {
            ...state,
            user: action.user
        }
    })
)

export function authReducer(state, action) { 
    return _authReducer(state, action);
}

