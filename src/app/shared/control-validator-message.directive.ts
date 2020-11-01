import { Directive, Renderer2, ElementRef, AfterContentInit, QueryList, ContentChild, ViewContainerRef, ViewChild, TemplateRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { ControlErrorMessageComponent } from './control-error-message/control-error-message.component';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[appControlValidatorMessage]'
})
export class ControlValidatorMessageDirective implements OnDestroy, AfterContentInit {
  @ContentChild(MatInput,{static: false}) 
  inputEl :  MatInput;

  @ContentChild(MatError,{read: ViewContainerRef}) 
  errorMsgContainerEl :  ViewContainerRef ;
  private subscription : Subscription;
  constructor(
    private resolver: ComponentFactoryResolver) {
    }
  ngOnDestroy(): void {
    this.subscription ? this.subscription.unsubscribe() : null
    
  }
  ngAfterContentInit(): void {
    const factory = this.resolver.resolveComponentFactory<ControlErrorMessageComponent>(ControlErrorMessageComponent);
    this.inputEl.ngControl.control.statusChanges.subscribe(x =>
      {       
        this.errorMsgContainerEl.clear()
        if(x === 'INVALID') {
          const compRef = this.errorMsgContainerEl.createComponent(factory)
          compRef.instance.error = this.inputEl.ngControl.control.errors
        } else {
          this.errorMsgContainerEl.clear()
        }
      }
)
  }



}
