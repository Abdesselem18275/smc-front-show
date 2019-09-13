import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/product/model';
import { ActivatedRoute } from '@angular/router';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category-breadcrumb',
  templateUrl: './category-breadcrumb.component.html',
  styleUrls: ['./category-breadcrumb.component.scss']
})
export class CategoryBreadcrumbComponent implements OnInit {
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
            } else {
              this.setItems(this.currentProduct);

            }

          });
  }


  getItem(param): Category {
    return this.categories.filter(category => category.designation === param)[0];
  }


  setItems(param) {
    if ( param === '' ) {
      this.items.push('Products');
      return ''; }
    this.items.push(param);
    return(this.setItems(this.getItem(param).isRoot ? '' : this.getItem(param).parentCategory.designation));
  }

}
