import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { RootStoreState, ModalStoreState } from './root-store';
import { Store } from '@ngrx/store';
import { selectAllModalState, selectOverlayedModal } from './root-store/modal-store/selectors';
import { Observable } from 'rxjs';
import { LanguageType} from './root-store/global-store/state';
import { centerSlideInAnimation, expandAnimation, sideSlideInAnimation } from './animations';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { ActivatedRoute, UrlSegment, Router, NavigationEnd } from '@angular/router';
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
  isSideMenuActive: boolean;
  isOverlay$: Observable<boolean>;
  modalStore$: Observable<ModalStoreState.State>;
  showMenu$ :Observable<boolean>;
  @ViewChild('sidenav',{static:false}) sideNav  :MatSidenav

  constructor(
              private router : Router,
              private store$: Store<any>,
               @Inject('APP_BASE_HREF') private baseUrl: string,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo_mini', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_smc_mini.svg'))
                .addSvgIcon('logo_full_white', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_full_white.svg'))
                .addSvgIcon(LanguageType.GERMAN, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/germany.svg'))
                .addSvgIcon(LanguageType.FRENCH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/france.svg'))
                .addSvgIcon(LanguageType.ENGLISH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/united-kingdom.svg'))
                .addSvgIcon('landing-page-illustration', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/Illustration-landing-page.svg'))
                .addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/facebook.svg'))
                .addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/insta.svg'))
                .addSvgIcon('contact-us', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/contact_us_illustration.svg'))
                .addSvgIcon('logo_black_bg', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_black_background.svg'));

                this.isOverlay$ = this.store$.select(selectOverlayedModal);

                this.modalStore$ = this.store$.select(selectAllModalState);
                this.showMenu$ = this.router.events.pipe(
                  filter(event => event instanceof NavigationEnd),
                  tap(event => console.warn(event)),
                  map((event:NavigationEnd) =>
                  !(event.url.includes('account/authentification') ||
                  event.urlAfterRedirects.includes('miscellaneous/home')
                  ))
                )


  }
  toggleSideNav() {
    console.warn(this.sideNav)
    this.sideNav.toggle()

  }
}
