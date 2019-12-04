import { Params } from "@angular/router";
import { RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

