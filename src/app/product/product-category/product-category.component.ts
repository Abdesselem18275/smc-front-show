import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../service/product-data.service';
import { Observable } from 'rxjs';
import { Category } from '../model';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {
  categories$: Observable<Category[]>;

  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    this.categories$ = this.pds.categories$;
    this.categories$.subscribe(x => console.warn(x));
  }

}
