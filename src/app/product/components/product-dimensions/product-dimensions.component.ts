import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DimensionVariant, DimensionVariantSpecification } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-dimensions',
  templateUrl: './product-dimensions.component.html',
  styleUrls: ['./product-dimensions.component.scss'],
})
export class ProductDimensionsComponent implements OnInit {
  @Input()
  mode: 'quart'|'presentation' = 'presentation';
  @Input()
  dimensionVariants: DimensionVariant[] = [];
  @Output()
  variantQuantities  = new EventEmitter<{[key: string]: number}>();
  quantityForm: FormGroup;
  displayedColumns: string[] = [];
  dimensionColumns: string[] = [];
  dataSource!: MatTableDataSource<DimensionVariant>;
  constructor(private fb: FormBuilder) {
    this.quantityForm = this.fb.group({});
    this.quantityForm.valueChanges.subscribe((value) => this.variantQuantities.emit(value));
   }

  ngOnInit(): void {
    this.dimensionVariants.forEach((dimVariant: DimensionVariant) => {
      this.quantityForm.setControl(dimVariant.designation,new FormControl(0));
    });
    this.dataSource = new MatTableDataSource<DimensionVariant>(this.dimensionVariants);
    this.dimensionColumns = Array.from(this.dimensionVariants.reduce(
      (acc: Set<string>,currentValue: DimensionVariant) => {
        currentValue.dimensionVariantsSpecs.forEach(dim => {
          acc.add(dim.measureType.designation);
        });
        return acc;
      }

      ,new Set<string>()));
    this.displayedColumns = this.dimensionColumns.slice();
    this.displayedColumns.unshift('ref');
    if(!this.isPresentationMode) {
      this.displayedColumns.push('quantity');
    }
  }
  variantsNumber() {
      return this.dimensionColumns.length;
    }
  tableWidth() {
    return `${this.displayedColumns.length * 80}px`;
  }
  getMeasure(variant: DimensionVariant,measureType: string): string {
      const varIndex = this.dimensionVariants.find((dimVar: DimensionVariant) => dimVar.designation === variant.designation);
      if (variant) {
        const measure = varIndex.dimensionVariantsSpecs.find((dimSpecs: DimensionVariantSpecification) =>
          dimSpecs.measureType.designation === measureType );
        return measure ? `${measure.value} ${measure.measureType.unit}` : '-';
      } else {
        return '-';
      }
  }
  get isPresentationMode(): boolean {
    return this.mode === 'presentation';
  }
}
