import { Directive, ContentChildren, QueryList, ElementRef, AfterViewInit, Renderer2, HostListener, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements AfterViewInit,OnDestroy {
  @ContentChildren('targetImage',{descendants: true}) imageQueryList :  QueryList<ElementRef> ;
  @ContentChildren('loadingText',{descendants: true}) pragraphList :  QueryList<ElementRef> ;
  @ContentChildren('loadingImage',{descendants: true}) imageList :  QueryList<ElementRef> ;
  @ContentChildren('toHideLoading',{descendants: true}) toHideList :  QueryList<ElementRef> ;

  
  targetImage : HTMLElement;
  imageElContainer:  HTMLElement;
  subscribtion : Subscription
  constructor( private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.targetImage = this.imageQueryList.first.nativeElement
    this._setTextLoading()
    this._setImageloading()
    this._setHideEffect()
    this.subscribtion= fromEvent(this.targetImage,'load').subscribe(x => {
     this._unsetHideEffect()
     this._unsetImageloading()
     this._unsetTextLoading()
    });
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }

  _setHideEffect() {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.setStyle(native,'display','none');
    })
  }
  _unsetHideEffect() {
    this.toHideList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      this.renderer.setStyle(native,'display','block');
    })
  }
  _setImageloading() {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0]
      this.renderer.addClass(native,'thumbnail__loading--box')
      this.renderer.setStyle(imgEl,'visibility','hidden');
    })
  }
  _unsetImageloading() {
    this.imageList.forEach(el => {
      const native = <HTMLElement>el.nativeElement
      const imgEl = <HTMLElement>native.getElementsByTagName('img')[0]
      this.renderer.removeClass(native,'thumbnail__loading--box')
      this.renderer.setStyle(imgEl,'visibility','visible');
    })
  }
  _setTextLoading() {
      this.pragraphList.forEach(el => {
        const native = el.nativeElement
        this.renderer.addClass(native,'font--transparent')
        this.renderer.addClass(native,'loading--box')})
      }

  _unsetTextLoading() {
    this.pragraphList.forEach(el => {
      const native = el.nativeElement
      this.renderer.removeClass(native,'font--transparent')
      this.renderer.removeClass(native,'loading--box')
    })}

  _setImageLoading() {
}
 }
