import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product, Feature } from 'src/app/core/types';

@Component({
  selector: 'app-product-features',
  changeDetection : ChangeDetectionStrategy.OnPush,
  templateUrl: './product-features.component.html',
  styleUrls: ['./product-features.component.scss']
})
export class ProductFeaturesComponent implements OnInit {
  @Input() features : Feature[];
  @Input() align : 'horizontal' | 'vertical' = 'vertical'
  constructor() { }

  ngOnInit(): void {
  }

}
