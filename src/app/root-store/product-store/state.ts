import { ProductShort } from 'src/app/models/product.models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<ProductShort> {
  isLoading: boolean;
  objCount: number;
  isBigBox: boolean;
  selectedProduct: ProductShort;
}


export function selectParamKey(a: ProductShort): number {
  return a.id;
}
export function sortByName(a: ProductShort, b: ProductShort): number {
  return a.designation.localeCompare(b.designation);
}
export const adapter: EntityAdapter<ProductShort> = createEntityAdapter<ProductShort>({
  selectId: selectParamKey,
 // sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  isLoading : false,
  objCount : 0,
  isBigBox : true,
  selectedProduct : null,
});
