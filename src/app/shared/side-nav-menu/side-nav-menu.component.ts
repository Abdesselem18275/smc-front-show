import { Component, OnInit} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { CloseAllAction, ToggleAction } from 'src/app/root-store/modal-store/actions';
import { Category, ProductCollection, MenuTreeData } from 'src/app/product/model';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { LogoutAction } from 'src/app/root-store/user-store/actions';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/account/model';
import { UserStoreSelectors } from 'src/app/root-store/user-store';
import { LanguageType } from 'src/app/root-store/global-store/state';
import { MenuDataBuilderService } from '../service/menu-data-builder.service';


@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {
  profile$: Observable<Profile>;
  isLoading$: Observable<boolean>;
  navMenuData: MenuTreeData[];
  isLogged$: Observable<boolean>;
  languageType: LanguageType;
  constructor(
              private store$: Store<RootStoreState.State>,
              private navBuilder: MenuDataBuilderService) { }

  ngOnInit() {
    this.profile$ = this.store$.select(UserStoreSelectors.selectUser);
    this.isLoading$ = this.store$.select(UserStoreSelectors.selectIsLoading);
    this.isLogged$ = this.store$.select(UserStoreSelectors.selectIsAuthentificated);
    this.navMenuData = this.navBuilder.treeMenu;
  }

  closeMenu() {
    this.store$.dispatch(CloseAllAction());
  }
  logOut() {
    this.store$.dispatch(LogoutAction());
  }
  login() {
    this.store$.dispatch(ToggleAction({key: 'loginBox'}));
  }
}
