import { ProductStoreState } from './product-store';
import { ParamStoreState } from './param-store';

export interface State {
    product: ProductStoreState.State;
    param: ParamStoreState.State;
}
