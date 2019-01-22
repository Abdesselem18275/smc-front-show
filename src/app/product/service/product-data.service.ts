import { Injectable, Inject } from '@angular/core';
import { FilterCategory, Component, Variant, ProductShort } from '../model';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';



export const API_URL = 'https://show-case-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient , @Inject(API_URL) private apiUrl: string) { }

  getCategories() {
    const filterCategories: FilterCategory[] = [
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

  getProducts() {
    const components: Component[] = [
      new Component({
        designation : 'Handle ear',
        measure_type : 'diameter',
        measure : 25
      }),
      new Component({
        designation : 'Small Handle',
        measure_type : 'diameter',
        measure : 15
      }),
      new Component({
        designation : 'Long Handle',
        measure_type : 'Length',
        measure : 10
      }),
    ];

  const variants: Variant[] = [
      new Variant({
        designation: 'Cachepot 1',
        height: 12,
        width: 13,
        diameter: 25,
        capacity: 50,
        components : components
      }),
      new Variant({
        designation: 'Cachepot 2',
        height: 18,
        width: 16,
        diameter: 30,
        capacity: 100,
        components : components
      }),
      new Variant({
        designation: 'Cachepot 3',
        height: 24,
        width: 16,
        diameter: 30,
        capacity: 150,
        components : components
      }),
    ];

  const productShorts: ProductShort[] = [
    new ProductShort({
      designation: 'Cachepot',
      thumbNail : '',
      variants : variants,
    }),
    new ProductShort({
      designation: 'Fryin pan',
      thumbNail : '',
      variants : variants,
    }),
    new ProductShort({
      designation: 'Sauteuse a poile',
      thumbNail : '',
      variants : variants,
    }),
  ];

  return of(productShorts);
  }



  get_elements(options: {
    model?: string;
    value?: string;
    param_key?: string[] } = {}): Observable<any[]> {

    const model = options.model || '';
    const value = options.value || '';
    const param_key = options.param_key || [];

     const query: string = [
    this.apiUrl,
    '/',
    model,
    's/'].join('');
   return this.http.get(query).pipe(map((jsonArray: any[]) => jsonArray.map(jsonItem => jsonItem)));

  }

}
