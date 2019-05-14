import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
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
import {MatTreeModule} from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';







@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule,
             MatListModule, MatInputModule, MatTabsModule, MatTreeModule,
            MatSelectModule, MatSnackBarModule, MatMenuModule,
            MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
            MatTableModule, MatPaginatorModule, MatSliderModule, MatRippleModule,
            BrowserAnimationsModule, MatTooltipModule, MatCardModule, MatBadgeModule],

  exports: [MatButtonModule, MatCheckboxModule, MatIconModule,
             MatListModule, MatInputModule, MatTabsModule, MatTreeModule,
             MatSelectModule, MatSnackBarModule, MatMenuModule,
             MatDatepickerModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
             MatSliderModule, MatRippleModule, BrowserAnimationsModule,
             MatTooltipModule, MatCardModule, MatBadgeModule],
})
export class MaterialModule {}
