import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import {MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';

import { MdcFormFieldModule } from '@angular-mdc/web';
import { MdcCheckboxModule } from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';
import { MdcIconModule } from '@angular-mdc/web';
import { MdcCardModule } from '@angular-mdc/web';
import { MdcIconButtonModule } from '@angular-mdc/web';
import { MdcTypographyModule } from '@angular-mdc/web';
import { MdcElevationModule } from '@angular-mdc/web';







@NgModule({
  imports: [MdcCardModule, MatDividerModule, MdcButtonModule, MatIconModule, MdcIconModule,
            MatTabsModule,  MdcIconButtonModule, MdcTypographyModule, MatNativeDateModule
            , MatPaginatorModule, MatSliderModule, MatRippleModule, MdcElevationModule,
            BrowserAnimationsModule, MatTooltipModule, MatCardModule, MatBadgeModule, MdcFormFieldModule, MdcCheckboxModule],

  exports: [MdcCardModule, MatDividerModule, MdcButtonModule, MatIconModule, MatNativeDateModule,
             MatTabsModule, MdcIconModule, MdcIconButtonModule, MdcTypographyModule, MatPaginatorModule,
             MatSliderModule, MatRippleModule, BrowserAnimationsModule, MdcElevationModule,
             MatTooltipModule, MatCardModule, MatBadgeModule, MdcFormFieldModule, MdcCheckboxModule],
})
export class MaterialModule {}
