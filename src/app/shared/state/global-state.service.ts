import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { Profile } from 'src/app/models/account.models';
import { Category, MenuTreeData } from 'src/app/models/product.models';
import { AppQueryParamKey, Country, Currency, SessionStorageKey, UserLanguage } from 'src/app/models/shared.models';
import { MenuDataBuilderService } from 'src/app/shared/services/menu-data-builder.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private readonly countriesSubject = new BehaviorSubject<Country[]>([]);
  private readonly currenciesSubject = new BehaviorSubject<Currency[]>([]);
  private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)
  private readonly categoriesSubject = new BehaviorSubject<Category[]>([])
  private readonly selectedLanguageSubject = new BehaviorSubject<UserLanguage>(null)

  constructor(
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private mdbs: MenuDataBuilderService,
    private route: ActivatedRoute) {
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





  get selectedLanguage():Observable<UserLanguage> {
    return this.selectedLanguageSubject.asObservable()
  }
  setSelectedLanguage(payload:UserLanguage):void {
    return this.selectedLanguageSubject.next(payload)
  }

  get categories():Observable<Category[]> {
    return this.categoriesSubject.asObservable()
  }

  getBreadCrumb(catId?:number):Observable<Category[]> {
    return this.route.queryParamMap.pipe(
      map(paramMap => paramMap.get(this.queryParamKeys.CAT_DESIGNATION)),
      withLatestFrom(this.categories),
      map(([value,categories]: [string,Category[]]) =>
      catId ?
          this.setItems(categories,this.getItem(categories, catId)):
          value ?
          this.setItems(categories,categories.find(cat => cat.designation.toLowerCase() === value.toLowerCase())):
          []
    ),
    map(breadcrumb => breadcrumb.reverse())
    );
  }
  get activeCategory():Observable<Category> {
    return this.route.queryParamMap.pipe(
      map(paramMap => paramMap.get(this.queryParamKeys.CAT_DESIGNATION)),
      withLatestFrom(this.categories),
      map(([value,categories]: [string,Category[]])=> value !== '' && value ?
      categories.filter(cat => cat.designation === value).shift():
      {
        designation : 'All Cateogries',
        isRoot: true,
        children : categories.filter(cat => cat.isRoot)
      })
    );
  }


  setCategories(payload : Category[]):void {
    this.categoriesSubject.next(payload)
  }

  get navMenuTree():Observable<MenuTreeData[]> {
    return this.categories.pipe(map(categories => this.mdbs.buildMenuTree(categories)))
  }

  get isLoading():Observable<boolean> {
    return this.isLoadingSubject.asObservable()
  }
  setIsLoading(payload:boolean):void {
      this.isLoadingSubject.next(payload)
  }

  initUserLocales(countryCode: string): void {
    sessionStorage.setItem(SessionStorageKey.shippingCountry,countryCode);
    let relatedCurrency = this.countriesSubject.getValue().find((country: Country) =>
    country.alpha2Code ===  countryCode)?.currency ?? 'USD';
    relatedCurrency = this.currenciesSubject.getValue().find(currency => currency.alphaCode === relatedCurrency) ?
      relatedCurrency : 'USD';
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


  private getItem = (categories: Category[],key: number | undefined): Category | undefined =>
  categories.find(category =>  category.id === key);

  private setItems = (categories: Category[],param: Category|undefined): Category[] => {
    if ((param === undefined ) || param.designation==='All Cateogries') {
      return [];
    } else {
      const cat = this.getItem(categories,param.id);
      const parentCategory = this.getItem(categories,param.parentCategory);
      return([param].concat(this.setItems(categories,cat?.isRoot ? undefined : parentCategory)));
    }

  };
}
