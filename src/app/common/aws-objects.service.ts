import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { ProductDataService } from '../product/service/product-data.service';



@Injectable({
  providedIn: 'root'
})
export class AwsObjectsService {
  accessKeyId: string;
  secretAccessKey: string;
  s3: AWS.S3;

  constructor(private pds: ProductDataService) {
    this.pds.getCredential().subscribe(
      jsonItem => {
        this.accessKeyId = jsonItem['AWS_ACCESS_KEY_ID'];
        this.secretAccessKey = jsonItem['AWS_SECRET_ACCESS_KEY'];
        this.s3 = new AWS.S3(
          {
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
            region: 'eu-west-3',
            apiVersion: '2006-03-01'
          }
        );


      }
    );
   }
  getS3Bucket(bucket: string, key: string): any {


    const params = {
      Bucket : bucket,
      Key: key
    };

    return this.s3.getObject(params);

  }

  get_image_name(url: string) {

    const res =  url === null ? '' : url.substring(url.lastIndexOf('/') + 1);
    return('media/'.concat(res));
   }



}
