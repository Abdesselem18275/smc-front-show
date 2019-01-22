import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductShort } from '../model';
import { AwsObjectsService } from 'src/app/common/aws-objects.service';

@Component({
  selector: 'app-product-list-composit',
  templateUrl: './product-list-composit.component.html',
  styleUrls: ['./product-list-composit.component.scss']
})
export class ProductListCompositComponent implements OnInit {
@Input() productShort: ProductShort;
@ViewChild('boxImage') image: ElementRef;
isDetail: Boolean;
isReady: Boolean;
displayedColumns: string[] = ['designation', 'height', 'width', 'capacity'];
  constructor(private aws: AwsObjectsService) { }

  ngOnInit() {
    this.isDetail = false;
    this.isReady = false;
    this.aws.getS3Bucket('smc-static-media', this.get_image_name(this.productShort.thumbNail)).promise().
    then( data => {
      this.isReady = true;
      this.image.nativeElement.src = window.URL.createObjectURL(new Blob([data.Body]));
    });
  }



  private get_image_name(url: string) {

   const res =  url === null ? '' : url.substring(url.lastIndexOf('/') + 1);
   return('media/'.concat(res));
  }

  toggle() {
    this.isDetail = !this.isDetail;
  }

}
