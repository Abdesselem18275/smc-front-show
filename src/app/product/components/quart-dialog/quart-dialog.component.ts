import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppearanceVariant, Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-quart-dialog',
  templateUrl: './quart-dialog.component.html',
  styleUrls: ['./quart-dialog.component.scss']
})
export class QuartDialogComponent{
  product: Product;
  quartMap = new Map<number,{[key: string]: number}>();
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product}) {
    this.product = data.product;
  }

  updateQuart(event,appearance: AppearanceVariant): void {
    this.quartMap.set(appearance.id,event);
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
