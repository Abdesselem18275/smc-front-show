import { Injectable, Inject } from '@angular/core';
import { FilterCategory, Category, ProductCollection} from '../model';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const API_URL = 'https://show-case-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService  {
  test: string;
  globalHttpParams: HttpParams;
  constructor(private http: HttpClient , @Inject(API_URL) private apiUrl: string) {
    this.globalHttpParams = new HttpParams();
  }



  get_elements(options: {
    model?: string;
    hyperLink?: any;
    param_key?: Map<string, string> } = {}): Observable<any[]> {

      console.warn(options.param_key);

      const model = options.model || '';
      const param_key = options.param_key || new Map();
      console.warn('data service');
      param_key.forEach((value, key) => {
        this.globalHttpParams = this.globalHttpParams.set(key, value);
      });

    const query: string = [
    this.apiUrl,
    '/',
    model,
    's/'].join('') ;
   return this.http.get(query, {params: this.globalHttpParams}).pipe(map((jsonArray: any[]) => jsonArray));

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
      }
    ];
    return treeMenu;
  }
  resetHttpParams() {
    this.globalHttpParams = new HttpParams();
  }


}
