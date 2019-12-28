import { Component, OnInit, Input } from '@angular/core';
import { Category, ParamType, Param } from 'src/app/product/model';
import { ActivatedRoute } from '@angular/router';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState, ParamStoreSelectors } from 'src/app/root-store';

@Component({
  selector: 'app-category-breadcrumb',
  templateUrl: './category-breadcrumb.component.html',
  styleUrls: ['./category-breadcrumb.component.scss']
})
export class CategoryBreadcrumbComponent implements OnInit {
  categories: Category[];
  items: string[];
  isNotEmpty: boolean;
  breadCrumb$: Observable<String[]>;
  @Input() currentProduct?: string;

  constructor(private store$: Store<RootStoreState.State>,
              private categoriesCache: CategoryCacheService) { }

  ngOnInit() {
    this.isNotEmpty = false;
    this.store$.select(ParamStoreSelectors.selectAllParamsByType, { type: ParamType.CATEGORY}).
      subscribe((params: Param[]) => {
        if (!this.currentProduct) {
          try {
            this.items = this.setItems(params.shift().value);
          } catch (error) {
            this.items = ['All products'];
          }
        } else {
           this.items = this.setItems(this.currentProduct).filter(x => x !== '');

        }

      });
  }


  getItem(param): Category {
    return this.categoriesCache.fetchCachedCategories().find(category => category.designation === param);
  }


  setItems(param): string[] {
    if ( param === '' ) {
      return [];
    }
    return([param].concat(this.setItems(this.getItem(param).isRoot ? '' : this.getItem(param).parentCategory.designation)));
  }

}
