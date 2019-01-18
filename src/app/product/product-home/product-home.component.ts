import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AwsObjectsService } from 'src/app/common/aws-objects.service';
import { DomSanitizer } from '@angular/platform-browser';
import { encode } from 'punycode';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {

  @ViewChild('mainImage') image: ElementRef;

  constructor(private aws: AwsObjectsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.aws.getS3Bucket('smc-static-media', 'main_pic.jpg').promise().
    then( data => {
      this.image.nativeElement.src = window.URL.createObjectURL(new Blob([data.Body]));
    });

    }

}
