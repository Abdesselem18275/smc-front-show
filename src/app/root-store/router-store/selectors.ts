import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './reducers';
import * as fromRouter from '@ngrx/router-store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './custom-route-serializer';

export const selectRouter = createFeatureSelector<RouterReducerState<any>>('router');


export const {
  selectCurrentRoute,   // select the current route
  selectFragment,   
  selectQueryParams,    // select the current route fragment
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

  export const selectCurrentUrl = createSelector(
    selectUrl,
    (state:any) => (state && state.router && state.router.state.url)
  );
  export const isCrrentUrl = createSelector(
    selectUrl,
    (url:string,props) => (url && url.includes(props.url))
  );
  // export const selectQueryParams = createSelector(
  //   selectRouter,
  //   (state:any) => (state && state.router.state.queryParams)
  // );