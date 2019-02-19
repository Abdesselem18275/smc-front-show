import { Component, OnInit, HostListener } from '@angular/core';
import { MatIconRegistry, MatTreeNestedDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductDataService } from './product/service/product-data.service';
import { Category } from './product/model';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: Category[];
  rootCategories: Category[];
  treeMenu: Category[];
  isMenuActive: boolean;
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  isSmall: boolean;
  isSearch: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmall = window.innerWidth < 960;}
  constructor(private pds: ProductDataService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('Logo', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/logo.svg'))
                .addSvgIcon('Bar_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/bar_ware.svg'))
                .addSvgIcon('Serve_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/serve_ware.svg'))
                .addSvgIcon('Cook_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/cook_ware.svg'))
                .addSvgIcon('Light_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/light_ware.svg'))
                .addSvgIcon('Home_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/home_ware.svg'))
                .addSvgIcon('Table_ware', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/table_ware.svg'));
  }
  ngOnInit() {
    this.treeMenu = this.pds.getMenu();
    this.isMenuActive = false;
    this.pds.get_elements({model: 'categorie'}).subscribe(
      (categories: Category[]) => {this.categories = categories;
                                   this.treeMenu.
                                         filter(x => x.designation === 'Products')[0].children = this.categories.filter(x => x.isRoot);
                                   this.dataSource.data = this.treeMenu.filter(x => x.isRoot);
                                   this.rootCategories = this.categories.filter(category => category.isRoot);
      }
    );
  }
  toggleMenu(state) {
    this.isMenuActive = state;
  }
  toggleSearch(val) {
    this.isSearch = val;
  }

  hasChild = (_: number, node: Category) => !node.isLeaf;

}
