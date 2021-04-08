import { Injectable, Inject, NgZone } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL} from 'src/app/injectables';
import { ApiProfile, Profile } from '../../models/account.models';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccountStateService } from 'src/app/shared/state/account-state.service';
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient ,
              private as : AuthService,
              private ass : AccountStateService,
              private ngZone: NgZone,
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
  createOrSignin(id_token: string): Observable<ApiProfile> {
    const endPoint = '/account/g-auth/';
    const query: string = [
      this.apiUrl,
      endPoint
         ].join('');
    const httpParams = new HttpParams().set('id_token', id_token);
     return this.http.post<ApiProfile>(query, httpParams);
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
    this.ngZone.runOutsideAngular(() => {this.createOrSignin(googleUser.getAuthResponse().id_token).pipe(
      take(1)).
      subscribe((value: ApiProfile) =>
        {
        const profile = new Profile(value)
        this.as.token = profile.authToken
        this.ass.setAuthProfile(profile)
        this.signOut();
    });});
     }




}
