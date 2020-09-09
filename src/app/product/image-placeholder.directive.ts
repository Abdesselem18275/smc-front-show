import { Directive, ContentChildren, QueryList, ElementRef, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements AfterViewInit,OnDestroy {
  @ContentChildren('targetImage',{descendants: true}) imageQueryList :  QueryList<ElementRef> ;
  @ContentChildren('pulsingText',{descendants: true}) pragraphList :  QueryList<ElementRef> ;
  @ContentChildren('loadingImage',{descendants: true}) imageList :  QueryList<ElementRef> ;
  @ContentChildren('toHideLoading',{descendants: true}) toHideList :  QueryList<ElementRef> ;
  @ContentChildren('pulsingButton',{descendants: true}) buttonsList :  QueryList<MatButton> ;
  targetImage : HTMLElement;
  imageElContainer:  HTMLElement;
  subscribtion : Subscription
  constructor( private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this._setTextLoading()
    this._setImageloading()
    this._setHideEffect()
    this._setButtonLoading()
    if(this.imageQueryList.first) {
      this.targetImage = <HTMLElement>this.imageQueryList.first.nativeElement
      this.subscribtion= fromEvent(this.targetImage,'load').
      subscribe(() => {
        this._unsetHideEffect()
        this._unsetImageloading()
        this._unsetTextLoading()
        this._unSetButtonLoading()
       });
    }
  }
  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe()

    }
  }

  _setHideEffect():void {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.addClass(native,'element--hidden')
    })
  }
  _unsetHideEffect():void {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.removeClass(native,'element--hidden')
    })
  }
  _setImageloading():void {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0] ? <HTMLElement>native.getElementsByTagName('img')[0] : native
      this.renderer.addClass(native,'image--pulsing')
      this.renderer.setStyle(imgEl,'visibility','hidden');
    })
  }
  _unsetImageloading():void {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0] ? <HTMLElement>native.getElementsByTagName('img')[0] : native
      this.renderer.removeClass(native,'image--pulsing')
      this.renderer.setStyle(imgEl,'visibility','visible');
    })
  }
  _setTextLoading():void {
      if(this.pragraphList.length > 0) {
        this.pragraphList.forEach(el => {
          this.renderer.addClass(el.nativeElement,'pragraph--pulsing')})
        }
      }
  _unsetTextLoading():void {
    this.pragraphList.forEach(el => {
      this.renderer.removeClass(el.nativeElement,'pragraph--pulsing')
    })}

  _setButtonLoading():void {
    this.buttonsList.forEach(el => {
      this.renderer.addClass(el._elementRef.nativeElement,'button--pulsing')});
 }
 _unSetButtonLoading():void {
  this.buttonsList.forEach(el => {
    this.renderer.removeClass(el._elementRef.nativeElement,'button--pulsing')});
}
}
