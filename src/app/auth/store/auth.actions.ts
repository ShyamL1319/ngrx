import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { AuthState } from "./auth.state";
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILED = '[auth page] login failed';
export const AUTO_LOGIN = '[auth page] auto login';

export const LOGOUT_ACTION = '[auth page] logout';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';
export const loginStart = createAction(LOGIN_START, props < {email:string, password:string}>());
export const loginSucess = createAction(LOGIN_SUCCESS, props<{ user: User, redirect:boolean }>());
export const loginFailed = createAction(LOGIN_FAILED, props<AuthState>());
export const autoLogin = createAction(AUTO_LOGIN)

export const signupStart = createAction(SIGNUP_START, props<{ email: string, password: string }>());
export const signupSuccess = createAction(SIGNUP_SUCCESS, props<{ user: User, redirect: boolean }>());

export const logout = createAction(LOGOUT_ACTION);