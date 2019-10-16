import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductShort } from 'src/app/product/model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss']
})
export class ProductBoxComponent implements OnInit, OnChanges  {

  @Input() product: ProductShort;
  @Input() mode: string;
  isLoading: boolean;
  isFetching: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.isFetching = false;
    this.ImageMockup();

  }

  ngOnChanges(changes: SimpleChanges)  {
    this.ImageMockup();
    this.isLoading  = true;

  }


  onImageLoad(evt) {
    this.isLoading  = false;

  }

  navigateTo(id: number) {
    this.isFetching = true;
    this.router.navigate([{
      outlets: {
        primary : ['product', id],
        popup: null }}]);
  }

  ImageMockup() {
    //this.product.thumbNail.content = '/src/assets/images/Pic_1.jpg';
  }


}
