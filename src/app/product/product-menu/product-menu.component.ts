import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CategoryCacheService } from '../service/category-cache.service';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/account/service/auth.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ 'max-height': 0, opacity: 0 }),
            animate('300ms ease-out',
                    style({ 'max-height': 200 , opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ 'max-height': 200, opacity: 1 }),
            animate('300ms ease-in',
                    style({ 'max-height': 0  , opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ProductMenuComponent implements OnInit {

  categories: Category[];
  rootCategories: Category[];
  isMenuActive: boolean;
  isSideMenuActive: boolean;
  isRootActive: boolean;
  isReady: boolean;
  isScrollingUp: boolean;
  isActive: boolean;
  isCardActive: boolean;
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter();


  constructor( private router: Router,
               private categoriesCache: CategoryCacheService,
               private authService: AuthService) {


  }
  ngOnInit() {
    this.isCardActive = false;
    this.isActive = true;
    this.isScrollingUp = true;
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isRootActive = false;

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
  toggleRoot() {
    this.isRootActive = !this.isRootActive;
  }

  closePopups() {
    this.router.navigate([{ outlets: { popup: null }}]);
  }
  cardToggle() {
    if (!this.authService.isLogged()) {
      this.router.navigate([{ outlets: {popup: ['login'] }}]);
    } else {

      this.isCardActive = !this.isCardActive;

    }
    // if (!this.isCardActive) {
    //   this.closePopups();
    // }
  }
}
