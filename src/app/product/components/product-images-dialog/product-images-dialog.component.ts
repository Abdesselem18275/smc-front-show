import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take,filter } from 'rxjs/operators';
import { AppearanceVariant, BaseImage, Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-product-images-dialog',
  templateUrl: './product-images-dialog.component.html',
  styleUrls: ['./product-images-dialog.component.scss']
})
export class ProductImagesDialogComponent  {
  selectedAppearanceVariant$ = new BehaviorSubject<AppearanceVariant>({}) ;
  isLoading$ = new BehaviorSubject<boolean>(false);
  selectedImage ='';
  constructor(
    private cdRef: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ProductImagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {product: Product}) {
      this.images.pipe(
      filter(x => x && x.length > 0),
      take(1)).subscribe((x: string[])=> {
        this.selectedImage = x[0];
        this.cdRef.detectChanges();
      });
    }

  setAppearanceVariant(appearanceVariant: AppearanceVariant ): void {
    this.selectedAppearanceVariant$.next(appearanceVariant);
    this.cdRef.detectChanges();
  }
  get images(): Observable<string[]> {
    return this.selectedAppearanceVariant$ && this.selectedAppearanceVariant$.asObservable().pipe(
      filter(appVariance => appVariance.images ? true :false),
      map(appVariance => appVariance.images.concat(appVariance.thumbNail).reverse())
    );
  }
  close(): void {
    this.dialogRef.close();
  }

  selectImage(image: string): void {
    this.setLoading(true);
    this.selectedImage = image;
  }
  setLoading(state: boolean) {
    this.isLoading$.next(true);
    setTimeout(() => this.isLoading$.next(false));
  }
}
