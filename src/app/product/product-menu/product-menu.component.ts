import { Component, OnInit } from '@angular/core';
import { Category } from '../model';
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
        width : '20em',
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
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  isSearchActive: boolean;
  isMenuActive: boolean;
  isSideMenuActive: boolean;
  isRootActive: boolean;
  isReady: boolean;


  constructor(private pds: ProductDataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


  }
  ngOnInit() {
    this.isMenuActive = false;
    this.isSideMenuActive = false;
    this.isRootActive = false;
    this.isReady = false;
    this.pds.getCategories().subscribe(
      (categories: Category[]) => {
                                   this.rootCategories  = categories.filter(category => category.isRoot);
                                    const treeMenu: Category[] = [
                                      {
                                        designation: 'Our products',
                                        isLeaf: false,
                                        isRoot: true,
                                        children: this.rootCategories,
                                        thumbNail : null,
                                        parentCategory : null,
                                        svgIcon : null
                                      }
                                    ];
                                    this.rootCategories = treeMenu;
                                    this.isReady = true;


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
    this.isSearchActive = val;
  }
  toggleRoot() {
    this.isRootActive = !this.isRootActive;
  }


}
