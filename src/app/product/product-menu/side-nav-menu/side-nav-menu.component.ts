import { Component, OnInit} from '@angular/core';
import { Category, ProductCollection, NavTree } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router, NavigationExtras } from '@angular/router';
import { CollectionCacheService } from '../../service/collection-cache.service';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';


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
  navMenuData: NavTree[];
  isLogged: boolean;
  constructor(private router: Router,
              private authService: SmcAuthService,
              private modalHandlerService: ModalHandlerService,
              private ccs: CategoryCacheService,
              private colcs: CollectionCacheService) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    this.isCollectionOpen = false;
    this.isCategoryOpen = false;
    this.rootCategories = this.ccs.fetchCachedCategories().filter(cat => cat.isRoot);
    this.collectionArray = this.colcs.fetchCachedCollections();
    // this.navMenuData = [
    //   {
    //     designation : 'Products',
    //     level : 1,
    //     children : [
    //       {
    //         designation : 'Categories',
    //         level : 2,
    //         children : <NavTree[]>this.rootCategories.map(x => x.level)
    //       }

    //     ]
    //   },
    //   {

    //   }
    // ]
























  }
  toggleCollection() {
    this.isCollectionOpen = !this.isCollectionOpen;
  }
  toggleCategory() {
    this.isCategoryOpen = !this.isCategoryOpen;
  }

  closeMenu() {
    this.modalHandlerService.closeAll();
  }
  navigateTo(param_key: string, val: string) {
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
