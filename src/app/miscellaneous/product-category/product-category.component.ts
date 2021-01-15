import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/core/types';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  @Input() category: Category;
  constructor() { }

  ngOnInit() {


  }
}
