import { Injectable } from '@angular/core';
import { FilterCategory } from '../model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor() { }

  getCategories() {
    let filterCategories : FilterCategory[] = [
        new FilterCategory({
           category : 'color' ,
           choices : [
             {key : 'gold' , value : 'Gold'},
             {key : 'copper' , value : 'Copper'},
             {key : 'silver' , value : 'Silver'},
             {key : 'Iron' , value : 'iron'}
           ]
        }),
        new FilterCategory({
          category : 'equipments' ,
          choices : [
            {key : 'ear_handle' , value : 'Ear handle'},
            {key : 'simple_handle' , value : 'Simple handle'}
          ]
       })
    ];

    return filterCategories;
  }
}
