import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSideMenuActive: boolean;

  constructor( iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo_inverted', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo_inverted.svg'))
                .addSvgIcon('rectangle', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/rectangle.svg'))
                .addSvgIcon('loading', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/loading_logo.svg'));

  }
  ngOnInit() {
    this.isSideMenuActive = false;

  }
  toggleSideNav(event) {
    this.isSideMenuActive =   event;
  }
}
