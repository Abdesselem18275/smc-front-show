import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';







@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
            MatTabsModule, MatListModule, MatInputModule, MatAutocompleteModule,
            MatSelectModule, MatSnackBarModule, MatGridListModule, MatMenuModule,
            MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule],

  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
            MatTabsModule, MatListModule, MatInputModule, MatAutocompleteModule,
             MatSelectModule, MatSnackBarModule, MatGridListModule, MatMenuModule,
             MatDatepickerModule, MatProgressSpinnerModule],
})
export class MaterialModule {}