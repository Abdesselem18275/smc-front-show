import { BreakpointObserver } from '@angular/cdk/layout';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.models';
import { Currency } from 'src/app/models/shared.models';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() product: Product;
  isSmallScreen: boolean;
  currency$:Observable<Currency>;
  minPrice = 1378.5;
  maxPrice = 1380.5;
  constructor(private gss: GlobalStateService,breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 720px)');
    this.currency$ = this.gss.userPaimentCurrency

   }

  ngOnInit(): void {
  }

}
