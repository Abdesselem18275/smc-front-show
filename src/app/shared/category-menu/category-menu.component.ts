import { Component, OnInit } from '@angular/core';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { Category } from 'src/app/product/model';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {
  rootCategories : Category[];
  constructor(private cs : CategoryCacheService) { }

  ngOnInit(): void {
    let Customarray = this.cs.fetchCachedCategories().filter(cat => cat.isRoot);
    // Customarray.push({
    //   designation:'Products'
    // });
    this.rootCategories = Customarray;
  }

}
