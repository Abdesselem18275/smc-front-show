import { NgModule } from '@angular/core';


import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DataInjectablesService } from './service/data-injectables.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ProductCategoryComponent } from './product-category/product-category.component';
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



@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [ProductComponent , ProductHomeComponent, ProductListComponent,FavoriteHandlerDirective,
                  ProductDetailComponent, ProductBoxComponent,  ProductCategoryComponent, ListMetaComponent, BoxSizeToggelerDirective, AppearanceSelectorComponent, ImagePlaceholderDirective, ProductDimensionsComponent, ProductMaterialsComponent, ImageCarouselComponent, ProductFeaturesComponent, ProductComponentComponent],
  providers:  [DataInjectablesService ]
})
export class ProductModule { }
