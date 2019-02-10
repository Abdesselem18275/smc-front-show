import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private route: ActivatedRoute, private pds: ProductDataService) { }

  ngOnInit() {
    this.items = [];
    this.categories = [];
    this.route
      .queryParamMap
      .pipe(map(params => params.get('category') || ''))
      .subscribe(param => {
        this.pds.get_elements({model: 'categorie'})
          .subscribe((categories: Category[]) => {
            this.categories = categories;
            this.items = [];
            this.setItems(param);
            console.warn(param);
          });
          });
        }


  getItem(param): Category {
    return this.categories.filter(category => category.designation === param)[0];
  }


  setItems(param) {
    if ( param === '' ) { return ''; }
    this.items.push(param);
    return(this.setItems(this.getItem(param).isRoot ? '' : this.getItem(param).parentCategory.designation ));
  }

}
