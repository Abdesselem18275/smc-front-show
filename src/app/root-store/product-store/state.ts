import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from 'src/app/core/types';

export interface State extends EntityState<Product> {
  isLoading: boolean;
  objCount: number;
  isBigBox: boolean;
  pageNumber: number;
  selectedProduct: Product;
}


export const selectParamKey = (a: Product): number => a.id;
export const sortByName = (a: Product, b: Product): number => a.designation.localeCompare(b.designation);
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectParamKey,
 // sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  isLoading : false,
  objCount : 0,
  isBigBox : true,
  pageNumber:1,
  selectedProduct : null,
});
