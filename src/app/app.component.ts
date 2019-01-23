import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smc-show-case';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('Bar_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/bar_ware.svg'))
                .addSvgIcon('Serve_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/serve_ware.svg'))
                .addSvgIcon('Cook_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cook_ware.svg'))
                .addSvgIcon('Light_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/light_ware.svg'))
                .addSvgIcon('Home_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home_ware.svg'))
                .addSvgIcon('Table_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/table_ware.svg'));
  }

}
