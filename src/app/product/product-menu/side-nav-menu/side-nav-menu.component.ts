import { Component, OnInit} from '@angular/core';
import { Category, ProductCollection, NavTree } from '../../model';
import { CategoryCacheService } from '../../service/category-cache.service';
import { trigger, style, transition, animate } from '@angular/animations';
import { Router, NavigationExtras } from '@angular/router';
import { SmcAuthService } from 'src/app/account/service/smc-auth.service';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/root-store';
import { CloseAllAction, ToggleAction } from 'src/app/root-store/modal-store/actions';


@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {
  isCollectionOpen: Boolean;
  isCategoryOpen: Boolean;
  rootCategories: Category[];
  collectionArray: ProductCollection[];
  navMenuData: NavTree[]  = [
    {
      designation : 'company',
      children : [
        {
          designation : 'About us',
          routerLink : ''
        },
        {
          designation : 'Contact us',
          routerLink : ''
        }
      ]
    },
    {
      designation : 'Utility',
      children : [
        {
          designation : 'Mainteance tips',
          routerLink : ''
        },
        {
          designation : 'Copper benefits',
          routerLink : ''
        },
        {
          designation : 'returns',
          routerLink : ''
        },
        {
          designation : 'Paiments Information',
          routerLink : ''
        }
      ]
    }
  ]
  isLogged: boolean;
  constructor(private router: Router,
              private authService: SmcAuthService,
              private store$: Store<RootStoreState.State>,
              private ccs: CategoryCacheService) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    this.isCollectionOpen = false;
    this.isCategoryOpen = false;
    this.rootCategories = this.ccs.fetchCachedCategories().filter(cat => cat.isRoot);
  }

  closeMenu() {
    this.store$.dispatch(CloseAllAction());
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
  logOut() {
    this.authService.logout();
    this.router.navigate(['product/list']);
  }
  login() {
    this.store$.dispatch(ToggleAction({key: 'loginBox'}));
  }
}
