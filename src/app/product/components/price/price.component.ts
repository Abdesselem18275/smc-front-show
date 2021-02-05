import { BreakpointObserver } from '@angular/cdk/layout';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @Input() product: Product;
  isSmallScreen: boolean;
  minPrice = 1378.5;
  maxPrice = 1380.5;
  constructor(breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 720px)');

   }

  ngOnInit(): void {
  }

}
