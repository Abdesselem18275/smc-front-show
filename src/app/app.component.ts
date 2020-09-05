import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { RootStoreState, ModalStoreState, ModalStoreActions } from './root-store';
import { Store } from '@ngrx/store';
import { selectAllModalState, selectOverlayedModal } from './root-store/modal-store/selectors';
import { Observable } from 'rxjs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LanguageType, UserLanguage } from './root-store/global-store/state';
import { SetLanguageAction } from './root-store/global-store/actions';
import { centerSlideInAnimation, expandAnimation, sideSlideInAnimation } from './animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [centerSlideInAnimation,
    expandAnimation,
    sideSlideInAnimation]
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;
  isOverlay$: Observable<boolean>;
  modalStore$: Observable<ModalStoreState.State>;

  constructor(
              private store$: Store<RootStoreState.State>,
               @Inject('APP_BASE_HREF') private baseUrl: string,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('logo_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_2.svg'))
                .addSvgIcon(LanguageType.GERMAN, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/germany.svg'))
                .addSvgIcon(LanguageType.FRENCH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/france.svg'))
                .addSvgIcon(LanguageType.ENGLISH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/united-kingdom.svg'))
                .addSvgIcon('landing-page-illustration', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/Illustration-landing-page.svg'));


  }
  ngOnInit() {
    this.isOverlay$ = this.store$.select(selectOverlayedModal);
    const language = this.baseUrl.replace(/\//g, '');
    const value: UserLanguage = {
      id : language,
      LanguageType : this.getType(language)
    };
    this.store$.dispatch(SetLanguageAction({key: value}));
    this.modalStore$ = this.store$.select(selectAllModalState);

}
  prepareRoute(outlet: RouterOutlet) {
    const res = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return res || 'empty';
  }

  getType(base: string): string {
    switch (base) {
      case 'fr':
        return LanguageType.FRENCH;
      case 'en':
        return LanguageType.ENGLISH;
      case 'de':
        return LanguageType.GERMAN;
      default:
        return LanguageType.ENGLISH;
    }
  }
}
