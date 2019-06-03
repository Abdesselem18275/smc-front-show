import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
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







@NgModule({
  imports: [MdcCardModule, MatDividerModule, MdcButtonModule, MatIconModule, MdcIconModule,
            MatTabsModule, MatSnackBarModule, MatMenuModule,
            MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
            MatTableModule, MatPaginatorModule, MatSliderModule, MatRippleModule,
            BrowserAnimationsModule, MatTooltipModule, MatCardModule, MatBadgeModule, MdcFormFieldModule, MdcCheckboxModule],

  exports: [MdcCardModule, MatDividerModule, MdcButtonModule, MatIconModule,
             MatTabsModule, MdcIconModule,
             MatSnackBarModule, MatMenuModule,
             MatDatepickerModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
             MatSliderModule, MatRippleModule, BrowserAnimationsModule,
             MatTooltipModule, MatCardModule, MatBadgeModule, MdcFormFieldModule, MdcCheckboxModule],
})
export class MaterialModule {}
