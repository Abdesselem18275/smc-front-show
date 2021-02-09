import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { LanguageType} from './root-store/global-store/state';
import { centerSlideInAnimation, expandAnimation, sideSlideInAnimation } from './animations';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter, tap } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';


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
  showMenu$: Observable<boolean>;
  constructor(private router: Router) {
                this.showMenu$ = this.router.events.pipe(
                  filter((event: any) => event instanceof NavigationEnd),
                  map((event: NavigationEnd) =>
                  !(event.url.includes('account/authentification') ||
                  event.urlAfterRedirects.includes('miscellaneous/home')
                  ))
                );
                this.router.events.subscribe(() => this.sideNav.close());

  }
  toggleSideNav() {
    this.sideNav.toggle();
  }
}
