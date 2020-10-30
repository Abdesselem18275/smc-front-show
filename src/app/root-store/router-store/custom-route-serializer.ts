import { Params, RouterStateSnapshot } from '@angular/router';

import { RouterStateSerializer, BaseRouterStoreState, SerializedRouterStateSnapshot, ROUTER_NAVIGATED, RouterNavigatedPayload } from '@ngrx/router-store';

export type  RouterStateUrl = {
  url: string;
  params: Params;
  queryParams: Params;
}
export declare type CustomRouterNavigatedAction<T extends BaseRouterStoreState = SerializedRouterStateSnapshot> = {
  type: typeof ROUTER_NAVIGATED;
  payload: RouterNavigatedPayload<RouterStateUrl>;
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
      let route = routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const {
        url,
        root: { queryParams },
      } = routerState;
      const { params } = route;
      // Only return an object including the URL, params and query params
      // instead of the entire snapshot
      return { url, params, queryParams };
    }
  }
