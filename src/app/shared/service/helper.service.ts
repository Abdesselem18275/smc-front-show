import { Injectable } from '@angular/core';
import { DimensionsSpecification, DimensionElement } from 'src/app/models/product.models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  toDimensionArray(productDimensions:DimensionsSpecification[]):DimensionElement[] {
    return Array.from(
      productDimensions.reduce((accumulator:Map<number,any>, currentValue: DimensionsSpecification,currentIndex) => {
        currentValue.measures.forEach((value,index) => {
          accumulator.set(index,{
            ...accumulator.get(index),
            [currentValue.measureType.designation]:`${value.toFixed(1)} ${currentValue.measureType.unit}`,
            'no.':index+1
          })
      })
      return accumulator }, new Map<number,any>()).values())

  }
}
