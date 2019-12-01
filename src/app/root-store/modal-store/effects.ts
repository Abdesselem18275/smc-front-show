import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "./state";
import { Injectable } from "@angular/core";
import { filter, map, debounceTime } from "rxjs/operators";
import { ToggleUserCard, ToggleAction } from "./actions";
import { SmcAuthService } from "src/app/account/service/smc-auth.service";

@Injectable()
export class ModalEffects {

    nextPage$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ToggleUserCard),
        map(() =>
            ToggleAction({key : this.authService.isLogged() ? 'userCardBox' : 'loginBox'}))));

    constructor(private actions$: Actions,
                private authService: SmcAuthService) {

    }
 }
