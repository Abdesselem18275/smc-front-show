import { Component, OnInit, Input } from '@angular/core';
import { S3HandlerService } from '../service/s3-handler.service';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { S3 } from 'aws-sdk';
import { DomSanitizer } from '@angular/platform-browser';
export const S3_END_POINT = 'http://d2z6sbqggbt9fg.cloudfront.net'
@Component({
  selector: 'app-s3-media',
  templateUrl: './s3-media.component.html',
  styleUrls: ['./s3-media.component.scss']
})
export class S3MediaComponent implements OnInit {
  @Input() uri : string
  mediaBody$ : Observable<any>
  mediaUrl: string;
  constructor(private sanitizer: DomSanitizer, private s3 : S3HandlerService,) { }

  ngOnInit(): void {

    // this.mediaBody$ = from(this.s3.getObject(this.uri).promise()).pipe(
    //   tap((x) => console.warn(x)),
    //   map(
    //   (x:any) =>
    //   this.sanitizer.bypassSecurityTrustUrl('data:'+x.ContentType+';base64,'+btoa(String.fromCharCode.apply(null, <number>x.Body)))
    //   ))
    //this.presignedUrl$ = from(this.s3.getPresignUrl(this.uri))
    //this.presignedUrl$.subscribe(x => console.warn(x))
    this.mediaUrl = S3_END_POINT+this.uri;
  }

}
