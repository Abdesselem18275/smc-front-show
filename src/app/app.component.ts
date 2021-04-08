import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { centerSlideInAnimation, expandAnimation, sideSlideInAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
 
import { GlobalStateService } from 'src/app/shared/state/global-state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [centerSlideInAnimation,
    expandAnimation,
    sideSlideInAnimation]
})
export class AppComponent {
  @ViewChild('sidenav',{static:false}) sideNav!: MatSidenav;
  isSideMenuActive = false;
  isLoading$: Observable<boolean>;
  showMenu$: Observable<boolean>;
  constructor(private gss:GlobalStateService,private router: Router) {
                this.showMenu$ = this.router.events.pipe(
                  filter((event: any) => event instanceof NavigationEnd),
                  map((event: NavigationEnd) =>
                  !(event.url.includes('account/authentification') ||
                  event.urlAfterRedirects.includes('miscellaneous/home')
                  ))
                );
                this.router.events.subscribe(() => this.sideNav.close());
                this.isLoading$ = this.gss.isLoading

  }
  toggleSideNav() {
    this.sideNav.toggle();
  }
}
