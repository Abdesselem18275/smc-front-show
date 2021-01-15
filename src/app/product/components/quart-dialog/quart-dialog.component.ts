import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductLong } from 'src/app/core/types';

@Component({
  selector: 'app-quart-dialog',
  templateUrl: './quart-dialog.component.html',
  styleUrls: ['./quart-dialog.component.scss']
})
export class QuartDialogComponent implements OnInit {
  product: ProductLong;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: ProductLong}) {
    this.product = data.product;
  }

  ngOnInit(): void {
  }

  confirm(): void {

  }
}
