import { Directive, HostListener, Renderer2, ElementRef, OnInit, HostBinding, AfterContentInit, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, debounceTime, filter, tap } from 'rxjs/operators';

@Directive({
  selector: '[appImageZoom]'
})
export class ImageZoomDirective implements AfterViewInit{
  private ratioX:number;
  private ratioY:number;
  private containerHeight : number;
  private containerWidth: number;
  private imageEl: HTMLElement
  constructor(private renderer: Renderer2, private el: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this.containerHeight = this.el.nativeElement.clientHeight
    this.containerWidth = this.el.nativeElement.clientWidth
    this.imageEl = this.el.nativeElement.querySelector("img")

 }

  @HostListener('mouseenter', ['$event.target'])
  onEnter() {
    window.innerWidth > 1024 ? this.setZoom() : null
    fromEvent(this.el.nativeElement,'mousemove').pipe(
      takeUntil(fromEvent(this.el.nativeElement,'mouseleave')),
      filter(() => this.ratioX < 1 && window.innerWidth > 1024),
    )
    .subscribe((event:MouseEvent) => {
      this.moveZoom(event)
    },
    () => '',
    () => this.unSetZoom())
 }
 @HostListener('mouseleave', ['$event.target'])
 onLeave() {
  this.unSetZoom()
 }
 setZoom() {
  this.renderer.setStyle(this.imageEl,'max-width','1000%')
  this.renderer.setStyle(this.imageEl,'position','relative')
  this.renderer.setStyle(this.imageEl,'cursor','zoom-in')
  const imageWidth = this.imageEl.clientWidth
  const imageHeight = this.imageEl.clientHeight
  this.ratioY = imageWidth >  this.containerWidth/2 ? this.containerHeight / (imageHeight - this.containerHeight/2):1
  this.ratioX = imageWidth >  this.containerWidth ? this.containerWidth / (imageWidth - this.containerWidth ) : 1
 }
 moveZoom(event:MouseEvent) {
  const x = event.pageX - this.el.nativeElement.offsetLeft;
  const y = event.pageY - this.el.nativeElement.offsetTop;
  this.renderer.setStyle(this.imageEl,'right',`${x/this.ratioX}px`)
  this.renderer.setStyle(this.imageEl,'bottom',`${y/this.ratioY}px`)
 }
 unSetZoom() {
  this.renderer.setStyle(this.imageEl,'max-width','100%')
  this.renderer.setStyle(this.imageEl,'position','static')
  this.renderer.setStyle(this.imageEl,'cursor','auto')
 }
}
