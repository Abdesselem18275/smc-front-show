import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {

  rootCategories: Category[];
  constructor(private ccs: CategoryCacheService) { }

  ngOnInit() {
    this.rootCategories = this.ccs.categories;
  }

}
