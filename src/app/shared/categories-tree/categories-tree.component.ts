import { Component, OnInit, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { MenuTreeData } from 'src/app/core/types';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  @Input() treeData= [];
  treeControl = new NestedTreeControl<MenuTreeData>(node => node.children);
  dataSource= new MatTreeNestedDataSource<MenuTreeData>();
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataSource.data = this.treeData;
  }
  hasChild = (_: number, node: MenuTreeData): boolean => !!node.children && node.children.length > 0;
  iconContext = (node: MenuTreeData): {iconName: string} => ({ iconName: node.icon ? node.icon : ''});

  navigateTo(node: MenuTreeData): void {
    if (node.routerLink) {
      this.router.navigateByUrl(node.routerLink);
    }
  }
}
