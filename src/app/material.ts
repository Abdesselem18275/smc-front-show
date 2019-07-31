import { NgModule } from '@angular/core';
import { MdcFormFieldModule } from '@angular-mdc/web';
import { MdcCheckboxModule } from '@angular-mdc/web';
import { MdcButtonModule } from '@angular-mdc/web';
import { MdcIconModule } from '@angular-mdc/web';
import { MdcCardModule } from '@angular-mdc/web';
import { MdcIconButtonModule } from '@angular-mdc/web';
import { MdcTypographyModule } from '@angular-mdc/web';
import { MdcElevationModule } from '@angular-mdc/web';
import { MdcTabBarModule } from '@angular-mdc/web';
import { MdcTextFieldModule } from '@angular-mdc/web';
import { MdcListModule } from '@angular-mdc/web';
import { MdcRadioModule } from '@angular-mdc/web';
import { MdcSelectModule } from '@angular-mdc/web';

import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [MdcCardModule, MdcButtonModule, MdcIconModule, MdcIconButtonModule, MdcTypographyModule,
            MdcTextFieldModule, MdcElevationModule, MdcFormFieldModule, MdcCheckboxModule, MdcTabBarModule, BrowserAnimationsModule,
            MdcListModule, MdcRadioModule, MdcSelectModule],

  exports: [MdcCardModule, MdcButtonModule, MdcIconModule, MdcIconButtonModule,
            MdcTextFieldModule, MdcTypographyModule, MdcElevationModule, MdcFormFieldModule,
            MdcCheckboxModule, MdcTabBarModule, BrowserAnimationsModule , MdcListModule, MdcRadioModule, MdcSelectModule],
})
export class MaterialModule {}
