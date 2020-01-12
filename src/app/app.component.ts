import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { RootStoreState, ModalStoreState } from './root-store';
import { Store } from '@ngrx/store';
import { selectAllModalState } from './root-store/modal-store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;
  modalStore$: Observable<ModalStoreState.State>;

  constructor(
              private store$: Store<RootStoreState.State>,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('logo_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_2.svg'))
                .addSvgIcon('german', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/germany.svg'))
                .addSvgIcon('french', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/france.svg'))
                .addSvgIcon('english', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/united-kingdom.svg'));
  }
  ngOnInit() {
    this.modalStore$ = this.store$.select(selectAllModalState);

}
  prepareRoute(outlet: RouterOutlet) {
    const res = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return res || 'empty';
  }

}
