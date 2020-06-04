import { Directive, ContentChildren, QueryList, ElementRef, AfterViewInit, Renderer2, HostListener, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective implements AfterViewInit,OnDestroy {
  @ContentChildren('image') imageList :  QueryList<ElementRef> ;
  @ContentChildren('text',{descendants: true}) pragraphList :  QueryList<ElementRef> ;
  imageEl : HTMLElement;
  imageElContainer:  HTMLElement;
  isLoading : boolean;
  subscribtion : Subscription
  constructor( private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.imageElContainer = this.imageList.first.nativeElement
    this.imageEl= <HTMLElement>this.imageElContainer.childNodes[0]
    this.isLoading = true;
    this._setLoadingStyle(true)
    this.subscribtion= fromEvent(this.imageEl,'load').subscribe(x => this._setLoadingStyle(false))
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
  _setLoadingStyle(isLoading:boolean) {
    if(isLoading) {
      this.pragraphList.forEach((el:ElementRef) => {
            this._setParaLoadingStyle(el)
      })
      this.renderer.addClass(this.imageElContainer,'thumbnail__loading--box')
      this.renderer.setStyle(this.imageEl,'visibility','hidden');
    } else {
      this.pragraphList.forEach((el:ElementRef) => {
        this._unSetParaLoadingStyle(el)
      })
      this.renderer.removeClass(this.imageElContainer,'thumbnail__loading--box')
      this.renderer.setStyle(this.imageEl,'visibility','visible');
    }
  }
  _setParaLoadingStyle(el:ElementRef) {
    console.warn(el)
    let paraEl = el.nativeElement
    const paraElCon = el.nativeElement.querySelectorAll("p , img , mat-button,span")
    for (let el of paraElCon) {
       this.renderer.setStyle(el,'visibility','hidden')
    }
    const width = paraEl.clientWidth
    const height = paraEl.clientHeight
    this.renderer.setStyle(paraEl,'width',width)
    this.renderer.setStyle(paraEl,'height',10)
    this.renderer.addClass(paraEl,'loading--box')
  }
  _unSetParaLoadingStyle(el:ElementRef) {
    let paraEl = el.nativeElement
    const paraElCon = el.nativeElement.querySelectorAll("p , img , mat-button,span")
    for (let el of paraElCon) {
      this.renderer.setStyle(el,'visibility','visible')
    }
    this.renderer.removeClass(paraEl,'loading--box')
  }
}
