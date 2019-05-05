import { Component, OnInit, HostListener } from '@angular/core';
import { Category } from '../model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatIconRegistry } from '@angular/material';
import { ProductDataService } from '../service/product-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent implements OnInit {

  categories: Category[];
  rootCategories: Category[];
  treeMenu: Category[];
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  isSmall: boolean;
  isSearch: boolean;
  isMenuActive: boolean;
  isSideMenuActive: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmall = window.innerWidth < 960;
  }
  constructor(private pds: ProductDataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


  }
  ngOnInit() {
    this.treeMenu = this.pds.getMenu();
    this.isMenuActive = false;
    this.pds.getCategories().subscribe(
      (categories: Category[]) => {this.categories = categories;
                                   this.treeMenu.
                                         filter(x => x.designation === 'Products')[0].children = this.categories.filter(x => x.isRoot);
                                   this.dataSource.data = this.treeMenu.filter(x => x.isRoot);
                                   this.rootCategories = this.categories.filter(category => category.isRoot);
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

  hasChild = (_: number, node: Category) => !node.isLeaf;

}
