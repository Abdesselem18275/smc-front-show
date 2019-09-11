import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height : 'auto',
      })),
      state('closed', style({
      })),
      transition('open => closed', [
        animate('0.15s')
      ]),
      transition('closed => open', [
        animate('0.15s')
      ]),
    ]),
  ],
})
export class SideNavMenuComponent implements OnInit {
  isCollectionOpen: Boolean;
  isCategoryOpen: Boolean;

  rootCategories: Category[];
  constructor(private ccs: CategoryCacheService) { }

  ngOnInit() {
    this.isCollectionOpen = false;
    this.isCategoryOpen = false;
    this.rootCategories = this.ccs.categories;
    console.warn(this.rootCategories);
  }
  toggleCollection() {
    this.isCollectionOpen = !this.isCollectionOpen
  }
  toggleCategory() {
    this.isCategoryOpen = !this.isCategoryOpen
  }

}
