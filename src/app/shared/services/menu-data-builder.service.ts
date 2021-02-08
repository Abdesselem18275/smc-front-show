/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { NavigationExtras, Router, UrlTree } from '@angular/router';
import { Category, MenuTreeData } from 'src/app/models/product.models';


@Injectable({
  providedIn: 'root'
})
export class MenuDataBuilderService {
  navTree:  MenuTreeData[];
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
            designation: 'Our team',
            routerLink: '/about-us',
          }
         ]
       },
       {
        designation: 'Contact us',
        icon: 'perm_phone_msg',
        routerLink: this.router.createUrlTree(['/miscellaneous/home/'],{fragment:'contact-us'}),
      },
    ];
  }

  buildMenuTree = (rootCategories: Category[]): MenuTreeData[] => this.navTree.map((cat: MenuTreeData)  => {
      if (cat.designation === 'products') {
        return {
          ...cat,
          children : rootCategories.map(proCat => (this.setCatRouterLink(proCat)))
        };
      }
      return cat;
    });

  setCatRouterLink(cat: Category): Category & {routerLink: UrlTree } {
    const newCat = {
      ...cat,
      routerLink :this.generateCatRouterLink(cat.designation),
      children: cat.isLeaf ? [] :cat?.children?.map((cate: Category )=>this.setCatRouterLink(cate) )
    };
    return newCat;
  }

  generateCatRouterLink(designation: string): UrlTree {
    const navigationExtras: NavigationExtras = {
      queryParams: { categories__designation__in: designation },
    };
    return this.router.createUrlTree(['/product/list'],navigationExtras);
  }
}
