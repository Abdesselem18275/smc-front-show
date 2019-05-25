import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../model';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss'],
})
export class TreeMenuComponent implements OnInit {
  currentDesignation: string;
  @Input() categories: Category[];
  constructor() { }
  ngOnInit() {
    this.currentDesignation = '';
  }
  toggle(catDesignation: string) {
    this.currentDesignation = this.currentDesignation === catDesignation ? '' : catDesignation;
  }

}
