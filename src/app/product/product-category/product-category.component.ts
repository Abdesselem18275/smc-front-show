import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../service/product-data.service';
import { Category, ProductCollection } from '../model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']

})
export class ProductCategoryComponent implements OnInit {
  collections: ProductCollection[];
  hoveredIndex: number;
  hoveredDescription: string;
  constructor(private pds: ProductDataService) { }

  ngOnInit() {
    this.hoveredIndex = -1;
    this.hoveredDescription = '-';
    this.collections = this.pds.getCollections();
  }
  toggleCollection(i) {
    this.hoveredIndex = i ;
    this.hoveredDescription = i === -1 ? '-' : this.collections[i].description;

  }
}
