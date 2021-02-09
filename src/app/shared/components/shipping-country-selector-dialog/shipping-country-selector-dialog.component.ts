import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Country, AppQueryParamKey, Currency } from 'src/app/models/shared.models';
import { GlobalStateService } from '../../state/global-state.service';

@Component({
  selector: 'app-shipping-country-selector-dialog',
  templateUrl: './shipping-country-selector-dialog.component.html',
  styleUrls: ['./shipping-country-selector-dialog.component.scss']
})
export class ShippingCountrySelectorDialogComponent  {
  countries$: Observable<Country[]>;
  shippingCountry$: Observable<Country>;
  constructor(
    private route: ActivatedRoute,
    private gss: GlobalStateService) {
    this.countries$ = this.gss.countries;
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
}
