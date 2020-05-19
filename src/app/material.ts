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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeModule} from '@angular/material/tree';
import {MatRippleModule} from '@angular/material/core';


import {BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatBadgeModule , MatInputModule, MatIconModule , MatToolbarModule,
            MatSnackBarModule, MatSelectModule,  ScrollingModule, MatFormFieldModule, 
            MatButtonToggleModule, MatTreeModule,MatRippleModule, MatRadioModule,MatProgressBarModule, 
            MatSlideToggleModule, MatListModule,MatMenuModule],

  exports: [BrowserAnimationsModule, MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule, MatSelectModule , MatIconModule , MatInputModule, MatBadgeModule, MatToolbarModule,
            MatSnackBarModule, MatFormFieldModule, ScrollingModule, MatButtonToggleModule, 
            MatProgressBarModule, MatRadioModule,MatRippleModule, MatTreeModule,MatSlideToggleModule, MatListModule,MatMenuModule],
})
export class MaterialModule {}
