import { Injectable, Inject } from '@angular/core';
import { FilterCategory,Category} from '../model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';



export const API_URL = 'https://show-case-api.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService  {
  test: string;
  httpParams: HttpParams;
  categories$: Observable<Category[]>;
  constructor(private http: HttpClient , @Inject(API_URL) private apiUrl: string) {
    this.httpParams = new HttpParams();
    this.get_elements({model: 'categorie'}).pipe(catgories => this.categories$ = catgories);
  }



  get_elements(options: {
    model?: string;
    hyperLink?: any;
    param_key?: Map<string, string> } = {}): Observable<any[]> {

    const model = options.model || '';
    const param_key = options.param_key || new Map();
    this.httpParams = this.httpParams.delete('page');

    param_key.forEach((value, key) => {
      this.httpParams = this.httpParams.set(key, value);
    });

    console.warn(this.httpParams);

    const query: string =
    [
    this.apiUrl,
    '/',
    model,
    's/'].join('') ;
   return this.http.get(query, {params: this.httpParams}).pipe(map((jsonArray: any[]) => jsonArray));

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

  getCategories() {
    return this.categories$;
  }


}
