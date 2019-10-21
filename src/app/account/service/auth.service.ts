import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/app/product/service/product-data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserAccount, Profile } from '../model';
import countryNames from '../../../assets/data/world-countries.json';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LocalStorageHandlerService } from 'src/app/shared/service/local-storage-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _account: UserAccount;
  _token: string;
  _countries: any[];
  redirectUrl: string;
  account$: BehaviorSubject<UserAccount>;


  constructor(private appStorage: LocalStorageHandlerService,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) {
                this.account$ = new BehaviorSubject<UserAccount>(this._account);
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
    console.warn(jsonArray);
    this.appStorage.loadLocalStorage(jsonArray);
  }));
}

updateAccount(jsonData): Observable<any> {

  const query: string = [
    this.apiUrl,
    '/account/',
    this.token,
    '/'
   ].join('');
return this.http.patch(query, jsonData, httpOptions).pipe( tap(jsonArray => {
  this.appStorage.loadLocalStorage(jsonArray);
  this.refreshAccount();
})) ;
}

refreshAccount() {
  if (this.isLogged()) {
    this._account = new UserAccount(this.appStorage.getAll());
    const profile = new Profile({
      first_name : this.appStorage.get('first_name'),
      last_name : this.appStorage.get('last_name'),
      email : this.appStorage.get('email')
    });
    this._account.favorites = this.appStorage.get('favorites').split(',').map( x => Number(x));
    this._account.profile = profile;
    this.account$.next(this._account);
  }

}

getUserFavorites() {
  const query: string = [
    this.apiUrl,
    '/account/',
    this.token,
    '/favorites/'
   ].join('');
   return this.http.get(query, httpOptions).pipe(map((jsonArray: any[]) => jsonArray));

}


get account() {
  if (!this._account) {
    this.refreshAccount();

  }
  return this._account;
}

get token() {
  if (!this._token) {

    this._token = this.appStorage.get('token');
  }
  return this.appStorage.get('token');

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
