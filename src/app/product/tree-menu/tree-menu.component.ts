import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../model';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss']
})
export class TreeMenuComponent implements OnInit {
  @Input() categories: Category[];
  constructor() { }
  ngOnInit() {
  }

}
