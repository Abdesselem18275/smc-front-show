import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../injectables.service';
import { Store } from '@ngrx/store';
import { GlobalStoreSelectors } from '../root-store/global-store';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInjectorInterceptor implements HttpInterceptor {

  constructor(
    private store : Store<any>,
    @Inject(TOKEN_KEY) private tokenKey: string
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem(this.tokenKey);
    if (request.url.includes('smc-static-media')) {
      return next.handle(request);
    } else if (request.url.includes('g-auth')) {
      return next.handle(request.clone({
        setHeaders: {
          'Content-Type':  'application/x-www-form-urlencoded'
        }
      }));
    } else {
      return this.store.select(GlobalStoreSelectors.selectLanguage).pipe(
        mergeMap(lang => next.handle(request.clone({
          setHeaders: {
            Authorization: 'Token ' + token,
            'Content-Type':  'application/json',
            'Content-Language':lang.id
          }
        })))
      )
    }

  }
}
