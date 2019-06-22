import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width : '10em',
        visibility : 'visible'
      })),
      state('closed', style({
        outline: 'none'
      })),
      transition('open => closed', [
        animate('0s')
      ]),
      transition('closed => open', [
        animate('0s')
      ]),
    ]),
    trigger('openCloseSmall', [
      // ...
      state('open', style({
        width : 'calc(100vw)',
        visibility : 'visible'
      })),
      state('closed', style({
        outline: 'none'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class SearchBoxComponent implements OnInit {
  isOpen: boolean;
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  searchBar = new FormControl('');
  iconName: string;

  constructor(private router: Router, private el: ElementRef) { }
  ngOnInit() {
  this.isOpen = false;
  this.iconName = 'search';

  this.searchBar.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()).
      subscribe(term => {

        this.router.navigate(['product/list'], { queryParams: { 'search': term }, queryParamsHandling: 'merge'}); } );
}

  toggle() {
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
    if (!this.isOpen && this.searchBar.value !== '') {
      this.searchBar.setValue('');
    }
    this.iconName = this.isOpen ? 'close' : 'search';
  }
}
