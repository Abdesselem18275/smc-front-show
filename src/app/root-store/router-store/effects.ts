import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { switchMap } from 'rxjs/operators';
import { ModalStoreActions } from '../modal-store';
import { UserStoreActions } from '../user-store';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';


@Injectable()
export class RouterEffects {

    routerNavigationEffects$ = createEffect(() =>
    this.actions$.pipe(
            ofType(ROUTER_NAVIGATION),
            switchMap(() => (this.as.isLogged() ?
                [
                ModalStoreActions.CloseAllAction(),
                UserStoreActions.UserRefreshAction()
            ] : [
                ModalStoreActions.CloseAllAction(),
            ]

            )
            )));


    constructor(
        private actions$: Actions,
        private as: SmcAuthService,
        ) {}
}
