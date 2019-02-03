import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Category } from '../model';

@Component({
  selector: 'app-product-menu-item',
  templateUrl: './product-menu-item.component.html',
  styleUrls: ['./product-menu-item.component.scss']
})
export class ProductMenuItemComponent  {
  @Input() categories: Category[];
  @ViewChild('childMenu') public childMenu;

  constructor() { }


}
