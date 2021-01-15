/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { API_URL, TOKEN_KEY, PROFILE_ID } from 'src/app/injectables.js';


@Injectable({
  providedIn: 'root'
})
export class SmcAuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control':  'no-cache',
    })
  };

  constructor(
              private router: Router,
              @Inject(TOKEN_KEY) private tokenKey: string,
              @Inject(PROFILE_ID) private profileId: string) {
               }


redirect(redirectUrl?: string) {
  if (this.isLogged()) {
    this.router.navigateByUrl(redirectUrl ? redirectUrl : '/product/list');
  } else {
    this.router.navigateByUrl('product/list',{skipLocationChange:false});
  }
}
getInitialState = () => ({
    isLoading: false,
    isAuthenticated: this.isLogged(),
    errorMessage: null,
    profile:null,
    redirectUrl:this.router.url
  });


isLogged(): boolean {
  return localStorage.getItem(this.tokenKey) !== null;
}
getToken(): string {
  return localStorage.getItem(this.tokenKey) ?? '';
}
getProfileId(): string {
  return localStorage.getItem(this.profileId) ?? '';
}

}
