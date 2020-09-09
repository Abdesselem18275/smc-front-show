import { Component, OnInit, Input } from '@angular/core';
import { Category, ProductShort } from 'src/app/models/product.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';

@Component({
  selector: 'app-category-breadcrumb',
  templateUrl: './category-breadcrumb.component.html',
  styleUrls: ['./category-breadcrumb.component.scss']
})
export class CategoryBreadcrumbComponent implements OnInit {
  categories: Category[];
  items: string[];
  isNotEmpty: boolean;
  breadCrumb$: Observable<Category[]>;
  @Input() currentProduct?: ProductShort;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit():void {
    this.breadCrumb$ = this.store$.select(GlobalStoreSelectors.selectBreadcrumbArray ,{product : this.currentProduct})
  }



}
