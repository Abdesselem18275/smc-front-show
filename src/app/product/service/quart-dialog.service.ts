import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppearanceVariant, Product } from 'src/app/models/product.models';
import { QuartDialogComponent } from '../components/quart-dialog/quart-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class QuartDialogService {

  constructor(private dialog: MatDialog) {

  }

  openQuartDialog(product: Product,selectedAppearanceVariant: AppearanceVariant) {
    const dialogRef = this.dialog.open(QuartDialogComponent, {
      width: '640px',
      maxWidth:'95vw',
      data: {product,selectedAppearanceVariant}
    });
  }
}
