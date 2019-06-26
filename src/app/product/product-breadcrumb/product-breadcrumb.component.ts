import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductDataService } from '../service/product-data.service';
import { Category } from '../model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CategoryCacheService } from '../service/category-cache.service';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.scss']
})
export class ProductBreadcrumbComponent implements OnInit {
  categories: Category[];
  items: string[];
  isNotEmpty: boolean;
  @Input() currentProduct?: string;

  constructor(private route: ActivatedRoute, private categoriesCache: CategoryCacheService) { }

  ngOnInit() {
    this.isNotEmpty = false;
    this.items = [];
    this.categories = [];
      this.route
      .queryParamMap
      .pipe(map(params => params.get('categories__designation__in') || ''))
      .subscribe(param => {
            this.categories = this.categoriesCache.fetchCachedCategories();
            this.items = [];
            if (!this.currentProduct) {
              this.setItems(param);
              this.isNotEmpty = true;
            } else {
              this.setItems(this.currentProduct);
              this.isNotEmpty = true;

            }

          });
  }


  getItem(param): Category {
    return this.categories.filter(category => category.designation === param)[0];
  }


  setItems(param) {
    if ( param === '' ) { return ''; }
    this.items.push(param);
    return(this.setItems(this.getItem(param).isRoot ? '' : this.getItem(param).parentCategory.designation));
  }

}
