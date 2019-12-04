import { createSelector, createFeatureSelector } from "@ngrx/store";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";
import { featureKey } from "./reducers";


export const selectReducerState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>>(featureKey);

export const getRouterInfo = createSelector(
  selectReducerState,
  state => state
);