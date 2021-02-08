import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppQueryParamKey, Country, Currency, SessionStorageKey } from 'src/app/models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private readonly countriesSubject = new BehaviorSubject<Country[]>([]);
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);
  constructor(@Inject(DOCUMENT) private document: Document,private route: ActivatedRoute) {
    this.route.queryParamMap.pipe(
      filter((paramMap: ParamMap) =>
        paramMap.has(AppQueryParamKey.shippingCountry) || paramMap.has(AppQueryParamKey.paymentCurrency))
    ).subscribe((paramMap: ParamMap) => {
      if(paramMap.has(AppQueryParamKey.shippingCountry)) {
        sessionStorage.setItem(
          SessionStorageKey.shippingCountry,
        paramMap.get(AppQueryParamKey.shippingCountry));
        this.countriesSubject.next(this.countriesSubject.getValue());
      }
      if(paramMap.has(AppQueryParamKey.paymentCurrency)) {
        sessionStorage.setItem(
          SessionStorageKey.paymentCurrency,
          paramMap.get(AppQueryParamKey.paymentCurrency));
        this.currenciesSubject.next(this.currenciesSubject.getValue());

      }


    });
  }

  initUserLocales(countryCode: string): void {
    sessionStorage.setItem(SessionStorageKey.shippingCountry,countryCode);
    const relatedCurrency = this.countriesSubject.getValue().find((country: Country) =>
    country.alpha2Code ===  countryCode)?.currency ?? 'USD';
    sessionStorage.setItem(SessionStorageKey.paymentCurrency,relatedCurrency);
    this.currenciesSubject.next(this.currenciesSubject.getValue());
    this.countriesSubject.next(this.countriesSubject.getValue());
  }
  setCurrencies(payload: Currency[]): void {
    this.currenciesSubject.next(payload);
  }
  get currencies(): Observable<Currency[]> {
    return this.currenciesSubject.asObservable();
  }
  setCountries(payload: Country[]): void {
    this.countriesSubject.next(payload);
  }
  get countries(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  get userPaimentCurrency(): Observable<Currency> {
    return this.currencies.pipe(
      filter(
        (currencies: Currency[]) =>
          currencies.map(currency => currency.alphaCode).includes(sessionStorage.getItem(SessionStorageKey.paymentCurrency))),
      map((currencies: Currency[]) =>
        currencies.find(currency => currency.alphaCode === sessionStorage.getItem(SessionStorageKey.paymentCurrency))));
  }

  get userShippingCountry(): Observable<Country> {
    return this.countries.pipe(
      filter(
        (countries: Country[]) =>
        countries.map(country => country.alpha2Code).includes(sessionStorage.getItem(SessionStorageKey.shippingCountry))),
      map((countries: Country[]) =>
      countries.find(country => country.alpha2Code === sessionStorage.getItem(SessionStorageKey.shippingCountry))));
  }
}
