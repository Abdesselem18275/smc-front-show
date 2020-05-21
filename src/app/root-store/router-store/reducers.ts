import { RouterReducerState, routerReducer } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";
import { ActionReducerMap } from "@ngrx/store";

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};
export const featureKey = 'router';
