import { Component, OnInit , Output, Input, EventEmitter } from '@angular/core';

export  class PaginatorState  {
  currentPage: number;
  nextPage: number ;
  prePage: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
  @Output() paginatorState: PaginatorState;
  @Input() elementsCount: number;
  elementsPerPage: number;
  pagesNumber: number;
  currentPageNumber: number;
  @Output() currentPageNumberEmitter =  new EventEmitter<number>();
  constructor() { }
  ngOnInit() {
    this.elementsCount = 53;
    this.elementsPerPage = 10;
    this.pagesNumber = Math.ceil(this.elementsCount / this.elementsPerPage);
    this.currentPageNumber = 1;
    this.currentPageNumberEmitter.emit(this.currentPageNumber);

  }
  updateIndex(step: number) {
    this.currentPageNumber = this.currentPageNumber + step;
    this.currentPageNumberEmitter.emit(this.currentPageNumber);
  }
  checkInRange(step: number) {
    let _index = this.currentPageNumber + step;
    if ( _index > this.pagesNumber) {
      return false;
    }
    if ( _index <= 0) {
      return false;
    }
    return true;
  }

  pageLowerIndex() {
    return ((this.currentPageNumber - 1) * this.elementsPerPage) + 1;

  }
  pageUpperIndex() {
    return this.currentPageNumber === this.pagesNumber ?
              this.elementsCount : this.currentPageNumber * this.elementsPerPage ;
  }
}