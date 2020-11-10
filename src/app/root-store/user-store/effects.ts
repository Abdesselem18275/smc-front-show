import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, withLatestFrom, filter, tap, take } from 'rxjs/operators';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { TOKEN_KEY, PROFILE_ID } from 'src/app/injectables';
import * as UsersActions from './actions';
import { selectUser, selectRedirectNavigation } from './selectors';
import { Profile } from 'src/app/models/account.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { editFormReplacer } from 'src/utils/json-util';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/shared/service/app-data.service';


@Injectable()
export class UserEffects {
     constructor(
      private router: Router,
       private actions$: Actions ,
       private as: SmcAuthService,
       private ads: AppDataService,
       private snakBar: MatSnackBar,
       @Inject(TOKEN_KEY) private tokenKey: string,
       @Inject(PROFILE_ID) private profileId: string,
       private store$: Store<any>) {}

    login$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.LoginAction),
      withLatestFrom(this.store$.select(selectRedirectNavigation)),
      switchMap((content:any)  =>
        this.ads.post<{profile:Profile,token:string}>('/s-auth/',JSON.stringify(content[0].credentials)).pipe(
          switchMap((payload:{profile:Profile,token:string} )=> {
            localStorage.setItem(this.tokenKey, payload.token);
            localStorage.setItem(this.profileId, payload.profile.id.toString());
            this.as.redirect(content[1]);
            return [
              UsersActions.LoadUserAction({payload})
            ];
          }),
          catchError(async (err) =>  {
            console.warn(err)
            return UsersActions.FailureAction({ message: JSON.parse(JSON.stringify(err.error)) });
          }))
    )));


    logOut$  = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.LogoutAction),
      map(() => {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.profileId);
        this.as.redirect();
      })),{dispatch:false});

    createUser$  = createEffect(() =>
    this.actions$.pipe(
        ofType(UsersActions.CreateUserAction),
        map((action: any ) => JSON.stringify(action.payload)),
        switchMap((payload)  =>
          this.ads.post<{profile:Profile,token:string}>('/profiles/',payload).pipe(
            map((response: {profile:Profile,token:string}) => {
              localStorage.setItem(this.tokenKey, response.token);
              localStorage.setItem(this.profileId, response.profile.id.toString());
              this.as.redirect();
              return UsersActions.LoadUserAction({payload: response.profile});
            }),
            catchError(async (err) =>  {
              return UsersActions.FailureAction({ message: err });
            }))
      )));
      updateUser$  = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.UpdateUserAction),
        map((action:any) => [JSON.stringify(action.payload, editFormReplacer),action.message]),
        switchMap((payload)  =>
          this.ads.patch<Profile>(`/profile/${this.as.getProfileId()}/`,payload[0]).pipe(
            map((profile: Profile) => {
              this.snakBar.open(payload[1]);
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
        map(payload => UsersActions.UpdateUserAction({message:'Your favorites list was successfully updated',payload}))));

      redirectForAuthEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsersActions.RedirectForAuthentification),
        map(() => {
          this.snakBar.open('You have to login to perform this action','Login').onAction().pipe(
            take(1)
          ).subscribe(() => {
            this.router.navigate(['/account/authentification'])
          })})


        ),{dispatch:false});


  }
