import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Category } from '../../models/product.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { ViewportScroller } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent  implements AfterViewInit  {
  categories$: Observable<Category[]>;
  isLoaded$ = new BehaviorSubject<boolean>(false);
  bgClass: {};
  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private store$: Store<RootStoreState.State>) {
    this.categories$ = this.store$.select(GlobalStoreSelectors.selectRootCategories);
    this.isLoaded$.subscribe((x) => {
      this.bgClass = {
        'hero-image':  x,
        'image--pulsing': !x
      };
    })

   }
   ngAfterViewInit() {
    this.router.events.pipe(
      filter((e) => e instanceof Scroll),
      map(e => e as Scroll),
    ).subscribe(e => {
      if (e.position) {
        // backward navigation
      } else if (e.anchor) {
        console.warn('anchor',e.anchor);
        // anchor navigation
        this.viewportScroller.scrollToAnchor(e.anchor)
        //this.location.replaceState(pathWithoutHash);
      } else {
        // forward navigation
      }
    });
   }
  isLoaded() {
    this.isLoaded$.next(true)
  }

}
