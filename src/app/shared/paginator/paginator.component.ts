import { Component, OnInit , Output, Input } from '@angular/core';

export  class PaginatorState  {
  currentPage: number;
  nextPage: number ;
  prePafe: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnInit {
  @Output() paginatorState: PaginatorState;
  elementsCount: number;
  elementsPerPage: number;
  pageNumber: number;
  constructor() { }
  ngOnInit() {
    this.elementsCount = 53;
    this.elementsPerPage = 100;
    this.pageNumber = Math.ceil(this.elementsCount / this.elementsPerPage);
  }

}
