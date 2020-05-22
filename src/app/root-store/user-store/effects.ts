import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom, filter, tap } from 'rxjs/operators';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { TOKEN_KEY, PROFILE_ID } from 'src/app/injectables.service';
import * as UsersActions from './actions';
import { selectUser, selectIsAuthentificated } from './selectors';
import { Profile } from 'src/app/account/model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalStoreActions } from '../modal-store';
import { editFormReplacer } from 'src/utils/json-util';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class UserEffects {
     constructor(
      private router: Router,
       private actions$: Actions ,
       private as: SmcAuthService,
       private snakBar: MatSnackBar,
       @Inject(TOKEN_KEY) private tokenKey: string,
       @Inject(PROFILE_ID) private profileId: string,
       private store$: Store<any>) {}

    login$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.LoginAction),
      map((action: any ) => JSON.stringify(action.credentials)),
      switchMap((credentials)  =>
        this.as.login(credentials).pipe(
          switchMap(payload => {
            localStorage.setItem(this.tokenKey, payload.token);
            localStorage.setItem(this.profileId, payload.profile.id);
            this.as.redirect();
            return [
              UsersActions.LoadUserAction({payload}),
              ModalStoreActions.CloseAllAction()];
          }),
          catchError(async (err) =>  {
            return UsersActions.FailureAction({ message: JSON.parse(JSON.stringify(err.error)) });
          }))
    )));

    refreshUser$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.UserRefreshAction),
      withLatestFrom(this.store$.select(selectIsAuthentificated)),
      filter(content => (content[1])),
      switchMap(()  =>
        this.as.profileRefresh().pipe(
          map(payload => {
            return UsersActions.LoadUserAction({payload});
          }),
          catchError(async (err) => {
            return UsersActions.FailureAction({ message: JSON.parse(JSON.stringify(err.error.non_field_errors)) });
          }
          ))
    )));

    logOut$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.LogoutAction),
      map(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.profileId);
        this.as.redirect();
        return ModalStoreActions.CloseAllAction();
      })));

    createUser$  = createEffect(() =>
    this.actions$.pipe(
        ofType(UsersActions.CreateUserAction),
        map((action: any ) => JSON.stringify(action.payload)),
        switchMap((payload)  =>
          this.as.createProfile(payload).pipe(
            map((response: any) => {
              localStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem(this.profileId, response.profile.id);
              this.as.redirect();
              return UsersActions.LoadUserAction({payload: response.profile});
            }),
            catchError(async (err) =>  {
              return UsersActions.FailureAction({ message: JSON.parse(JSON.stringify(err.error)) });
            }))
      )));
      updateUser$  = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.UpdateUserAction),
        map((action: any ) => JSON.stringify(action.payload, editFormReplacer)),
        switchMap((payload)  =>
          this.as.updateProfile(payload).pipe(
            map((profile: Profile) => {
              this.snakBar.open('Profile informations successfully updated');
              return UsersActions.LoadUserAction({payload: profile});
            }),
            catchError(async (err) =>  {
              return UsersActions.FailureAction({ message: JSON.parse(JSON.stringify(err.error)) });
            }))
      )));
      toggleFavorite$  = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.ToggleFavoriteAction),
        withLatestFrom(this.store$.select(selectUser)),
        map(content => content[1]),
        filter(payload => payload !== null),
        map(payload => UsersActions.UpdateUserAction({payload}))));

      userRefrechTrigger$  = createEffect(() =>
        this.actions$.pipe(
          ofType(ModalStoreActions.ToggleAction, ROUTER_NAVIGATION,UsersActions.TriggerFavoriteAction),
          withLatestFrom(this.store$.select(selectIsAuthentificated)),
          withLatestFrom(this.store$.select(selectUser)),
          filter(content => content[0][1] && content[1] === null),
          map(() => UsersActions.UserRefreshAction())));
        
      favoriteTrigger$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.TriggerFavoriteAction),
        withLatestFrom(this.store$.select(selectIsAuthentificated)),
        withLatestFrom(this.store$.select(selectUser)),
        map(content => {
          const profile = content[1]
          const isAuth = content[0][1]
          const favId = content[0][0].id
          if (isAuth) {
            return UsersActions.ToggleFavoriteAction({id:favId})
          }
          else {
            this.snakBar.open('You :have to login to perform this action')
            this.as.redirectUrl = this.router.routerState.snapshot.url;
            return ModalStoreActions.ToggleAction({key: 'loginBox'})
          }

        })))
  }
