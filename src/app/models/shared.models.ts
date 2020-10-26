import { Params } from '@angular/router'

export enum ModalRoute {
  LOGIN = '[\'/account\',{ outlets: { modal: [\'login\'] } }]',
  FILTER = 'Filter',
  CATEGORY = 'Category',
  SEARCH = 'Search',
}
export type CarouselMode = 'vertical' | 'horizontal'
export type RedirectDataType = {redirectUrl:string,params:Params}