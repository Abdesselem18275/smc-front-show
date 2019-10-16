import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';
import { RouterOutlet} from '@angular/router';
import { sideSlideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sideSlideInAnimation  ]
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;

  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo_inverted', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_inverted.svg'))
                .addSvgIcon('rectangle', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/rectangle.svg'))
                .addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'))
                .addSvgIcon('loading_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loader_2.svg'))
                .addSvgIcon('logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('logo_2', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_2.svg'));




  }
  ngOnInit() {
}
  prepareRoute(outlet: RouterOutlet) {
    const res = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    return res || 'empty';
  }


}
