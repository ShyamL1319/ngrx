import { createFeatureSelector, createSelector } from "@ngrx/store";

const counterSelector = createFeatureSelector('counter');

export const getCounter = createSelector(counterSelector, (state: any) => {
    return state.counter;
});

export const getChannelName = createSelector(counterSelector, (state: any) => {
    return state.channelName;
});