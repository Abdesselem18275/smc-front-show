import { Directive, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ControlContainer, FormGroup, NgControl } from '@angular/forms';

@Directive({
  selector: '[appControlValidatorMessage]'
})
export class ControlValidatorMessageDirective implements AfterViewInit {
  _parentElement : HTMLElement
  _errorElement : HTMLElement
  constructor(
    private renderer : Renderer2,
    private element :ElementRef,
    private readonly control: NgControl) {}
  ngAfterViewInit(): void {
    this._parentElement = this.renderer.parentNode(this.element.nativeElement)
    this._errorElement = this.renderer.createElement('p')
    this.renderer.addClass(this._errorElement,'form__field__error')
    this.control.statusChanges.subscribe(x =>
      {
        if(x === 'INVALID') {
          this.appendMessageError(Object.keys(this.control.errors)[0])
        } else {
          this.renderer.removeChild(this._parentElement,this._errorElement)
        }
      }
)
  }
appendMessageError(error:string) {
  this.renderer.setProperty(this._errorElement,'innerText',this.getErrorMessage(error))
  this.renderer.appendChild(this._parentElement,this._errorElement)
}

getErrorMessage(error:string) {
  switch(error) {
    case 'required': {
        return 'This field is required';
    }
    case 'email': {
     return 'Enter a valid email adress';
 }
 case 'passwordNotConfirmed': {
   return 'Password must be equals';
}
  }
  return '';
}
}
