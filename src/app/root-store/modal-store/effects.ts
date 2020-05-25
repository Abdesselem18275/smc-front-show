import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { ToggleUserCard, ToggleAction, CloseAllAction } from "./actions";
import { SmcAuthService } from "src/app/account/service/smc-auth.service";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";
import { ParamStoreActions } from "..";
import { LoadActiveCategoryAction } from "../param-store/actions";

@Injectable()
export class ModalEffects {

    userCardLogic$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ToggleUserCard),
        map(() =>
            ToggleAction({key : this.authService.isLogged() ? 'userCardBox' : 'loginBox'}))));

    routerNavigationAction$ = createEffect(() =>
        this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                map(() =>
                CloseAllAction())));

    constructor(private actions$: Actions,
                private authService: SmcAuthService) {

    }
 }
