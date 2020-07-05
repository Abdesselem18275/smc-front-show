import { Injectable } from '@angular/core';
import AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import { encode } from 'querystring';
declare const AWS_SECRET_ACCESS_KEY: string;
declare const AWS_ACCESS_KEY_ID: string;
declare const AWS_END_POINT: string;
declare const AWS_BUCKET_NAME: string;

@Injectable({
  providedIn: 'root'
})
export class S3HandlerService {
  s3 : AWS.S3
  constructor() {
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      signatureVersion :'v4',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey : AWS_SECRET_ACCESS_KEY,
      endpoint: AWS_END_POINT,
      s3BucketEndpoint:true,
      region: 'eu-west-3',
    });
  }
  getObject(uri:string) {
    const params = {
      Key: uri,
      Bucket:'smc-static-media'
     };
    return this.s3.getObject(params)
  }
  getPresignUrl(uri:string) {
    const params = {
      Key: uri,
      Bucket:'smc-static-media',
     };
    return this.s3.getSignedUrlPromise('getObject',params)
  }
}
