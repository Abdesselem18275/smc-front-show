import {
  ProductDataService, API_URL
} from './product-data.service' ;


export const DataInjectablesService: Array<any> = [
  {provide : API_URL , useValue : API_URL},
  {provide : ProductDataService , useClass: ProductDataService}
];


