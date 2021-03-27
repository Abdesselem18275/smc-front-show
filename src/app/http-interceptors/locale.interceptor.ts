import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { GlobalStoreSelectors } from '../root-store/global-store';
import { GlobalStateService } from '../shared/state/global-state.service';
import { Country, Currency } from '../models/shared.models';
import { UserLanguage } from '../root-store/global-store/state';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {

  constructor(private gss: GlobalStateService,private store: Store<any>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const SHIPPING_COUNTRY_HEADER = 'user-shipping-country';
    const USER_PAYMENT_CURRENCY_HEADER = 'user-payment-currency';
    return !request.url.includes('locale/init') && request.url.includes('/api/') ?
      this.store.select(GlobalStoreSelectors.selectLanguage).pipe(
        withLatestFrom(combineLatest([this.gss.userPaimentCurrency,
          this.gss.userShippingCountry])),
      mergeMap((locales: [UserLanguage,[Currency,Country]]) => next.handle(request.clone(
      {
        setHeaders :{
          'Accept-Language':locales[0].id,
          [USER_PAYMENT_CURRENCY_HEADER.toLowerCase()]:locales[1][0].alphaCode.toUpperCase(),
          [SHIPPING_COUNTRY_HEADER.toLowerCase()]:locales[1][1].alpha2Code.toUpperCase(),
        }
      }

      )))): next.handle(request);
}}
