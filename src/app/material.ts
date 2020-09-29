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
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import {LayoutModule} from '@angular/cdk/layout';




@NgModule({
  exports: [MatCheckboxModule, MatButtonModule, MatDividerModule,
            MatTabsModule , MatIconModule , MatBadgeModule, MatToolbarModule,
            MatSnackBarModule, ScrollingModule, MatButtonToggleModule,LayoutModule,
            MatProgressBarModule, MatChipsModule, MatTreeModule,MatRippleModule,
            MatTreeModule,MatSlideToggleModule, MatListModule,MatMenuModule,MatTableModule],
})
export class MaterialModule {}
