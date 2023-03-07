import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { AuthState } from "./auth.state";
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILED = '[auth page] login failed';

export const loginStart = createAction(LOGIN_START, props < {email:string, password:string}>());
export const loginSucess = createAction(LOGIN_SUCCESS, props<{ user:User }>())
export const loginFailed = createAction(LOGIN_FAILED, props<AuthState>());
