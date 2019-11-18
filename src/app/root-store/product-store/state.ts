import { ProductShort } from 'src/app/product/model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<ProductShort> {
  isLoading: boolean;
  objCount: number;

}


export function selectParamKey(a: ProductShort): number {
  return a.pk;
}
export function sortByName(a: ProductShort, b: ProductShort): number {
  return a.designation.localeCompare(b.designation);
}
export const adapter: EntityAdapter<ProductShort> = createEntityAdapter<ProductShort>({
  selectId: selectParamKey,
 // sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  isLoading : true,
  objCount : 0
});
