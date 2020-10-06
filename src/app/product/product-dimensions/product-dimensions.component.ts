import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DimensionsSpecification, DimensionElement } from '../../models/product.models';
import { MatTableDataSource } from '@angular/material/table';
import { HelperService} from '../../shared/service/helper.service';

@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product-dimensions.component.scss'],
})
export class ProductDimensionsComponent implements OnInit {
  @Input() productDimensions : DimensionsSpecification[]
  displayedColumns : string[]
  dataSource : MatTableDataSource<DimensionElement>;
  constructor(private helperS:HelperService) { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource<DimensionElement>(this.helperS.toDimensionArray(this.productDimensions))
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
