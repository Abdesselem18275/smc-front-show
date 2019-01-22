import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';



@Injectable({
  providedIn: 'root'
})
export class AwsObjectsService {

  constructor() { }

  getS3Bucket(bucket: string, key: string): any {

    const params = {
      Bucket : bucket,
      Key: key
    };


    const s3 = new AWS.S3(
      {
        accessKeyId: 'AKIAI2NZHLI6OTIANBQA',
        secretAccessKey: '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',
        region: 'eu-west-3',
        apiVersion: '2006-03-01'
      }
    );


    return s3.getObject(params);

  }



}
