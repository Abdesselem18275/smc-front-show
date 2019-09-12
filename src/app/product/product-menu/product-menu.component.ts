import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CategoryCacheService } from '../service/category-cache.service';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width : '25rem',
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
export class ProductMenuComponent implements OnInit {

  categories: Category[];
  rootCategories: Category[];
  isSearchActive: boolean;
  isMenuActive: boolean;
  isSideMenuActive: boolean;
  isRootActive: boolean;
  isAccountCardActive: boolean;
  isReady: boolean;
  isScrollingUp: boolean;
  isActive: boolean;
  @Output() isSideMenuActiveEvent : EventEmitter<boolean> = new EventEmitter();


  constructor( private router: Router, private categoriesCache: CategoryCacheService) {


  }
  ngOnInit() {
    this.isActive = true;
    this.isScrollingUp = true;
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isRootActive = false;
    this.isAccountCardActive = false;
    this.isSearchActive = false;
    this.rootCategories  = this.categoriesCache.fetchCachedCategories().filter(category => category.isRoot);
    const treeMenu: Category[] = [
      {
        designation: 'Our products',
        isLeaf: false,
        isRoot: true,
        children: this.rootCategories,
        thumbNail : null,
        parentCategory : null,
        svgIcon : null
          }
          ];
    this.rootCategories = treeMenu;
    let prevPosition = window.pageYOffset;
    const pageByScroll$ = fromEvent(window, 'scroll').pipe(debounceTime(100)).subscribe((x) => {
          this.isScrollingUp = prevPosition > window.scrollY;
          prevPosition = window.scrollY;
      });
    this.router.events.pipe(filter(x =>
      x instanceof NavigationEnd
      )).subscribe(event => {
        this.isActive = !(event['url'] === '/product/home');
      });
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  toggleSideMenu() {
    this.isSideMenuActive = !this.isSideMenuActive;
    this.isSideMenuActiveEvent.emit(this.isSideMenuActive);
  }
  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  toggleRoot() {
    this.isRootActive = !this.isRootActive;
  }
  toggleAccountCard() {
    this.isAccountCardActive = !this.isAccountCardActive;
  }


}
