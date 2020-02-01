import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import countryNames from '../../../assets/data/world-countries.json';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LocalStorageHandlerService } from 'src/app/shared/service/local-storage-handler.service';
import { Router } from '@angular/router';
import { AccountCacheService } from './account-cache.service';
import { ProductShort } from 'src/app/product/model.js';
import { API_URL } from 'src/app/injectables.service.js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SmcAuthService {

  _countries: any[];
  redirectUrl: string;


  constructor(private appStorage: LocalStorageHandlerService,
              private http: HttpClient,
              private router: Router,
              private accountCache: AccountCacheService,
              @Inject(API_URL) private apiUrl: string) {
               }


createAccount(jsonData): Observable<any> {

    const query: string = [
      this.apiUrl,
      '/accounts/',
     ].join('');
  return this.http.post(query, jsonData, httpOptions) ;
}

login(credentials: any): Observable<any> {
  const query: string = [
      this.apiUrl,
      '/token-auth/'
       ].join('');
  return this.http.post(query, credentials, httpOptions).pipe( tap(jsonArray => {
    this.appStorage.loadLocalStorage(jsonArray);
  }));
}

updateAccount(jsonData): Observable<any> {

  const query: string = [
    this.apiUrl,
    '/account/',
    this.accountCache.token,
    '/'
   ].join('');
return this.http.patch(query, jsonData, httpOptions).pipe( tap(jsonArray => {
  this.appStorage.loadLocalStorage(jsonArray);
  this.accountCache.refreshAccount();
})) ;
}

getUserFavorites() {
  const query: string = [
    this.apiUrl,
    '/account/',
    this.accountCache.token,
    '/favorites/'
   ].join('');
   return this.http.get(query, httpOptions).pipe(map((jsonArray: ProductShort[]) => jsonArray));

}

redirect() {
  if (this.isLogged()) {
    const redirect = this.redirectUrl ?
    this.router.parseUrl(this.redirectUrl) : '/account/profile';
    this.router.navigateByUrl(redirect);
  }
}



get countries() {
  if (!this._countries) {
    let countryArray = [];
    Object.keys(countryNames).forEach( x => {
      const item = {
        key : x ,
        val : countryNames[x]
      };
      countryArray.push(item);
    });
    this._countries = countryArray.sort(function(a, b) {
      const nameA = a.val.toUpperCase();
      const nameB = b.val.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this._countries.unshift({
      key: '',
      val: '',
      disabled: false
    });


  }
  return <any[]> this._countries;
}


logout(): void {
  this.appStorage.deleteAll();
}

isLogged(): boolean {
  return this.appStorage.check('token');
}


}
