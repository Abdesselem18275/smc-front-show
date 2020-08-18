import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { ToggleUserCard, ToggleAction, CloseAllAction, ToggleWithAuth } from "./actions";
import { SmcAuthService } from "src/app/account/service/smc-auth.service";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Router } from "@angular/router";

@Injectable()
export class ModalEffects {

    userCardLogic$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ToggleUserCard),
        map(() =>
            ToggleAction({key : this.authService.isLogged() ? 'userCardBox' : 'loginBox'}))));

    modalToggleAuthorization = createEffect(() =>
    this.actions$.pipe(
        ofType(ToggleWithAuth),
        map(payload => {
            return ToggleAction({key:this.authService.isLogged() ? payload.key : 'loginBox'})
        })
    ))

    routerNavigationAction$ = createEffect(() =>
        this.actions$.pipe(
                ofType(ROUTER_NAVIGATION),
                map(() =>
                CloseAllAction())));

    constructor(
        private router: Router,
        private actions$: Actions,
        private authService: SmcAuthService) {

    }
 }
