import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageHandlerService } from 'src/app/shared/service/local-storage-handler.service';
import { API_URL } from 'src/app/product/service/product-data.service';
import { AccountCacheService } from './account-cache.service';
import { SmcAuthService } from './smc-auth.service';

declare const gapi: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient ,
              private appStorage: LocalStorageHandlerService,
              private accountCache: AccountCacheService,
              private authService: SmcAuthService,
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
      'height' : '48',
      'theme': 'dark',
      'longtitle': true,
      'onsuccess': param => this.onSignIn(param),
      'onfailure': this.onFailure()
    });
  }

  private onSignIn(googleUser) {
    this.createOrSignin(googleUser.getAuthResponse().id_token).subscribe(jsonData => {
      this.appStorage.loadLocalStorage(jsonData);
      this.accountCache.refreshAccount();
      this.authService.redirect();
      this.signOut();
    });
     }

  private onFailure() {
      console.warn('failure');
    }

  createOrSignin(id_token: string) {
    const endPoint = '/google-auth/';
    const query: string = [
      this.apiUrl,
      endPoint
         ].join('');
    const httpParams = new HttpParams().set('id_token', id_token);
     return this.http.post(query, httpParams, httpOptions).pipe(map((jsonArray: any[]) => jsonArray));
  }

  isSignIn(): boolean {
    return gapi.auth2.GoogleAuth.isSignedIn.get();
  }

  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    return auth2.signOut();
  }

}
