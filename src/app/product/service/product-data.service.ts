import { Injectable, Inject } from '@angular/core';
import { FilterCategory, Category } from '../model';
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
    param_key?: string } = {}): Observable<any[]> {

    const model = options.model || '';
    const value = options.value || '';
    const param_key = options.param_key || '';

    const query: string = [
    this.apiUrl,
    '/',
    model,
    's/', param_key].join('');
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

  getFilters() {
    const query: string = [
      this.apiUrl,
      '/filters'].join('');
     return this.http.get(query).pipe(map((jsonArray: any[]) => jsonArray.map(jsonItem =>
             new FilterCategory(jsonItem)) ));

  }

  getMenu() {
    const treeMenu: any[] = [
      {
        designation: 'Products',
        isLeaf: false,
        isRoot: true,
        children: []
      },{
        designation: 'Gifts',
        isLeaf: true,
        isRoot: true,
        children: []
      },{
        designation: 'Inspirations',
        isLeaf: true,
        isRoot: true,
        children: []
      },{
        designation: 'Contact us',
        isLeaf: true,
        isRoot: true,
        children: []
      }
    ];
    return treeMenu;
  }


}
