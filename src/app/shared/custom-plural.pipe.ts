import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPlural'
})
export class CustomPluralPipe implements PipeTransform {
  transform(value: number, message?: string): unknown {
    return value === 1 ? ['one ',message].join('') : [value.toString(),' ',message,'s'].join('')  }
}
