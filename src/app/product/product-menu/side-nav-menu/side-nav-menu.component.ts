import { Component, OnInit} from '@angular/core';
import { Category, ProductCollection } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router, NavigationExtras } from '@angular/router';
import { CollectionCacheService } from '../../service/collection-cache.service';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ 'max-height': 0, opacity: 0 }),
            animate('200ms ease-out',
                    style({ 'max-height': 200 , opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ 'max-height': 200, opacity: 1 }),
            animate('200ms ease-in',
                    style({ 'max-height': 0  , opacity: 0 }))
          ]
        )
      ]
    )
  ]
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
    this.isCollectionOpen = !this.isCollectionOpen;
  }
  toggleCategory() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  closeMenu() {
    this.router.navigate([{ outlets: { side: null }}]);
  }
  navigateTo(param_key: string, val: string) {
    this.closeMenu();
    const navigationExtras: NavigationExtras = {
      queryParams: { [param_key]: val },
      queryParamsHandling: 'merge'
    };
    this.router.navigate([{
      outlets: {
        primary : 'product/list',
        side: null }}],
        navigationExtras);
  }

  toggleSubMenu(type) {
    switch (type) {
      case('collection') : this.isCollectionOpen = !this.isCollectionOpen;
                           this.isCategoryOpen = false;
           break;
      case('category') : this.isCategoryOpen = !this.isCategoryOpen;
                         this.isCollectionOpen = false;
           break;
    }
  }


}
