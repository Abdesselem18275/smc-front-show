import { Component, OnInit, Input, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { ProductShort } from 'src/app/product/model';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnChanges  {

  @Input() product: ProductShort;
  @Input() mode: string;
  isLoading: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
  }

  ngOnChanges(changes: SimpleChanges)  {
    this.isLoading  = true;

  }


  onImageLoad(evt) {
    this.isLoading  = false;

  }

  navigateTo(id: number) {
    this.router.navigate([{
      outlets: {
        primary : ['product', id],
        popup: null }}]);
  }


}
