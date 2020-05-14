import { Category } from 'src/app/product/model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss'],
})
export class TreeMenuComponent implements OnInit {
  currentDesignation: string;
  @Input() categories: Category[];
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  ngOnInit() {
    this.currentDesignation = '';
  }
  toggle(catDesignation: string) {
    this.currentDesignation = this.currentDesignation === catDesignation ? '' : catDesignation;
  }
  toggleClose() {
    this.isClosed.emit(true);
  }

}
