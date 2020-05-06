import { createSelector, createFeatureSelector } from "@ngrx/store";
import { RouterReducerState, getSelectors } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";
import { featureKey } from "./reducers";
import { State } from "./state";

export const selectReducerState = createFeatureSelector<
  State,
  RouterReducerState<RouterStateUrl>>(featureKey);


export const selectCurrentRouteState = createSelector(
  selectReducerState,
  routerReducerState => (routerReducerState.state)
);
export const getRouterQueryParams = createSelector(
  selectReducerState,
  state => state.state.queryParams
);
