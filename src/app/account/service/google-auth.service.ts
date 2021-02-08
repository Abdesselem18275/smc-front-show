/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable, Inject, NgZone } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SmcAuthService } from '../../account/service/smc-auth.service';
import { API_URL, TOKEN_KEY, PROFILE_ID } from 'src/app/injectables';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { UserStoreActions, UserStoreSelectors } from 'src/app/root-store/user-store';
import { Profile } from '../../models/account.models';
import { Observable } from 'rxjs';
import { take,withLatestFrom } from 'rxjs/operators';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient ,
              private store$: Store<RootStoreState.State>,
              private ngZone: NgZone,
              private authService: SmcAuthService,
              @Inject(TOKEN_KEY) private tokenKey: string,
              @Inject(PROFILE_ID) private profileId: string,
              @Inject(API_URL) private apiUrl: string) {

    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '541271383309-k3e64igmtqkenbosdl6mm7uo7og3jggg.apps.googleusercontent.com'
      });
        });
  }

  buttonRender(elementId: string , width: number): void {
    gapi.signin2.render(elementId, {
      scope: 'profile email',
      width,
      height : '36',
      theme: 'dark',
      longtitle: true,
      onsuccess: param => this.onSignIn(param),
      onfailure: this.onFailure()
    });
  }
  createOrSignin(id_token: string): Observable<any> {
    const endPoint = '/account/g-auth/';
    const query: string = [
      this.apiUrl,
      endPoint
         ].join('');
    const httpParams = new HttpParams().set('id_token', id_token);
     return this.http.post(query, httpParams);
  }

  isSignIn(): boolean {
    return gapi.auth2.GoogleAuth.isSignedIn.get();
  }

  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signOut();
  }
  private onFailure(): void {
  }

  private onSignIn(googleUser) {
    this.ngZone.runOutsideAngular(() => {this.createOrSignin(googleUser.getAuthResponse().id_token).pipe(take(1),withLatestFrom(
      this.store$.select(UserStoreSelectors.selectRedirectNavigation))).
      subscribe(
        (data: [profile: Profile ,redirect:string] ) =>
        {

      const profile = data[0];
      localStorage.setItem(this.tokenKey, profile.auth_token);
      localStorage.setItem(this.profileId, profile.id.toString());
      this.store$.dispatch(UserStoreActions.LoadUserAction({payload: profile }));
      this.ngZone.run(() => {this.authService.redirect(data[1]);});
      this.signOut();
    });});
     }




}
