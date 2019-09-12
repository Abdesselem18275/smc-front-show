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
    iconRegistry.addSvgIcon('Logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('Telephone', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/telephone_icon.svg'))
                .addSvgIcon('Team', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/team_icon.svg'))
                .addSvgIcon('Bar_code', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/barcode_icon.svg'))
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
