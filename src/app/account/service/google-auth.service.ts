import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const gapi: any;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http: HttpClient) {
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
    console.warn(googleUser.getAuthResponse());
    this.verifyToken(googleUser.getAuthResponse().id_token).subscribe(x => {
      console.warn(x);
    });
    // this.signOut().then(() => {
    //   console.warn('Sign out');
    // });
     }

  private onFailure() {
      console.warn('failure');
    }

  verifyToken(id_token: string) {
    const apiUrl = 'https://oauth2.googleapis.com/tokeninfo'
    const query: string = [
      apiUrl,
      '?id_token=',
      id_token
         ].join('');
     return this.http.get(query).pipe(map((jsonArray: any[]) => jsonArray));
  }

  isSignIn(): boolean {
    return gapi.auth2.GoogleAuth.isSignedIn.get();
  }

  signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    return auth2.signOut();
  }

}
