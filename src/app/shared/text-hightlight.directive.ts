import { Directive, ElementRef, Renderer2, AfterViewInit, Input, ViewChild } from '@angular/core';

@Directive({
  selector: '[appTextHightlight]'
})
export class TextHightlightDirective implements AfterViewInit {

  @Input() appTextHightlight: string;
  constructor(private _element: ElementRef<HTMLElement>, private _renderer: Renderer2) { }
  @ViewChild('app-category-breadcrumb', {static: false}) child ;

  ngAfterViewInit():void {
    const childNodes = this._element.nativeElement.getElementsByTagName('p');
    for (let _i = 0; _i < childNodes.length; _i++) {
      const lowIndex = childNodes.item(_i).textContent.toUpperCase().indexOf(this.appTextHightlight.toUpperCase());
      if (lowIndex !== -1) {
        const element = <Element>(this._renderer.createElement('mark'));
        this._renderer.setProperty(element, 'textContent', this.appTextHightlight);
        const newHtml = childNodes.item(_i).innerHTML.replace(new RegExp(this.appTextHightlight, 'i'), element.outerHTML);
        this._renderer.setProperty(childNodes.item(_i), 'innerHTML', newHtml);
      }
    }
  }
}
