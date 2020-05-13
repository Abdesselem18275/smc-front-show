import { Component, OnInit, ViewChild} from '@angular/core';
import { Category } from '../model';
import { CategoryCacheService } from '../service/category-cache.service';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  categories: Category[];

  constructor(private categoryCache: CategoryCacheService) { }
  ngOnInit() {


    this.categories = this.categoryCache.fetchCachedCategories().filter(category => category.isRoot);
  }

}
