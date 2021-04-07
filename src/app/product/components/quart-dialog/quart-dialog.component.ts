import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppearanceVariant, DimensionVariant, DimensionVariantSpecification, Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-quart-dialog',
  templateUrl: './quart-dialog.component.html',
  styleUrls: ['./quart-dialog.component.scss']
})
export class QuartDialogComponent{
  product: Product;
  selectedAppearanceVariant: AppearanceVariant
  quartMap = new Map<number,{[key: string]: number}>();
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      product: Product;
      selectedAppearanceVariant: AppearanceVariant;}) {
    this.product = data.product;
    this.selectedAppearanceVariant = data.selectedAppearanceVariant;
  }

  updateQuart(event): void {
    this.quartMap.set(this.selectedAppearanceVariant.id,event);
  }
  
  getDimensionString(dimensionVariant : DimensionVariant):string {
    return dimensionVariant.dimensionVariantsSpecs.reduce(
      (acc:string,cur : DimensionVariantSpecification,index:number) => 
        `${acc}${index === 0?'':'/'}${cur.value} ${cur.measureType.unit}`,
        ''
    )
  }

  getQuantities = (appearance: AppearanceVariant): number => {
    if(this.quartMap.has(appearance.id)) {
      return Object.keys(this.quartMap.get(appearance.id)).reduce(
        (acc: number,currentValue: string) => acc + this.quartMap.get(appearance.id)[currentValue],0);
    } else {
      return 0;
    }
  };
  confirm(): void {

  }
}
