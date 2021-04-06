import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent  {

  @Output() value = new EventEmitter<number>();
  @Input() minMax = [0,12];
  _value  = 0;
  constructor() {}

  updateControlValue(direction: '+'|'-'): void {
    const newVal =  direction === '+' ? this._value + 1 : this._value - 1;
    this._value = newVal <= this.minMax[1] && newVal >= this.minMax[0] ? newVal : this._value
    this.value.emit(this._value);
  }
}
