import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPlural'
})
export class CustomPluralPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
