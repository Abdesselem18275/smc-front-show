import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../model';
import { trigger, style, transition, animate } from '@angular/animations';
import { CategoryCacheService } from '../service/category-cache.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ModalHandlerService } from 'src/app/shared/service/modal-handler.service';
import { centerSlideInAnimation } from 'src/app/animations';
import { ModalStateStore } from 'src/app/shared/token';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [centerSlideInAnimation]
})
export class ProductMenuComponent implements OnInit {

  categories: Category[];
  rootCategories: Category[];
  modalStateStore = new ModalStateStore();
  isMenuActive: boolean;
  isSideMenuActive: boolean;
  isRootActive: boolean;
  isReady: boolean;
  isActive: boolean;

  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter();


  constructor( private router: Router,
               private categoriesCache: CategoryCacheService,
               private modalHandler: ModalHandlerService) {


  }
  ngOnInit() {
    this.isActive = true;
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

  toggleModal(key) {
    this.modalHandler.toggleModal(key);
  }
}
