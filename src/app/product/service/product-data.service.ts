import { Injectable, Inject } from '@angular/core';
import { FilterCategory } from '../model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



export const API_URL = 'https://show-case-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private http: HttpClient , @Inject(API_URL) private apiUrl: string) { }





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


  get_element(options: {
    model?: string;
    value?: string;
    param_key?: string[] } = {}): Observable<any> {

    const model = options.model || '';
    const value = options.value || '';

    const query: string = [
    this.apiUrl,
    '/',
    model,
    '/', value
     ].join('');
   return this.http.get(query);

  }

  getSignedUrl(url: string): Observable<any> {
    const fileName = null ? '' : url.substring(url.lastIndexOf('/') + 1);
    const query: string = [
      'https://smc-show-case.herokuapp.com',
      '/sign-s3/?file-name=', fileName].join('');
    return this.http.get(query);
  }

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

}
