import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductShort, Feature } from '../model';

@Component({
  selector: 'app-product-features',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-features.component.html'
})
export class ProductFeaturesComponent implements OnInit {
  @Input() features : Feature[];

  constructor() { }

  ngOnInit(): void {
  }

}
