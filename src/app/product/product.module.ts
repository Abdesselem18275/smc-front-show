import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ListMetaComponent } from './list-meta/list-meta.component';
import { ProductBoxComponent } from './product-box/product-box.component';
import { BoxSizeToggelerDirective } from './box-size-toggeler.directive';
import { FavoriteHandlerDirective } from './favorite-handler.directive';
import { AppearanceSelectorComponent } from './appearance-selector/appearance-selector.component';
import { ImagePlaceholderDirective } from './image-placeholder.directive';
import { ProductDimensionsComponent } from './product-dimensions/product-dimensions.component';
import { ProductMaterialsComponent } from './product-materials/product-materials.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ProductFeaturesComponent } from './product-features/product-features.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { CommonModule } from '@angular/common';
import {CategoryBreadcrumbComponent} from './category-breadcrumb/category-breadcrumb.component';
import { ProductImagesDialogComponent } from './product-images-dialog/product-images-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent, CategoryBreadcrumbComponent,ProductListComponent,FavoriteHandlerDirective,
                  ProductDetailComponent, ProductBoxComponent, ListMetaComponent,
                  BoxSizeToggelerDirective, AppearanceSelectorComponent, ImagePlaceholderDirective,
                  ProductDimensionsComponent, ProductMaterialsComponent, ImageCarouselComponent,
                  ProductFeaturesComponent, ProductComponentComponent, ProductImagesDialogComponent],})
export class ProductModule { }
