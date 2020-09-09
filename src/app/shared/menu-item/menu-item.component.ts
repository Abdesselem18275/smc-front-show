import { Component, Input, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/product.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent  {
  @Input() items: Category[];
  @ViewChild('buildMenu', {static: true}) public buildMenu;
  constructor(public router: Router) { }

}
