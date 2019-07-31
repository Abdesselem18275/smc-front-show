import { Injectable, Inject } from '@angular/core';
import { API_URL } from 'src/app/product/service/product-data.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserAccount } from '../model';
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

logout(): void {
  this.cookieService.deleteAll();
}

isLogged(): boolean {
  return this.cookieService.check('token');
}


loadCookie(data) {
  this.cookieService.set('token', data['token']);
  Object.keys(data['account']).forEach(key => {
    this.cookieService.set('key', data['account'][key]);
  });
  Object.keys(data['account']['profile']).forEach( key => {
    this.cookieService.set('key', data['account']['profile'][key]);
  });
}


get account() {
  if (!this._account) {
    this._account = new UserAccount(this.cookieService.getAll());
  }
  return this._account;
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
      const nameA = a.val.toUpperCase(); // ignore upper and lowercase
      const nameB = b.val.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
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
}
