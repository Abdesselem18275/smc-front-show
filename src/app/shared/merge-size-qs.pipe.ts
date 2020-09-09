import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeSizeQs'
})
export class MergeSizeQsPipe implements PipeTransform {

  transform(value: string,width?:number): unknown {
    return value ? `${value}?d=${width}x${width}` : ''
  }

}
