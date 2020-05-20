import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { centerSlideInAnimation, sideSlideInAnimation, expandAnimation } from 'src/app/animations';
import { Store } from '@ngrx/store';
import { RootStoreState, ModalStoreState } from 'src/app/root-store';
import { selectModalStateByType, selectAllModalState } from 'src/app/root-store/modal-store/selectors';
import { ToggleAction, ToggleUserCard } from 'src/app/root-store/modal-store/actions';
import { Observable } from 'rxjs';
import { UserLanguage } from 'src/app/root-store/global-store/state';
import { selectLanguage } from 'src/app/root-store/global-store/selectors';
import { Category } from 'src/app/product/model';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { UserStoreSelectors } from 'src/app/root-store/user-store';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [centerSlideInAnimation,
    expandAnimation,
    sideSlideInAnimation]
})
export class ProductMenuComponent implements OnInit {

  modalStore$: Observable<ModalStoreState.State>;
  isHomeRoute$: Observable<boolean>;
  favoritesCount$ : Observable<number>;
  @Output() isSideMenuActiveEvent: EventEmitter<boolean> = new EventEmitter();
  constructor( private router: Router,
               private store$: Store<RootStoreState.State>) {


  }
  ngOnInit() {
    this.modalStore$ = this.store$.select(selectAllModalState);
    this.isHomeRoute$ = this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      map(event => event['url'] === '/product/home'));
    this.favoritesCount$ = this.store$.select(UserStoreSelectors.selectFavoritesCount)
  }

  toggleModal(value) {
    this.store$.dispatch(ToggleAction({key: value}));
  }
  toggleUserCard() {
    this.store$.dispatch(ToggleUserCard());
    }
}
