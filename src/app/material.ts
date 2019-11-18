import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';

import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatBadgeModule ,MatIconModule ,MatToolbarModule,
            MatSnackBarModule, MatButtonToggleModule, MatProgressBarModule, MatSlideToggleModule],

  exports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatIconModule ,MatBadgeModule, MatToolbarModule,
            MatSnackBarModule, MatButtonToggleModule, MatProgressBarModule, MatSlideToggleModule],
})
export class MaterialModule {}
