import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss'],
})
export class TreeMenuComponent implements OnInit {
  isActive: boolean;
  currentIndex: number;
  @Input() categories: Category[];
  constructor() { }
  ngOnInit() {
    this.isActive = false;
    this.currentIndex = -1;
  }
  toggle(i: number) {
    this.isActive = !this.isActive;
    this.currentIndex = i;
  }

}
