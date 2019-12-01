import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../model';
import { CategoryCacheService } from '../service/category-cache.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { centerSlideInAnimation, sideSlideInAnimation, expandAnimation } from 'src/app/animations';
import { ModalStateStore } from 'src/app/shared/token';
import { Store } from '@ngrx/store';
import { RootStoreState, ModalStoreState } from 'src/app/root-store';
import { selectModalStateByType, selectAllModalState } from 'src/app/root-store/modal-store/selectors';
import { ToggleAction, ToggleUserCard } from 'src/app/root-store/modal-store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [centerSlideInAnimation,
    expandAnimation,
    sideSlideInAnimation]
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
  modalStore$: Observable<ModalStoreState.State>;
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter();


  constructor( private router: Router,
               private categoriesCache: CategoryCacheService,
               private store$: Store<RootStoreState.State>) {


  }
  ngOnInit() {
    this.isActive = true;
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isRootActive = false;
    this.modalStore$ = this.store$.select(selectAllModalState);

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

  getModalState(value) {
    console.warn(value);
    return this.store$.select(selectModalStateByType, {key: value});
  }

  toggleModal(value) {
    console.warn('value + toggleModal');
    this.store$.dispatch(ToggleAction({key: value}));
  }
  toggleUserCard() {
    this.store$.dispatch(ToggleUserCard());
    }
}
