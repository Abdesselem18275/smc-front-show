import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DimensionsSpecification, MeasureType } from '../model';
import {transpose} from '../../../utils/util-functions';
@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
})
export class ProductDimensionsComponent implements OnInit {
  @Input() productDimensions : DimensionsSpecification[]
  headersList : MeasureType[]
  constructor() { }

  ngOnInit(): void {
    this.headersList = this.productDimensions.map(x => x.measureType)
  }

  dimensionsMatrix()  {
    return transpose(this.productDimensions.map(x => x.measures))}
  variantsNumber() {
      return this.productDimensions[0].measures.length
    }

}
