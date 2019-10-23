import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';
import { RouterOutlet} from '@angular/router';
import { sideSlideInAnimation, centerSlideInAnimation } from './animations';
import { ModalStateStore } from './shared/token';
import { ModalHandlerService } from './shared/service/modal-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    centerSlideInAnimation, sideSlideInAnimation ]
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;
  modalStateStore  = new ModalStateStore();

  constructor(private modalHandler: ModalHandlerService,
              iconRegistry: MdcIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry.addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('logo_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_2.svg'));
  }
  ngOnInit() {
    this.modalHandler.ModalToggeler$.subscribe( state => {
      this.modalStateStore = state;
    });
}
  prepareRoute(outlet: RouterOutlet) {
    const res = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return res || 'empty';
  }

}
