import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import { ParamType } from '../../models/product.models';
import { Store } from '@ngrx/store';
import { Router, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  searchBar = new FormControl('');
  searchTerm: string;


  constructor(private router: Router,
              private matDialog: MatDialog) { }
  ngOnInit() {
  this.searchBar.valueChanges.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(term => {
        this.searchTerm = term;
      }),
      filter((term: string) => term !== '' && term.length > 2)).subscribe(term => {
       const navExtra:NavigationExtras = {
         queryParams : {
           search:term
         },
       }
       this.router.navigate(['/product/list'],navExtra)
       if(!this.router.url.includes('product/list')) {
        this.router.navigate(['product/list']);

       }

      });

}

}
