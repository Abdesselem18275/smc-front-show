import { Component, OnInit} from '@angular/core';
import { ProductDataService } from '../service/product-data.service';
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
    let map1 = new Map().set('abdesselem', '50');
    let map2 = new Map().set('idani', '42');
    let map3 = new Map().set('idani', '42');

    let map4 = new Set([map1, map2, map3]);

    this.categories = this.categoryCache.fetchCachedCategories().filter(category => category.isLeaf);
  }

}
