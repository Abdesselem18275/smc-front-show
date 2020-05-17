import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductShort } from 'src/app/product/model.js';
import { API_URL, TOKEN_KEY, PROFILE_ID } from 'src/app/injectables.service.js';
import { Profile } from '../model';


@Injectable({
  providedIn: 'root'
})
export class SmcAuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control':  'no-cache',
    })
  };
  redirectUrl: string;


  constructor(
              private http: HttpClient,
              private router: Router,
              @Inject(API_URL) private apiUrl: string,
              @Inject(TOKEN_KEY) private tokenKey: string,
              @Inject(PROFILE_ID) private profileId: string) {
               }


createProfile(payload): Observable<any> {

    const query: string = [
      this.apiUrl,
      '/profiles/',
     ].join('');
  return this.http.post<Profile>(query, payload) ;
}

login(credentials: any): Observable<any> {
  console.warn(credentials);
  const query: string = [
      this.apiUrl,
      '/s-auth/'
       ].join('');
  return this.http.post<Profile>(query, credentials);
}

updateProfile(payload): Observable<any> {

  const query: string = [
    this.apiUrl,
    '/profile/',
    this.getProfileId(),
    '/'
   ].join('');
return this.http.patch<Profile>(query, payload);
}

getProfileFavorites() {
  const query: string = [
    this.apiUrl,
    '/profile/',
    this.getProfileId(),
    '/favorites/'
   ].join('');
   return this.http.get<ProductShort[]>(query);
}

profileRefresh(): Observable<any> {
  const query: string = [
    this.apiUrl,
    '/profile/',
    this.getProfileId(),
    '/'
   ].join('');
  return this.http.get<Profile>(query);
}

redirect() {
  if (this.isLogged()) {
    const redirect = this.redirectUrl ?
    this.router.parseUrl(this.redirectUrl) : '/account/profile';
    this.router.navigateByUrl(redirect);
  }
}






isLogged(): boolean {
  return localStorage.getItem(this.tokenKey) !== null;
}
getToken(): string {
  return localStorage.getItem(this.tokenKey);
}
getProfileId(): string {
  return localStorage.getItem(this.profileId);
}

}
