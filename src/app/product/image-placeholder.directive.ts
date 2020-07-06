import { Directive, ContentChildren, QueryList, ElementRef, AfterViewInit, Renderer2, HostListener, OnDestroy, ChangeDetectorRef } from '@angular/core';
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
  constructor( private renderer: Renderer2,private ref: ChangeDetectorRef,) { }

  ngAfterViewInit(): void {
    this._setTextLoading()
    this._setImageloading()
    this._setHideEffect()
    this._setButtonLoading()
    try {
      this.targetImage = this.imageQueryList.first.nativeElement
      this.subscribtion= fromEvent(this.targetImage,'load').
      subscribe(x => {
        this._unsetHideEffect()
        this._unsetImageloading()
        this._unsetTextLoading()
        this._unSetButtonLoading()
       });
    } catch(error) {
      console.error(error)
    }

  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }

  _setHideEffect() {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.addClass(native,'element--hidden')
    })
  }
  _unsetHideEffect() {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.removeClass(native,'element--hidden')
    })
  }
  _setImageloading() {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0]
      this.renderer.addClass(native,'image--pulsing')
      this.renderer.setStyle(imgEl,'visibility','hidden');
    })
  }
  _unsetImageloading() {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0]
      this.renderer.removeClass(native,'image--pulsing')
      this.renderer.setStyle(imgEl,'visibility','visible');
    })
  }
  _setTextLoading() {
      this.pragraphList.forEach(el => {
        const native = el.nativeElement
        this.renderer.addClass(native,'pragraph--pulsing')})
      }

  _unsetTextLoading() {
    this.pragraphList.forEach(el => {
      const native = el.nativeElement
      this.renderer.removeClass(native,'pragraph--pulsing')
    })}

  _setButtonLoading() {
    this.buttonsList.forEach(el => {
      const native = el._elementRef.nativeElement
      this.renderer.addClass(native,'button--pulsing')});
 }
 _unSetButtonLoading() {
  this.buttonsList.forEach(el => {
    const native = el._elementRef.nativeElement
    this.renderer.removeClass(native,'button--pulsing')});
}
}
