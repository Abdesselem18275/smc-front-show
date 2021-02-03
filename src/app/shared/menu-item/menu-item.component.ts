import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/types';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent  {
  @Input() items: Category[] = [];
  @ViewChild('buildMenu', {static: true}) public buildMenu!: any;
  constructor(public router: Router) { }

}
