import { Component, Input, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/types';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent  {
  @Input() items: Category[] = [];
  @ViewChild('buildMenu', {static: true}) public buildMenu!: MatMenu | MatButton;
  constructor(public router: Router) { }

}
