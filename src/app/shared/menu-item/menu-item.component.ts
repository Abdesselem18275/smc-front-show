import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Category } from 'src/app/product/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit {
  @Input() items: Category[];
  @ViewChild('buildMenu', {static: true}) public buildMenu;
  constructor(public router: Router) { }
  ngAfterViewInit(): void {
    console.warn(this.buildMenu);
  }

}
