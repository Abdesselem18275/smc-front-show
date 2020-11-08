import { Injectable } from '@angular/core';
import { MenuTreeData, Category } from 'src/app/models/product.models';
import { NavigationExtras, Router, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuDataBuilderService {
  navTree :  MenuTreeData[]
  constructor(private router: Router) {
    this.navTree  = [
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
            routerLink: this.router.createUrlTree(['/miscellaneous/home/'],{fragment:'about-us'}),
          },
          {
            designation: 'Contact us',
            routerLink: this.router.createUrlTree(['/miscellaneous/home/'],{fragment:'contact-us'}),
          },
          {
            designation: 'Our team',
            routerLink: '/about-us',
          }
         ]
       }
    ];
  }

  buildMenuTree = (rootCategories: Category[]):MenuTreeData[] => {
    return this.navTree.map((cat: MenuTreeData)  => {
      if (cat.designation === 'products') {
        return {
          ...cat,
          children : rootCategories.map(proCat => (this.setCatRouterLink(proCat)))
        };
      }
      return cat;
    });

  }

  setCatRouterLink(cat : Category):Category & {routerLink: UrlTree } {
    const newCat = {
      ...cat,
      routerLink :this.generateCatRouterLink(cat.designation),
      children: cat.isLeaf ? [] :cat.children.map(cat =>this.setCatRouterLink(cat) )
    }
    return newCat;
  }

  generateCatRouterLink(designation:string): UrlTree {
    const navigationExtras: NavigationExtras = {
      queryParams: { categories__designation__in: designation },
    };
    return this.router.createUrlTree(['/product/list'],navigationExtras)
  }
}
