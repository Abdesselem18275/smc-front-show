import { createSelector, createFeatureSelector } from "@ngrx/store";
import { State } from "./reducers";
import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";

export const selectRouter = createFeatureSelector<State,RouterReducerState<RouterStateUrl>>('router');


export const {
    selectCurrentRoute,   // select the current route
    selectQueryParams,    // select the current route query params
    selectQueryParam,     // factory function to select a query param
    selectRouteParams,    // select the current route params
    selectRouteParam,     // factory function to select a route param
    selectRouteData,      // select the current route data
  } = fromRouter.getSelectors(selectRouter);

  export const selectUrl = createSelector(
    selectRouter,
    (state:any) => (state && state.router.state.url)
  );
  export const isCrrentUrl = createSelector(
    selectUrl,
    (url:string,props) => (url.includes(props.url))
  );
