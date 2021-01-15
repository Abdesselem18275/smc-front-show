import { Injectable } from '@angular/core';
import { DimensionsSpecification, DimensionElement } from 'src/app/core/types';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  toDimensionArray(productDimensions: DimensionsSpecification[]): DimensionElement[] {
    const masterSpecIndex = productDimensions.findIndex((dim: DimensionsSpecification) => dim.isMasterSpecification);
    const masterSpecDesignation = productDimensions[masterSpecIndex > -1 ? masterSpecIndex :0 ];
    //const accumulator = new Map<number,any>();
    return Array.from(
      productDimensions.reduce((accumulator: Map<number,any>, currentValue: DimensionsSpecification,currentIndex) => {
        currentValue.measures.forEach((value: number,index: number) => {
          accumulator.set(index,{
            ...accumulator.get(index),
            [currentValue.measureType.designation]:`${value.toFixed(1)} ${currentValue.measureType.unit}`,
            ref:`${masterSpecDesignation.measureType.getShortDesignation}/${masterSpecDesignation.measures[index]}`
          });
      });
      console.warn(accumulator);
      return accumulator; }, new Map<number,any>()).values());
    // return Array.from(
    //   productDimensions.reduce((accumulator: Map<number,any>, currentValue: DimensionsSpecification,currentIndex) => {
    //     currentValue.measures.forEach((value: number,index: number) => {
    //       accumulator.set(index,{
    //         ...accumulator.get(index),
    //         [currentValue.measureType.designation]:`${value.toFixed(1)} ${currentValue.measureType.unit}`,
    //         ref:`${masterSpecDesignation}-${value}`
    //       });
    //   });
    //   console.warn(accumulator);
    //   return accumulator; }, new Map<number,any>()).values());

  }
}
