import { Component, OnInit, ViewChild} from '@angular/core';
import { Category } from '../../models/product.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  categories$: Observable<Category[]>;
  isLoaded$ = new BehaviorSubject<boolean>(false);
  bgClass: {};
  constructor(private store$: Store<RootStoreState.State>) {
    this.isLoaded$.subscribe((x) => {
      this.bgClass = {
        'hero-image':  x,
        'image--pulsing': !x
      };
    })
   }
  ngOnInit() {


    this.categories$ = this.store$.select(GlobalStoreSelectors.selectRootCategories);
  }
  isLoaded() {
    this.isLoaded$.next(true)
  }

}
