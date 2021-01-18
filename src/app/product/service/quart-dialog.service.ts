import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/core/types';
import { QuartDialogComponent } from '../components/quart-dialog/quart-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class QuartDialogService {

  constructor(private dialog: MatDialog) {

  }

  openQuartDialog(product: Product) {
    const dialogRef = this.dialog.open(QuartDialogComponent, {
      width: '640px',
      data: {product}
    });
  }
}
