import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductDataService } from '../service/product-data.service';
import { Category } from '../model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.scss']
})
export class ProductBreadcrumbComponent implements OnInit {
  categories: Category[];
  items: string[];
  @Input() currentProduct?: string;

  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }

  ngOnInit() {
    this.items = [];
    this.categories = [];
      this.route
      .queryParamMap
      .pipe(map(params => params.get('categories__designation__in') || ''))
      .subscribe(param => {
        this.pds.getCategories()
          .subscribe((categories: Category[]) => {
            this.categories = categories;
            this.items = [];
            if (!this.currentProduct) {
              this.setItems(param);
            } else {
              this.setItems(this.currentProduct);

            }
          });
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
