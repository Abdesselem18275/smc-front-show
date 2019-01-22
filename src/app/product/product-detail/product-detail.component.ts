import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductDataService } from '../service/product-data.service';
import { switchMap } from 'rxjs/operators';
import { ProductLong } from '../model';
import { AwsObjectsService } from 'src/app/common/aws-objects.service';
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
  constructor(private sanitizer: DomSanitizer, private aws: AwsObjectsService,
              private pds: ProductDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.pds.get_element({value: params.get('id'), model: 'product'}))).
      subscribe((jsonItem: ProductLong) => {
        console.warn(jsonItem);
        this.product = jsonItem;
        this.aws.getS3Bucket('smc-static-media', this.aws.get_image_name(this.product.thumbNail)).promise().
        then( data => {
          this.mainImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(new Blob([data.Body])));
        });

      });

  }

}
