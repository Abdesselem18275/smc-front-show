import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../model';
import { trigger, style, transition, animate } from '@angular/animations';
import { CategoryCacheService } from '../service/category-cache.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/account/service/auth.service';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';

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
            style({ 'transform': 'translateX(150%)'}),
            animate('150ms ease-out',
                    )
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity : 1 }),
            animate('150ms ease-in',
               style({opacity : 0})     )
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
               private modalHandler: ModalHandlerService,
               private authService: AuthService) {


  }
  ngOnInit() {
    this.isCardActive = false;
    this.isActive = true;
    this.isScrollingUp = true;
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isRootActive = false;

    this.modalHandler.profileCardToggeler.subscribe( x => {
      this.isCardActive = x;
    });

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

      this.isCardActive ? this.modalHandler.closeAll() : this.modalHandler.openProfileCard();

    }

  }
}
