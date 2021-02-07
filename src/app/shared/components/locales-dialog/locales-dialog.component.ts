import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { QUERY_PARAM_KEYS, SUPPORTED_LANGUAGES } from 'src/app/injectables';
import { AppQueryParamKey, Country, Currency } from 'src/app/models/shared.models';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { GlobalStateService } from '../../state/global-state.service';

@Component({
  selector: 'app-locales-dialog',
  templateUrl: './locales-dialog.component.html',
  styleUrls: ['./locales-dialog.component.scss']
})
export class LocalesDialogComponent {
  languageList: UserLanguage[];
  countries$: Observable<Country[]>;
  currencies$: Observable<Currency[]>;
  shippingCountry$: Observable<Country>;
  paimentCurrency$: Observable<Currency>;
  constructor(
    private route: ActivatedRoute,
    private gss: GlobalStateService,
    @Inject(SUPPORTED_LANGUAGES) languageList: UserLanguage[]) {
    this.languageList = languageList;
    this.countries$ = this.gss.countries;
    this.currencies$ = this.gss.currencies;
    this.paimentCurrency$ = this.gss.userPaimentCurrency;
    this.shippingCountry$ = this.gss.userShippingCountry;
   }
  get currentRoute(): ActivatedRoute {
    return this.route;
  }
  shippingCountryQueryParam(country: Country): Params {
    return {
      [AppQueryParamKey.shippingCountry]:country.alpha2Code
    };
  }
  paimentCurrencyQueryParam(currency: Currency): Params {
    return {
      [AppQueryParamKey.paymentCurrency]:currency.alphaCode
    };
  }
  getFlagUrl(country: Country): string {
    return `https://www.countryflags.io/${country.alpha2Code.toLowerCase().replace('""','').trim()}/flat/64.png`;
  }

}
