import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Currency, AppQueryParamKey } from 'src/app/models/shared.models';
import { GlobalStateService } from '../../state/global-state.service';

@Component({
  selector: 'app-currency-selector-dialog',
  templateUrl: './currency-selector-dialog.component.html',
  styleUrls: ['./currency-selector-dialog.component.scss']
})
export class CurrencySelectorDialogComponent  {
  currencies$: Observable<Currency[]>;
  paimentCurrency$: Observable<Currency>;
  constructor(
    private route: ActivatedRoute,
    private gss: GlobalStateService) {
    this.currencies$ = this.gss.currencies;
    this.paimentCurrency$ = this.gss.userPaimentCurrency;
   }
  get currentRoute(): ActivatedRoute {
    return this.route;
  }
  paimentCurrencyQueryParam(currency: Currency): Params {
    return {
      [AppQueryParamKey.paymentCurrency]:currency.alphaCode
    };
  }
}
