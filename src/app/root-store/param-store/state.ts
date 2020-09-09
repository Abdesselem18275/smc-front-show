import { Param, Category } from 'src/app/models/product.models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export type State = EntityState<Param>


export function selectParamKey(a: Param): string {
    return a.key;
  }
  export function sortByName(a: Param, b: Param): number {
    return a.key.localeCompare(b.key);
  }
  export const adapter: EntityAdapter<Param> = createEntityAdapter<Param>({
    selectId: selectParamKey,
    sortComparer: sortByName,
  });

  export const initialState: State = adapter.getInitialState({});
