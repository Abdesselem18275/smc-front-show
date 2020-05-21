import { Injectable } from '@angular/core';
import { MenuTreeData, Category } from 'src/app/product/model';
import { CategoryCacheService } from 'src/app/product/service/category-cache.service';
import { NavigationExtras } from '@angular/router';

const NAV_TREE_DATA: MenuTreeData[]  = [
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


  constructor(private ccs: CategoryCacheService) { 
    this._treeMenu = NAV_TREE_DATA.map((cat: MenuTreeData)  => {
      if (cat.designation === 'products') {
        return {
          ...cat,
          children : this.ccs.fetchCachedCategories()
            .filter(proCat => proCat.isRoot)
            .map(proCat => (this.setCatRouterLink(proCat)))
        };
      }
      return cat;
    });
    console.warn(this._treeMenu)
  }


  get treeMenu() {
    return this._treeMenu;
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
