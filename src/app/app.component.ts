import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdcIconRegistry } from '@angular-mdc/web';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('Telephone', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/telephone_icon.svg'))
                .addSvgIcon('Team', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/team_icon.svg'))
                .addSvgIcon('Bar_code', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/barcode_icon.svg'))
                .addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/google-icon.svg'));
  }
  ngOnInit() {

  }
}
