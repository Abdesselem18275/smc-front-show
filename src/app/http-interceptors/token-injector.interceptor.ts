import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, TOKEN_KEY } from '../injectables.service';

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {

  constructor(
    @Inject(API_URL) private apiUrl: string,
    @Inject(TOKEN_KEY) private tokenKey: string
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem(this.tokenKey);
    if (request.url.includes('smc-static-media')) {
      return next.handle(request);
    }

    request = request.url.includes('g-auth') ?
    request.clone({
      setHeaders: {
        'Content-Type':  'application/x-www-form-urlencoded'
      }
    }) :
    request.clone({
      setHeaders: {
        Authorization: 'Token ' + token,
        'Content-Type':  'application/json'
      }
    });
    return next.handle(request);
  }
}
