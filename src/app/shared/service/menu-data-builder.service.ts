import { Injectable } from '@angular/core';
import { MenuTreeData, Category } from 'src/app/models/product.models';
import { NavigationExtras } from '@angular/router';

const INIT_NAV_TREE_DATA: MenuTreeData[]  = [
  {
    designation : 'products',
    icon : 'category',
    children : []
  },
  {
    designation : 'Utilities',
    icon: 'info',
    children : [
      {
        designation : 'Mainteance tips',
        routerLink : '/Mainteance'
      },
      {
        designation : 'Copper benefits',
        routerLink : '/Copper'
      },
      {
        designation : 'returns',
        routerLink : '/returns'
      },
      {
        designation : 'Paiments Information',
        routerLink : ''
      }
    ]
  },
   {
     designation: 'About us',
     routerLink: '/about-us',
     icon: 'contact_support',
     children : [
      {
        designation: 'Who we are',
        routerLink: '/about-us',
      },
      {
        designation: 'Contact us',
        routerLink: '/about-us',
      },
      {
        designation: 'Our team',
        routerLink: '/about-us',
      }
     ]
   }
];
@Injectable({
  providedIn: 'root'
})
export class MenuDataBuilderService {
  _treeMenu : MenuTreeData[];

  get treeMenu() {
    return this._treeMenu;
  }

  buildMenuTree = (rootCategories: Category[]) => {
    return INIT_NAV_TREE_DATA.map((cat: MenuTreeData)  => {
      if (cat.designation === 'products') {
        return {
          ...cat,
          children : rootCategories.map(proCat => (this.setCatRouterLink(proCat)))
        };
      }
      return cat;
    });

  }

  setCatRouterLink(cat : Category) {
    const newCat = {
      ...cat,
      routerLink :this.generateCatRouterLink(cat.designation),
      children: cat.isLeaf ? [] :cat.children.map(cat =>this.setCatRouterLink(cat) )
    }
    return newCat;
  }

  generateCatRouterLink(designation:string) {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'categories__designation__in': designation },
      queryParamsHandling : 'merge'
    };
    return ['/product/list',navigationExtras]
  }
}
