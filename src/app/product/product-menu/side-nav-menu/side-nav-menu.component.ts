import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { constructor } from 'stream';
import { Category } from '../../model';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {


  @Output() isClosed: EventEmitter<boolean> = new EventEmitter();
  @Input() rootCategories: Category[];
  constructor() { }

  ngOnInit() {
    this.isClosed.emit(false);
  }


  toggle() {
    this.isClosed.emit(true);
  }

}
