import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/app/product/service/product-data.service';
import { HttpHeaders, HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { UserAccount, Profile } from '../model';
import { CookieService } from 'ngx-cookie-service';
import countryNames from '../../../assets/data/world-countries.json';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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


  constructor(private cookieService: CookieService,
              private http: HttpClient,
              @Inject(API_URL) private apiUrl: string) { }


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
    this.loadCookie(jsonArray);
  }));
}

updateAccount(jsonData): Observable<any> {

  const query: string = [
    this.apiUrl,
    '/account/',
    this.token,
    '/'
   ].join('');
   console.warn('Query = ' + query);
return this.http.patch(query, jsonData, httpOptions).pipe( tap(jsonArray => {
  this.loadCookie(jsonArray);
  this.refreshAccount();
})) ;
}




loadCookie(data) {
  if (data['token']) {
    this.cookieService.set('token', data['token']);
  }
  const account_data = data['account'] ? data['account'] : data;
  Object.keys(account_data).forEach(key => {
    this.cookieService.set(key, account_data[key]);
  });
  Object.keys(account_data['profile']).forEach( key => {
    this.cookieService.set(key, account_data['profile'][key]);
  });
}

refreshAccount() {
  this._account = new UserAccount(this.cookieService.getAll());
  const profile = new Profile({
    first_name : this.cookieService.get('first_name'),
    last_name : this.cookieService.get('last_name'),
    email : this.cookieService.get('email')
  });
  this._account.profile = profile;
}


get account() {
  if (!this._account) {
    this.refreshAccount();

  }
  return this._account;
}

get token() {
  if (!this._token) {

    this._token = this.cookieService.get('token');
  }
  return this.cookieService.get('token');

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
  this.cookieService.deleteAll();
}

isLogged(): boolean {
  return this.cookieService.check('token');
}


}
