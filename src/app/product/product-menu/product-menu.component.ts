import { Component, OnInit } from '@angular/core';
import { Category, BaseImage } from '../model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatIconRegistry } from '@angular/material';
import { ProductDataService } from '../service/product-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width : '15em',
      })),
      state('closed', style({
      })),
      transition('open => closed', [
        animate('0.15s')
      ]),
      transition('closed => open', [
        animate('0.15s')
      ]),
    ]),
  ],
})
export class ProductMenuComponent implements OnInit {

  categories: Category[];
  rootCategories: Category[];
  treeMenu: Category[];
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  isSearch: boolean;
  isMenuActive: boolean;
  isSideMenuActive: boolean;
  isReady: boolean;


  constructor(private pds: ProductDataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


  }
  ngOnInit() {
    this.treeMenu = this.pds.getMenu();
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isReady = false;
    this.pds.getCategories().subscribe(
      (categories: Category[]) => {
                                   this.rootCategories  = [
                                    {
                                      designation: 'Products',
                                      isLeaf: false,
                                      isRoot: true,
                                      children: categories.filter(category => category.isRoot),
                                      parentCategory : null,
                                      thumbNail : null
                                    }];
                                    this.isReady = true;
                                    console.warn(this.rootCategories);

      }
    );
  }
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  toggleSideMenu() {
    this.isSideMenuActive = !this.isSideMenuActive;
  }
  toggleSearch(val) {
    this.isSearch = val;
  }



}
