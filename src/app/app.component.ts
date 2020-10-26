import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { RootStoreState, ModalStoreState } from './root-store';
import { Store } from '@ngrx/store';
import { selectAllModalState, selectOverlayedModal } from './root-store/modal-store/selectors';
import { Observable } from 'rxjs';
import { LanguageType} from './root-store/global-store/state';
import { centerSlideInAnimation, expandAnimation, sideSlideInAnimation } from './animations';
import { RouterStoreSelectors } from 'src/app/root-store/router-store';
import { ActivatedRoute } from '@angular/router';


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
  isLoginPageActive$ :Observable<boolean>;
  constructor(
              private route : ActivatedRoute,
              private store$: Store<RootStoreState.State>,
               @Inject('APP_BASE_HREF') private baseUrl: string,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_smc.svg'))
                .addSvgIcon('logo_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_2.svg'))
                .addSvgIcon(LanguageType.GERMAN, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/germany.svg'))
                .addSvgIcon(LanguageType.FRENCH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/france.svg'))
                .addSvgIcon(LanguageType.ENGLISH, sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/united-kingdom.svg'))
                .addSvgIcon('landing-page-illustration', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/Illustration-landing-page.svg'))
                .addSvgIcon('logo_black_bg', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_black_background.svg'));

                this.isOverlay$ = this.store$.select(selectOverlayedModal);
                
                //this.store$.dispatch(SetLanguageAction({key: value}));
                this.modalStore$ = this.store$.select(selectAllModalState);
                this.isLoginPageActive$  = this.store$.select(RouterStoreSelectors.isCrrentUrl,{url:'account/authentification'});


  }
}
