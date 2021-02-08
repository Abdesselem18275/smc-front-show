import { Directive, AfterContentInit, ContentChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Validators } from '@angular/forms';
import { ControlErrorMessageComponent } from '../components/control-error-message/control-error-message.component';


@Directive({
  selector: '[appControlValidatorMessage]'
})
export class ControlValidatorMessageDirective implements OnDestroy, AfterContentInit {
  @ContentChild(MatInput,{static: false})
  inputEl!:  MatInput;

  @ContentChild(MatError,{read: ViewContainerRef})
  errorMsgContainerEl!:  ViewContainerRef ;
  private subscription!: Subscription;
  constructor(
    private resolver: ComponentFactoryResolver) {
    }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();

  }
  ngAfterContentInit(): void {
    const factory = this.resolver.resolveComponentFactory<ControlErrorMessageComponent>(ControlErrorMessageComponent);
    this.inputEl.ngControl.control?.statusChanges.subscribe(x =>
      {
        this.errorMsgContainerEl.clear();
        if(x === 'INVALID') {
          const compRef = this.errorMsgContainerEl.createComponent(factory);
          compRef.instance.error = this.inputEl.ngControl.control?.errors ?? Validators.nullValidator ;
        } else {
          this.errorMsgContainerEl.clear();
        }
      }
);
  }



}
