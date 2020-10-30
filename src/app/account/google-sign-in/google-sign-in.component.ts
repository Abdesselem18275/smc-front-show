import { Component, AfterViewInit, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GoogleAuthService } from '../service/google-auth.service';

declare const gapi: any;

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements AfterViewInit, OnInit {



  constructor(private element: ElementRef,
              private render: Renderer2,
              private googleAuthService: GoogleAuthService) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
    const width = this.render.parentNode(this.element.nativeElement).clientWidth;
    console.warn(width)
    this.googleAuthService.buttonRender('google-signin2', width);
  }






}
