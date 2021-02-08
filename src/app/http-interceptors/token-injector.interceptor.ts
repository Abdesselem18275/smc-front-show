/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../injectables';
import { Store } from '@ngrx/store';
import { GlobalStoreSelectors } from '../root-store/global-store';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<any>,
    @Inject(TOKEN_KEY) private tokenKey: string
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem(this.tokenKey);
    request = token ? request.clone({
      headers:request.headers.set('Authorization','Token ' + token) 
    }):request
    return next.handle(request)
  }
}
