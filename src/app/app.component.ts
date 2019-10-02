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
    sideSlideInAnimation
  ]
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;

  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo_inverted', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_inverted.svg'))
                .addSvgIcon('rectangle', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/rectangle.svg'))
                .addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'));

  }
  ngOnInit() {
}
  prepareRoute(outlet: RouterOutlet) {
    const res = outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    console.warn(res || 'empty');

    return res || 'empty';

  }


}
