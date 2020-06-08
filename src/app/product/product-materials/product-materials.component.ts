import { Component, OnInit, Input } from '@angular/core';
import { ProductShort } from '../model';

@Component({
  selector: 'app-product-materials',
  templateUrl: './product-materials.component.html',
  styleUrls: ['./product-materials.component.scss']
})
export class ProductMaterialsComponent implements OnInit {
  @Input() product : ProductShort;
  constructor() { }

  ngOnInit(): void {
  }

}
