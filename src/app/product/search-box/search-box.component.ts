import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  visible: boolean;
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  searchBar = new FormControl('');

  constructor(private router: Router, private el: ElementRef) { }
  ngOnInit() {

  this.visible = false;


  this.searchBar.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()).
      subscribe(term => {

        this.router.navigate(['product/list'], { queryParams: { 'search': term }, queryParamsHandling: 'merge'}); } );
}

  toggle() {
    this.visible = !this.visible;
    this.open.emit(this.visible);
    if (!this.visible) {
      this.searchBar.setValue('');
    }
  }
}
