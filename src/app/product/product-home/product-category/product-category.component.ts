import { Component, OnInit, Input } from '@angular/core';
import { ProductCollection, Category } from '../../model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CollectionCacheService } from '../../service/collection-cache.service';
import { CategoryCacheService } from '../../service/category-cache.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  @Input() category : Category
  constructor() { }

  ngOnInit() {


  }
}
