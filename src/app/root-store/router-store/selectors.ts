import { createSelector, createFeatureSelector } from "@ngrx/store";
import { RouterReducerState, getSelectors } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";
import { featureKey } from "./reducers";
import { State } from "./state";


// export const selectReducerState = createFeatureSelector<
//   RouterReducerState<RouterStateUrl>>(featureKey);

// export const selectCurrentRouteState = createSelector(
//   selectReducerState,
//   routerReducerState => (routerReducerState.)
// );
// export const getRouterQueryParams = createSelector(
//   selectReducerState,
//   state => state.state.queryParams
// );


export const selectRouter = createFeatureSelector<
  State,
  RouterReducerState<RouterStateUrl>>('router');

const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectRouter);

export const selectSelectedUrl = createSelector(
  selectUrl,
  (router) => router
);
