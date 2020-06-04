import { Component, OnInit, Input } from '@angular/core';
import { MenuTreeData } from 'src/app/product/model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  @Input() treeData: [];
  treeControl: any;
  dataSource: any;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<MenuTreeData>(node => node.children);
    this.dataSource = new MatTreeNestedDataSource<MenuTreeData>();
    this.dataSource.data = this.treeData;
  }
  hasChild = (_: number, node: MenuTreeData) => !!node.children && node.children.length > 0;
  iconContext = (node:MenuTreeData) => ({ iconName: node.icon ? node.icon : ''});

  navigateTo(node:MenuTreeData) {
    if (node.routerLink) {
      if(Array.isArray(node.routerLink)) {
        this.router.navigate([node.routerLink[0]],node.routerLink[1]);
      } else {
        this.router.navigate([node.routerLink])
      }
    }
  }
}
