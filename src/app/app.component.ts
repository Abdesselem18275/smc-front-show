import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
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
                .addSvgIcon('Down_arrow', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/down_arrow.svg'))
                .addSvgIcon('Serve_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/serve_ware.svg'))
                .addSvgIcon('Cook_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cook_ware.svg'))
                .addSvgIcon('Light_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/light_ware.svg'))
                .addSvgIcon('Home_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home_ware.svg'))
                .addSvgIcon('Table_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/table_ware.svg'))
                .addSvgIcon('Bar_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/bar_ware.svg'))
                .addSvgIcon('Hanno', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/hanno_collection.svg'))
                .addSvgIcon('Micro_wave', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/microwave_icon.svg'))
                .addSvgIcon('Cooking_plate', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cooking_plate.svg'))
                .addSvgIcon('Ear_feature', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ear_icon.svg'))
                .addSvgIcon('Handle_feature', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/handle_icon.svg'))
                .addSvgIcon('Telephone', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/telephone_icon.svg'))
                .addSvgIcon('Team', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/team_icon.svg'))
                .addSvgIcon('Gift', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/gift_icon.svg'))
                .addSvgIcon('Bar_code', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/barcode_icon.svg'))
                .addSvgIcon('List_view_base', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/baseline-view_list-24px.svg'))
                .addSvgIcon('Stream_view_base', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/baseline-view_stream-24px.svg'))
                .addSvgIcon('List_view_outline', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/outline-view_list-24px.svg'))
                .addSvgIcon('Stream_view_outline', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/outline-view_stream-24px.svg'));
  }
  ngOnInit() {

  }
}
