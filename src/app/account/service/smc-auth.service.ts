import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, Navigation, NavigationExtras, UrlTree, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { ProductShort } from 'src/app/models/product.models.js';
import { API_URL, TOKEN_KEY, PROFILE_ID } from 'src/app/injectables.service.js';
import { Profile } from '../../models/account.models';
import { Store } from '@ngrx/store';
import { RedirectDataType } from 'src/app/models/shared.models';


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
PutUserRequest(payload:any): Observable<any> {
  const query: string = [
    this.apiUrl,
    '/profile/',
    this.getProfileId(),
    '/requests/'
   ].join('');
return this.http.post(query, payload);
}
listUserRequest(): Observable<any> {
  const query: string = [
    this.apiUrl,
    '/profile/',
    this.getProfileId(),
    '/requests/'
   ].join('');
  return this.http.get(query);
}

redirect(redirectUrl?:string) {
  console.warn(this.isLogged(),redirectUrl)
  if (this.isLogged()) {
    this.router.navigateByUrl(redirectUrl ? redirectUrl : '/product/list')
  } else {
    this.router.navigateByUrl('product/list',{skipLocationChange:false});
  }
}
getInitialState = () => ({
    isLoading: false,
    isAuthenticated: this.isLogged(),
    errorMessage: null,
    profile: null ,
    redirectUrl:this.router.url
  })


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
