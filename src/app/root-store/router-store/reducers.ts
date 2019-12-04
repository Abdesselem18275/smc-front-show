import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { State } from "./state";


export const featureKey = 'router';

export const reducer: ActionReducerMap<State> = {
    router: routerReducer
  };
