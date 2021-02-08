import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { mergeMap} from 'rxjs/operators';
import { GlobalStoreSelectors } from '../root-store/global-store';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {

  constructor(private store: Store<any>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return   this.store.select(GlobalStoreSelectors.selectLanguage).pipe(
      mergeMap(lang => next.handle(request.clone(
      {
        headers:request.headers.set('Accept-Language',lang.id)
      }

      ))))
}}
