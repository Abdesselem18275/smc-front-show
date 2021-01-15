import { Component, OnInit, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DimensionsSpecification, DimensionElement } from 'src/app/core/types';
import { HelperService} from '../../shared/service/helper.service';

@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  styleUrls: ['./product-dimensions.component.scss'],
})
export class ProductDimensionsComponent implements OnInit {
  @Input()
  mode: 'quart'|'presentation' = 'presentation';
  @Input()
  @Output()
  productDimensions: DimensionsSpecification[] = [];
  displayedColumns: string[] = [];
  dimensionColumns: string[] = [];
  dataSource!: MatTableDataSource<DimensionElement>;
  constructor(private helperS: HelperService) {
   }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<DimensionElement>(this.helperS.toDimensionArray(this.productDimensions));
    this.dimensionColumns = this.productDimensions.map(x => x.measureType.designation);
    this.displayedColumns = this.dimensionColumns.slice();
    if(!this.isPresentationMode) {
      this.displayedColumns.unshift('quantity');
    }else {
      this.dimensionColumns.unshift('ref');
      this.displayedColumns = this.dimensionColumns.slice();
    }
  }
  variantsNumber() {
      return this.productDimensions[0].measures.length;
    }
  tableWidth() {
    return `${this.displayedColumns.length * 80}px`;
  }
  get isPresentationMode(): boolean {
    return this.mode === 'presentation';
  }
}
