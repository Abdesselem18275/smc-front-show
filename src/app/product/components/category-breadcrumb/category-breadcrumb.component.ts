import { Component, OnInit, Input } from '@angular/core';
import { Category, Product } from 'src/app/models/product.models';
import { Observable } from 'rxjs';
import { GlobalStateService } from 'src/app/shared/state/global-state.service';

@Component({
  selector: 'app-category-breadcrumb',
  templateUrl: './category-breadcrumb.component.html',
  styleUrls: ['./category-breadcrumb.component.scss']
})
export class CategoryBreadcrumbComponent implements OnInit {
  @Input()
  currentProduct!: Product;
  categories: Category[] = [];
  items: string[] = [];
  isNotEmpty = true;
  breadCrumb$!: Observable<Category[]>;


  constructor(private gss:GlobalStateService) { }

  ngOnInit(): void {
    this.breadCrumb$ = this.gss.getBreadCrumb(this.currentProduct?.rootCategory)
  }


}
