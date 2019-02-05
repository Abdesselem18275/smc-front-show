import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductDataService } from './product/service/product-data.service';
import { Category } from './product/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'smc-show-case';
  categories: Category[];
  rootCategories: Category[];
  isMenuActive: boolean;

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
    this.isMenuActive = false;
    this.pds.get_elements({model: 'categorie'}).subscribe(
      (categories: Category[]) => {this.categories = categories;
                                   this.rootCategories = this.categories.filter(category => category.isRoot);
      }
    );
  }
  toggleMenu(state) {
    this.isMenuActive = state;
    console.warn(this.isMenuActive);
  }

}
