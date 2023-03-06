import { createFeatureSelector, createSelector } from "@ngrx/store";

export const COUNTER_STATE_NAME = 'counter';
const counterSelector = createFeatureSelector(COUNTER_STATE_NAME);

export const getCounter = createSelector(counterSelector, (state: any) => {
    return state.counter;
});

export const getChannelName = createSelector(counterSelector, (state: any) => {
    return state.channelName;
});