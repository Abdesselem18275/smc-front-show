import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { AppearanceSelectorComponent } from './components/appearance-selector/appearance-selector.component';
import { CategoryBreadcrumbComponent } from './components/category-breadcrumb/category-breadcrumb.component';
import { QuartDialogComponent } from './components/quart-dialog/quart-dialog.component';
import { PriceComponent } from './components/price/price.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BoxSizeToggelerDirective } from './directives/box-size-toggeler.directive';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { ListMetaComponent } from './components/list-meta/list-meta.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { ProductComponentComponent } from './components/product-component/product-component.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductDimensionsComponent } from './components/product-dimensions/product-dimensions.component';
import { ProductFeaturesComponent } from './components/product-features/product-features.component';
import { ProductImagesDialogComponent } from './components/product-images-dialog/product-images-dialog.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductMaterialsComponent } from './components/product-materials/product-materials.component';
import { ProductComponent } from './components/product/product.component';
import { FavoriteHandlerDirective } from './directives/favorite-handler.directive';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent, CategoryBreadcrumbComponent,ProductListComponent,FavoriteHandlerDirective,
                  ProductDetailComponent, ListMetaComponent,ProductBoxComponent,
                  BoxSizeToggelerDirective, AppearanceSelectorComponent, ImagePlaceholderDirective,
                  ProductDimensionsComponent, ProductMaterialsComponent, ImageCarouselComponent,
                  ProductFeaturesComponent, ProductComponentComponent, ProductImagesDialogComponent,
                  QuartDialogComponent, PriceComponent],})
export class ProductModule { }
