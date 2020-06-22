import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DimensionsSpecification, MeasureType } from '../model';
import {transpose} from '../../../utils/util-functions';
@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-dimensions.component.scss'],
})
export class ProductDimensionsComponent implements OnInit {
  @Input() productDimensions : DimensionsSpecification[]
  headersList : string[]
  dimensionsMatrix : number[][]
  constructor() { }

  ngOnInit(): void {
    this.headersList = this.productDimensions.map(x => x.measureType.designation)
    this.headersList.unshift('n°')
    this.dimensionsMatrix = transpose(this.productDimensions.
      map(x => 
      x.measures.map(y => [y,x.measureType.unit])))
  }
  variantsNumber() {
      return this.productDimensions[0].measures.length
    }

}
