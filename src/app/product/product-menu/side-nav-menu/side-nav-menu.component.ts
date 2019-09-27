import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category, ProductCollection } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { CollectionCacheService } from '../../service/collection-cache.service';

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
  collectionArray: ProductCollection[];
  constructor(private router: Router, private ccs: CategoryCacheService, private colcs: CollectionCacheService) { }

  ngOnInit() {
    this.isCollectionOpen = false;
    this.isCategoryOpen = false;
    this.rootCategories = this.ccs.fetchCachedCategories().filter(cat => cat.isRoot);
    this.collectionArray = this.colcs.fetchCachedCollections();
  }
  toggleCollection() {
    this.isCollectionOpen = !this.isCollectionOpen
  }
  toggleCategory() {
    this.isCategoryOpen = !this.isCategoryOpen
  }

  closeMenu() {
    this.router.navigate([{ outlets: { side: null }}]);
  }


}
