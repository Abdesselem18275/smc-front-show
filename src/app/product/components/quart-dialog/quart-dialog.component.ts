import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppearanceVariant, ProductLong } from 'src/app/core/types';

@Component({
  selector: 'app-quart-dialog',
  templateUrl: './quart-dialog.component.html',
  styleUrls: ['./quart-dialog.component.scss']
})
export class QuartDialogComponent implements OnInit {
  product: ProductLong;
  quartArrayForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {product: ProductLong}) {
    this.product = data.product;
    this.product.appearanceVariants.forEach((app: AppearanceVariant)=> {
        //this.quartArrayForm.setControl(app.id,new )
    });
  }


  ngOnInit(): void {
  }
  // get quartFormEl() : FormGroup {
  //   return this.fb.group({

  //   })
  // }
  confirm(): void {

  }
}
