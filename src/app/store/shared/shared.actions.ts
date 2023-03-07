import { createAction, props } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const SET_LOADING_ACTION = '[shared state] set loading';
export const SET_ERROR_MESSAGE = '[shared state] set error message';
export const setLoading = createAction(SET_LOADING_ACTION, props<{ status: boolean }>());
export const setErrosMessage = createAction(SET_ERROR_MESSAGE, props<{message:string}>())