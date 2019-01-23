import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { switchMap } from 'rxjs/operators';
import { ProductLong } from '../model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductLong;
  mainImageUrl: SafeResourceUrl;
  carouselImageUrls: string[];
  relatedImageUrls: string[];
  constructor(private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pds.get_element({value: params.get('id'), model: 'product'}))).
      subscribe((jsonItem: ProductLong) => {
        console.warn(jsonItem);
        this.product = jsonItem;
        this.pds.getSignedUrl(this.product.thumbNail).subscribe(signed => this.mainImageUrl = signed['signedRequest']);

      });

  }

}
