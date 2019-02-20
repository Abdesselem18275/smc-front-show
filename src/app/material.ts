import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSliderModule} from '@angular/material/slider';
import {MatRippleModule} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';







@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
             MatListModule, MatInputModule, MatTabsModule, MatTreeModule,
            MatSelectModule, MatSnackBarModule, MatGridListModule, MatMenuModule,
            MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
            MatTableModule, MatPaginatorModule, MatSliderModule, MatRippleModule,
            MatExpansionModule, BrowserAnimationsModule, MatTooltipModule, MatCardModule,MatSidenavModule],

  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
             MatListModule, MatInputModule, MatTabsModule, MatTreeModule,
             MatSelectModule, MatSnackBarModule, MatGridListModule, MatMenuModule,
             MatDatepickerModule, MatProgressSpinnerModule, MatTableModule, MatPaginatorModule,
             MatSliderModule, MatRippleModule, MatExpansionModule, BrowserAnimationsModule,
             MatTooltipModule, MatCardModule, MatSidenavModule],
})
export class MaterialModule {}
