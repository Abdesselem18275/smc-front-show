import { Injectable, Inject } from '@angular/core';
import { FilterCategory, Param} from '../model';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const API_URL = 'https://show-case-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService  {

  private query: string;
  constructor(private http: HttpClient , @Inject(API_URL) private apiUrl: string) {
  }



  get_elements(options: {
    model?: string;
    param_key?: Param[] } = {}): Observable<any[]> {
      console.warn(options.param_key);
      const model = options.model || '';
      const param_key = options.param_key || new Map();

      let httpParams = new HttpParams();
      param_key.forEach((param: Param) => {
        httpParams = httpParams.set(param.key, param.value);
      });
    const query: string = [
    this.apiUrl,
    '/',
    model,
    's/'].join('') ;
   return this.http.get(query, {params: httpParams}).pipe(map((jsonArray: any[]) => jsonArray));

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
}
