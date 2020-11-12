import { Component, OnInit, Input, Inject } from '@angular/core';
import { Category, ProductShort } from 'src/app/models/product.models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { GlobalStoreSelectors } from 'src/app/root-store/global-store';
import { QUERY_PARAM_KEYS } from 'src/app/injectables';
import { withLatestFrom, map, tap, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    @Inject(QUERY_PARAM_KEYS) private queryParamKeys: any,
    private route :ActivatedRoute,
    private store$: Store<RootStoreState.State>) { }
  ngOnInit():void {
    this.breadCrumb$ = this.route.queryParamMap.pipe(
      map(paramMap => paramMap.get(this.queryParamKeys.CAT_DESIGNATION)),
      withLatestFrom(this.store$.select(GlobalStoreSelectors.selectCategories)),
      map(([value,categories]:[string,Category[]]) =>
        this.currentProduct ?
          this.setItems(categories,this.getItem(categories, this.currentProduct.rootCategory)):
          value ?
          this.setItems(categories,categories.find(cat => cat.designation.toLowerCase() === value.toLowerCase())):
          []
    ),
    map(breadcrumb => breadcrumb.reverse())
    )
  }

  private getItem(categories,key:number): Category {
    return categories.find(category =>  category.id === key);
  }

  private setItems(categories,param:Category): Category[] {
    if (param === undefined || param.designation==='All Cateogries') {
      return [];
    }
    const cat = this.getItem(categories,param.id)
    const parentCategory = this.getItem(categories,param.parentCategory)
    return([param].concat(this.setItems(categories,cat.isRoot ? undefined : parentCategory)));
  }

}
