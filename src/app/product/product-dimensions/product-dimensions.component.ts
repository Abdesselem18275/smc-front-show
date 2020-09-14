import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DimensionsSpecification } from '../../models/product.models';
import {transpose} from '../../../utils/util-functions';
import { MatTableDataSource } from '@angular/material/table';

interface dimensionElement {
  [key: string]: string;
}

@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-dimensions.component.scss'],
})
export class ProductDimensionsComponent implements OnInit {
  @Input() productDimensions : DimensionsSpecification[]
  displayedColumns : string[]
  dimensionsMatrix : number[][]
  dataSource : MatTableDataSource<dimensionElement>;
  constructor() { }

  ngOnInit(): void {

    const  dimMap :dimensionElement[] = Array.from(
      this.productDimensions.reduce((accumulator:Map<number,any>, currentValue: DimensionsSpecification,currentIndex) => {
        currentValue.measures.forEach((value,index) => {
          accumulator.set(index,{
            ...accumulator.get(index),
            [currentValue.measureType.designation]:`${value} ${currentValue.measureType.unit}`,
            'no.':index
          })
      })
      return accumulator }, new Map<number,any>()).values())
    this.dataSource = new MatTableDataSource<dimensionElement>(dimMap)
    this.displayedColumns = this.productDimensions.map(x => x.measureType.designation)
    this.displayedColumns.unshift('no.')
  }
  variantsNumber() {
      return this.productDimensions[0].measures.length
    }
  tableWidth() {
    return `${this.displayedColumns.length * 80}px`
  }
}
