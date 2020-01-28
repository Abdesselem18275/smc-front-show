import {
  ProductDataService
} from './product-data.service' ;


export const DataInjectablesService: Array<any> = [
  {provide : ProductDataService , useClass: ProductDataService}
];


