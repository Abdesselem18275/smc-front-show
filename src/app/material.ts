import { NgModule } from '@angular/core';
// import { MdcFormFieldModule } from '@angular-mdc/web';
// import { MdcCheckboxModule } from '@angular-mdc/web';
// import { MdcButtonModule } from '@angular-mdc/web';
// import { MdcIconModule } from '@angular-mdc/web';
// import { mat-icon-button Module } from '@angular-mdc/web';
// import { MdcTypographyModule } from '@angular-mdc/web';
// import { MdcTabBarModule } from '@angular-mdc/web';
// import { MdcTextFieldModule } from '@angular-mdc/web';
// import { MdcListModule } from '@angular-mdc/web';
// import { MdcRadioModule } from '@angular-mdc/web';
// import { MdcSnackbarModule } from '@angular-mdc/web';
// import { MdcLinearProgressModule } from '@angular-mdc/web';
// import { MdcSwitchModule } from '@angular-mdc/web';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatIconModule , MatSnackBarModule, MatProgressBarModule, MatSlideToggleModule],

  exports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatIconModule , MatSnackBarModule, MatProgressBarModule, MatSlideToggleModule],
})
export class MaterialModule {}
