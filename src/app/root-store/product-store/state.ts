import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ProductShort } from 'src/app/core/types';

export interface State extends EntityState<ProductShort> {
  isLoading: boolean;
  objCount: number;
  isBigBox: boolean;
  pageNumber: number;
  selectedProduct: ProductShort;
}


export const selectParamKey = (a: ProductShort): number => a.id;
export const sortByName = (a: ProductShort, b: ProductShort): number => a.designation.localeCompare(b.designation);
export const adapter: EntityAdapter<ProductShort> = createEntityAdapter<ProductShort>({
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
