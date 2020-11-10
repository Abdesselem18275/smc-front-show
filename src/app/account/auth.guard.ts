import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Navigation } from '@angular/router';
import { Observable } from 'rxjs';
import { SmcAuthService } from './service/smc-auth.service';
import { Store } from '@ngrx/store';
import { State } from '../root-store/state';
import { UserStoreActions } from '../root-store/user-store';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: SmcAuthService,
              private router: Router,
              private store$: Store<State>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin(this.router.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  checkLogin(redirectUrl: string): boolean {
    if (this.authService.isLogged()) { return true; }

    // Store the attempted URL for redirecting

    // Navigate to the login page with extras
    this.store$.dispatch(
      UserStoreActions.RedirectForAuthentification({redirectUrl:redirectUrl}));
    return false;
  }
}
