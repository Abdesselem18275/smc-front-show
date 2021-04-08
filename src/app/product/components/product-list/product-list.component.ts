import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { sideSlideInAnimation } from 'src/app/animations';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/models/product.models';
import { PageEvent } from '@angular/material/paginator';
import { NavigationExtras, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProductStateService } from 'src/app/product/state/product-state.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [sideSlideInAnimation]
})
export class ProductListComponent  {

  productShorts$: Observable<Product[]>;
  sizeIconName$: Observable<string>;
  objCount$: Observable<number>;
  isBigSize$: Observable<boolean>;
  isSmallScreen: boolean;
  constructor(
    private pss : ProductStateService,
    private router: Router,
    breakpointObserver: BreakpointObserver) {
    this.isSmallScreen = breakpointObserver.isMatched('(max-width: 500px)');
    this.objCount$ = this.pss.productsCount
    this.productShorts$ =  this.pss.products
    this.isBigSize$ = this.pss.isBigSize;
    this.sizeIconName$ = this.isBigSize$.pipe(
      map(x => x ? 'view_comfy':'view_stream')
    );


   }
   updatePage(event: PageEvent): void {
    // this.paginator.pageIndex = event.pageIndex === 0 ? 1 : event.pageIndex
    const navExtra: NavigationExtras = {
      queryParams : {
        page_size : event.pageSize,
        page : event.pageIndex + 1
      },
      queryParamsHandling: 'merge'
    };
    this.router.navigate(['/product/list'],navExtra);
  }
  toggleSize(): void {
    this.pss.toggleBoxSize()
  }
}
