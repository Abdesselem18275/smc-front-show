import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SmcAuthService } from './smc-auth.service';
import { API_URL, TOKEN_KEY, PROFILE_ID } from 'src/app/injectables.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { UserStoreActions } from 'src/app/root-store/user-store';
import { stringify } from 'querystring';
import { Profile } from '../model';

declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient ,
              private store$: Store<RootStoreState.State>,
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

  buttonRender(elementId: string , width: number) {
    gapi.signin2.render(elementId, {
      'scope': 'profile email',
      'width' : width,
      'height' : '36',
      'theme': 'dark',
      'longtitle': true,
      'onsuccess': param => this.onSignIn(param),
      'onfailure': this.onFailure()
    });
  }

  private onSignIn(googleUser) {
    this.createOrSignin(googleUser.getAuthResponse().id_token).subscribe((
      jsonData: {token: string, profile: Profile}) => {
      localStorage.setItem(this.tokenKey, jsonData.token);
      localStorage.setItem(this.profileId, jsonData.profile.id.toString());
      this.store$.dispatch(UserStoreActions.LoadUserAction({payload: jsonData.profile }));
      this.authService.redirect();
      this.signOut();
    });
     }

  private onFailure() {
      console.warn('failure');
    }

  createOrSignin(id_token: string) {
    const endPoint = '/g-auth/';
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

}
